import type { Metadata } from "next";
import Link from "next/link";
import { Terminal, Shield, Zap, Database, ArrowRight, CheckCircle2, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Next.js Fullstack Starter Template",
  description: "A clean, modern production-ready template built with Next.js App Router, Tailwind CSS v4, Prisma, and Auth.",
};

const features = [
  {
    icon: Zap,
    title: "Next.js App Router",
    description: "Built on Next.js with Server Components, Actions, and optimized static & dynamic rendering.",
  },
  {
    icon: Shield,
    title: "Session Authentication",
    description: "Secure cookie-based authentication with password hashing and protected dashboard routes.",
  },
  {
    icon: Database,
    title: "Prisma & MySQL",
    description: "Type-safe database ORM with automated client setup, connection pooling, and seed scripts.",
  },
  {
    icon: Cpu,
    title: "Tailwind CSS v4",
    description: "Modern CSS tokens system with automatic light/dark mode support and high-speed execution.",
  },
];

const techStack = [
  "Next.js App Router",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "Prisma ORM",
  "Zod Validation",
  "Node Test Runner",
  "Docker Ready",
];

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-surface/50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-primary"></span>
            </span>
            Fullstack Starter Template
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Build your next web app <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              faster than ever.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Clean, lightweight, and structured template. Pre-configured with Next.js, Prisma, Tailwind CSS v4,
            authentication system, and essential API endpoints.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-on-primary transition hover:opacity-90 shadow-md"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="/api/health"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-raised"
            >
              <Terminal className="size-4 text-muted" />
              <span>Test API Route (/api/health)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary">Core Foundation</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to ship</p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="flex flex-col rounded-xl border border-border bg-surface p-6 transition hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <item.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack & Code Preview */}
      <section id="stack" className="border-t border-border bg-surface-raised/40 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to clone & customize
              </h2>
              <p className="mt-4 text-muted leading-7">
                No unnecessary boilerplate or bloated demo components. The repository is organized cleanly
                with separated server logic, Prisma schemas, and shared validations.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2">
                {techStack.map((tech) => (
                  <div key={tech} className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="size-4 text-primary" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal Card */}
            <div className="rounded-xl border border-border bg-surface p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-destructive/60" />
                  <div className="size-3 rounded-full bg-accent/60" />
                  <div className="size-3 rounded-full bg-success/60" />
                </div>
                <span className="font-mono text-xs text-muted">terminal</span>
              </div>

              <pre className="mt-4 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed text-foreground">
                <code>
                  <span className="text-muted"># 1. Clone repository</span>{"\n"}
                  git clone &lt;your-repo-url&gt;{"\n\n"}
                  <span className="text-muted"># 2. Install dependencies</span>{"\n"}
                  npm install{"\n\n"}
                  <span className="text-muted"># 3. Setup environment & database</span>{"\n"}
                  cp .env.example .env{"\n"}
                  npx prisma db push{"\n\n"}
                  <span className="text-muted"># 4. Start development server</span>{"\n"}
                  npm run dev
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
