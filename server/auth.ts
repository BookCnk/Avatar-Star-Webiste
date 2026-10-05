import "server-only";

import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { cookies } from "next/headers";
import { cache } from "react";
import { z } from "zod";
import { DEMO_USER_ID, getDemoUser, reportDevelopmentFallback } from "./demo";
import { prisma } from "./prisma";

const SESSION_COOKIE = "session_token";
const TOKEN_ISSUER = "linkflow";
const TOKEN_AUDIENCE = "linkflow-web";

const sessionPayloadSchema = z.object({
  userId: z.string().uuid(),
});

export type SessionPayload = z.infer<typeof sessionPayloadSchema>;

function getJwtSecret(): string {
  const secret =
    process.env.JWT_SECRET ||
    (process.env.NODE_ENV !== "production"
      ? "development-only-jwt-secret-change-before-production"
      : undefined);

  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be configured with at least 32 characters.");
  }

  return secret;
}

export function signToken(
  payload: SessionPayload,
  expiresIn: SignOptions["expiresIn"] = "7d"
): string {
  return jwt.sign(payload, getJwtSecret(), {
    algorithm: "HS256",
    audience: TOKEN_AUDIENCE,
    expiresIn,
    issuer: TOKEN_ISSUER,
  });
}

export function verifyToken(token: string): SessionPayload | null {
  const secret = getJwtSecret();

  try {
    const payload = jwt.verify(token, secret, {
      algorithms: ["HS256"],
      audience: TOKEN_AUDIENCE,
      issuer: TOKEN_ISSUER,
    });
    const parsed = sessionPayloadSchema.safeParse(payload);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  if (!session) return null;
  if (session.userId === DEMO_USER_ID) return getDemoUser();

  try {
    return await prisma.user.findUnique({
      where: { id: session.userId },
      select: { id: true, email: true, name: true },
    });
  } catch (error) {
    reportDevelopmentFallback(error);
    return null;
  }
});

export async function setSession(payload: SessionPayload): Promise<void> {
  const token = signToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
    priority: "high",
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
