import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/server/auth";
import { LoginClient } from "./login-client";

export const metadata: Metadata = {
  title: "เข้าสู่ระบบ (Sign In) | Avatar Star",
  description: "Sign in to deploy into Avatar Star and battle across the floating islands.",
};

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/dashboard");

  return <LoginClient />;
}
