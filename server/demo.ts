import "server-only";

import { developmentFallbackEnabled } from "@/shared/development";

export const DEMO_USER_ID = "00000000-0000-4000-8000-000000000002";

export function canUseDevelopmentFallback() {
  return developmentFallbackEnabled(process.env.NODE_ENV, process.env.DEMO_MODE);
}

export function getDemoUser() {
  return {
    id: DEMO_USER_ID,
    email: process.env.SEED_USER_EMAIL || "user@example.com",
    name: "Development User",
  };
}

export function demoCredentialsMatch(email: string, password: string) {
  const user = getDemoUser();
  const expectedPassword = process.env.SEED_USER_PASSWORD || "demo-password";
  return email.trim().toLowerCase() === user.email.toLowerCase() && password === expectedPassword;
}

export function reportDevelopmentFallback(error: unknown) {
  if (!canUseDevelopmentFallback()) throw error;
  console.warn("MySQL unavailable; using development fallback data.");
}
