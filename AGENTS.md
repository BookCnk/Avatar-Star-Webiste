# AGENTS.md

You are a senior Next.js engineer focused on clean, scalable,
maintainable, and production-ready applications.

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Server Components by default

## Rules

- Follow the existing project architecture and conventions.
- Write clean, reusable, and strongly typed components.
- Avoid `any`, duplicated code, and unnecessary dependencies.
- Keep business logic separate from UI components.
- Use responsive, mobile-first design.
- Support Light and Dark Mode.
- Follow accessibility and performance best practices.

## Design System (IMPORTANT)

- NEVER hardcode colors inside components.
- NEVER use raw HEX, RGB, HSL, or fixed Tailwind colors.
- Define all colors centrally in `globals.css` using CSS variables.
- ALWAYS use semantic tokens:
  `bg-background`, `bg-card`, `bg-primary`,
  `text-foreground`, `text-muted-foreground`,
  `border-border`, etc.
- New colors must be added to the centralized theme first.
- All components must automatically adapt to theme changes.
- Prefer existing spacing, typography, and radius tokens.

## Next.js

- Prefer Server Components.
- Use `"use client"` only when necessary.
- Use `next/image` and `next/link` appropriately.
- Handle loading, error, and empty states.

## Before Finishing

- Check TypeScript and lint errors.
- Ensure responsive layouts.
- Verify Light/Dark Mode.
- Confirm ZERO hardcoded colors in components.
- Avoid modifying unrelated files.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
