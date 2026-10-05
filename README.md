# Next.js Fullstack Starter Template

A clean, modern Next.js starter template designed for rapid cloning and building full-stack web applications.

## Key Features

- **Next.js App Router**: Built with React 19, Server Components, and Server Actions.
- **Tailwind CSS v4**: Theme tokens configured with smooth dark/light mode support.
- **Prisma & MySQL**: Type-safe database setup with User model and seed script.
- **Session Auth**: Cookie-based JWT authentication with protected routes.
- **Zod Validation**: Input validation schemas for client and server.
- **Sample API Endpoint**: `/api/health` static route ready out-of-the-box.
- **Redis Rate Limiting**: Production-ready rate limiter with development fallback.

## Directory Structure

```text
app/          Next.js App Router (pages, layouts, Server Actions, Route Handlers)
components/   Frontend UI components (.client.tsx for interactive elements)
server/       Backend modules (Auth, Prisma adapter, services, rate limiter)
shared/       Framework-independent schemas, types, and helpers
prisma/       Database schema and seed script
tests/        Unit & integration contracts test suite
```

## Getting Started

### 1. Requirements

- Node.js 20+
- MySQL (or Docker to run containerized MySQL)

### 2. Quick Setup

```bash
# 1. Copy environment variables file
cp .env.example .env

# 2. Install dependencies
npm install

# 3. Apply database migrations & seed user
npx prisma db push
npx prisma db seed

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## API Endpoints

- `GET /api/health` - Health check route returning `{ status: "ok" }`.

## Useful Commands

```bash
npm run dev        # Start development server
npm run lint       # Run ESLint check
npm run typecheck  # Run TypeScript type check
npm test           # Run node contract tests
npm run build      # Build production bundle
```
