import "server-only";

import { verifyPassword } from "@/server/crypto";
import {
  DEMO_USER_ID,
  demoCredentialsMatch,
  reportDevelopmentFallback,
} from "@/server/demo";
import { prisma } from "@/server/prisma";

export async function authenticateUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
      select: { id: true, passwordHash: true },
    });

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return null;
    }

    return { userId: user.id };
  } catch (error) {
    reportDevelopmentFallback(error);
    return demoCredentialsMatch(email, password) ? { userId: DEMO_USER_ID } : null;
  }
}

export async function testPrismaConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
