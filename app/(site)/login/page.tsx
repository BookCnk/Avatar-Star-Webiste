import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/server/auth";
import { LoginForm } from "./login-form.client";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = { title: "Sign In - Next.js Starter Template" };

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/dashboard");

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-surface p-8 shadow-lg">
        <div className="text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="size-6" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted">
            Sign in to access your protected template dashboard.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-surface-raised/50 p-4 text-xs text-muted">
          <p className="font-semibold text-foreground">Demo Credentials (if fallback mode):</p>
          <p className="mt-1 font-mono">Email: user@example.com</p>
          <p className="font-mono">Password: demo-password</p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
