import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { getCurrentUser } from "@/server/auth";
import { testPrismaConnection } from "@/server/services/auth.service";
import { User, Database, Server, Key, LogOut } from "lucide-react";
import { logout } from "@/app/actions";

export const metadata: Metadata = {
  title: "Dashboard - Starter Template",
};

export default async function DashboardPage() {
  await connection();
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const isDatabaseConnected = await testPrismaConnection();

  const services = [
    {
      name: "Database (MySQL / Prisma)",
      status: isDatabaseConnected ? "Connected" : "Offline / Demo Fallback",
      ready: isDatabaseConnected,
      icon: Database,
    },
    {
      name: "Authentication Session",
      status: "Active (JWT / Cookie)",
      ready: true,
      icon: Key,
    },
    {
      name: "Redis Cache & Rate Limiting",
      status: Boolean(process.env.REDIS_URL) ? "Configured" : "In-Memory Fallback",
      ready: Boolean(process.env.REDIS_URL),
      icon: Server,
    },
  ];

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">
            Protected workspace page. Only authenticated users can access this page.
          </p>
        </div>

        <form action={logout}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-surface-raised"
          >
            <LogOut className="size-4" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>

      {/* User Info Card */}
      <section className="mt-8 rounded-xl border border-border bg-surface p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="size-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name || "Authenticated User"}</h2>
            <p className="text-sm font-mono text-muted">{user.email}</p>
          </div>
        </div>
      </section>

      {/* System Status */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">System Status</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex flex-col justify-between rounded-xl border border-border bg-surface p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-surface-raised text-foreground">
                  <service.icon className="size-5" />
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    service.ready
                      ? "bg-success/15 text-success"
                      : "bg-accent/15 text-accent"
                  }`}
                >
                  {service.ready ? "Active" : "Notice"}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-foreground">{service.name}</h3>
                <p className="mt-1 text-xs text-muted font-mono">{service.status}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps for Developers */}
      <section className="mt-8 rounded-xl border border-border bg-surface-raised/50 p-6">
        <h3 className="text-base font-semibold">How to build on this template:</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted list-disc list-inside">
          <li>Add your own models to <code className="font-mono text-foreground">prisma/schema.prisma</code></li>
          <li>Create server services inside <code className="font-mono text-foreground">server/services/</code></li>
          <li>Define request schemas in <code className="font-mono text-foreground">shared/validations.ts</code></li>
          <li>Build API routes inside <code className="font-mono text-foreground">app/api/</code></li>
        </ul>
      </section>
    </main>
  );
}
