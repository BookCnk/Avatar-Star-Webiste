"use server";

import { setSession } from "@/server/auth";
import { getClientIp, rateLimit } from "@/server/rate-limit";
import { authenticateUser } from "@/server/services/auth.service";
import type { FormState } from "@/shared/contracts";
import { loginSchema } from "@/shared/validations";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const ip = getClientIp(await headers());
    const allowed = await rateLimit(ip, "login", 5, 60);
    if (!allowed.success) return { error: "Too many attempts. Try again in a minute." };

    const session = await authenticateUser(parsed.data.email, parsed.data.password);
    if (!session) return { error: "Email or password is incorrect." };

    await setSession(session);
  } catch (error) {
    console.error("Login failed:", error);
    return { error: "Login is temporarily unavailable." };
  }

  redirect("/dashboard");
}
