import "server-only";

import Redis from "ioredis";

let redis: Redis | null | undefined;

function getRedis(): Redis | null {
  if (redis !== undefined) return redis;

  if (!process.env.REDIS_URL) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("REDIS_URL is required in production.");
    }
    redis = null;
    return redis;
  }

  redis = new Redis(process.env.REDIS_URL, {
    enableOfflineQueue: false,
    maxRetriesPerRequest: 1,
  });
  redis.on("error", () => {
    // The caller handles command failures so production can fail closed.
  });
  return redis;
}

// ponytail: process-local fallback is development-only; Redis is required in production.
const memoryStore = new Map<string, { timestamp: number; count: number }>();

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
}

/**
 * Checks rate limit for a specific identifier (IP or user ID)
 * @param identifier Unique IP or key to throttle
 * @param action Name of action (e.g., "login", "checkout")
 * @param limit Max requests allowed in window
 * @param windowSeconds Window length in seconds
 */
export async function rateLimit(
  identifier: string,
  action: string,
  limit = 5,
  windowSeconds = 60
): Promise<{ success: boolean; limit: number; remaining: number }> {
  const key = `rate-limit:${action}:${identifier}`;

  const redisClient = getRedis();
  if (redisClient) {
    try {
      const count = await redisClient.incr(key);
      if (count === 1) {
        await redisClient.expire(key, windowSeconds);
      }

      return {
        success: count <= limit,
        limit,
        remaining: Math.max(0, limit - count),
      };
    } catch (error) {
      if (process.env.NODE_ENV === "production") {
        throw new Error("Rate limiter unavailable.", { cause: error });
      }
      console.warn("Redis unavailable; using the development fallback.");
    }
  }

  // Fallback to memory
  const now = Date.now();
  const record = memoryStore.get(key);

  if (!record || now - record.timestamp > windowSeconds * 1000) {
    memoryStore.set(key, { timestamp: now, count: 1 });
    return { success: true, limit, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { success: false, limit, remaining: 0 };
  }

  record.count += 1;
  return { success: true, limit, remaining: limit - record.count };
}
