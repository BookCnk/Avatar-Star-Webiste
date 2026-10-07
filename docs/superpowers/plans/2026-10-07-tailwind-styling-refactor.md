# Tailwind Styling Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move all product UI styling to semantic Tailwind utilities and leave `app/globals.css` with only theme, browser, and animation responsibilities.

**Architecture:** `app/globals.css` defines semantic CSS variables and Tailwind v4 `@theme inline` mappings. Components own layout, responsive variants, surfaces, and interaction styling through Tailwind utilities. CSS retains global rules, pseudo-element/browser rules, `data-*` selectors, and named animation keyframes.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Node test runner, ESLint.

**Spec:** `docs/superpowers/specs/2026-10-07-tailwind-styling-refactor-design.md`

## Global Constraints

- Define all color values in `app/globals.css`; components use semantic Tailwind utilities only.
- No raw palette utilities, arbitrary color values, HEX, RGB, RGBA, or HSL in TSX.
- Use mobile-first Tailwind breakpoint variants for ordinary responsive layout.
- Preserve routes, assets, visible copy, accessibility contracts, and interactive behavior.
- Add no dependencies and preserve unrelated user changes.

## Review Focus

- Dark theme token utilities retain readable contrast.
- 320px layouts do not overflow horizontally.
- Keyboard navigation remains correct for the mobile menu, Hall tabs, and carousel controls.
- Reduced motion minimizes carousel motion.
- Raw colors and retired global selector families cannot return unnoticed.

## File Structure

- `app/globals.css`: semantic values, `@theme inline`, base rules, keyframes, and required selectors.
- `components/avatar-star-navbar.tsx`, `components/avatar-star-footer.tsx`, `components/site-header.tsx`: shared chrome migrated to Tailwind.
- `components/hall-of-fame.tsx`: leaderboard/card/carousel styling migrated to Tailwind.
- `app/(site)/page.tsx`: Home and character-slider styling migrated to Tailwind.
- `app/(site)/download/page.tsx`: Download UI styling migrated to Tailwind.
- `app/(site)/login/page.tsx`, `app/(site)/login/login-form.client.tsx`, `app/(protected)/dashboard/page.tsx`, `app/not-found.tsx`, `components/submit-button.client.tsx`, `components/ui/navigation-menu.tsx`: audit/migrate remaining presentation styles.
- `tests/homepage.test.tsx`, `tests/styling.test.ts`: regression and style-boundary tests.

### Task 1: Create semantic Tailwind theme primitives

**Files:**
- Modify: `app/globals.css:1-260`
- Create: `tests/styling.test.ts`

**Interfaces:**
- Produces Tailwind color namespaces `game`, `game-deep`, `game-foreground`, `game-muted`, `game-border`, `hall-*`, `nav-*`, `surface-*`, `info`, `highlight`, `danger`, and `brand-violet`.

- [ ] **Step 1: Write a failing theme-mapping test**

```ts
test("global stylesheet maps semantic Avatar Star tokens into Tailwind", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /@theme inline/);
  assert.match(css, /--color-game:\s*var\(--game\)/);
  assert.match(css, /--color-hall-panel:\s*var\(--hall-panel\)/);
  assert.match(css, /--color-nav-backdrop:\s*var\(--as-nav-backdrop\)/);
});
```

- [ ] **Step 2: Verify the test is red**

Run `npm test -- --test-name-pattern="maps semantic Avatar Star tokens"`.

Expected: FAIL because the mappings do not exist.

- [ ] **Step 3: Add token mappings**

```css
@theme inline {
  --color-game: var(--game);
  --color-game-deep: var(--game-deep);
  --color-game-foreground: var(--game-foreground);
  --color-game-muted: var(--game-muted);
  --color-game-border: var(--game-border);
  --color-hall-panel: var(--hall-panel);
  --color-hall-accent: var(--hall-accent);
  --color-nav-backdrop: var(--as-nav-backdrop);
}
```

Add a semantic variable before every migration that would require a raw color.

- [ ] **Step 4: Verify green and commit**

Run `npm test -- --test-name-pattern="maps semantic Avatar Star tokens"`; expect PASS.

```bash
git add app/globals.css tests/styling.test.ts
git commit -m "refactor: expose semantic Tailwind theme tokens"
```

### Task 2: Migrate shared navigation and chrome

**Files:**
- Modify: `components/avatar-star-navbar.tsx`, `components/avatar-star-footer.tsx`, `components/site-header.tsx`, `components/ui/navigation-menu.tsx`, `app/globals.css`, `tests/homepage.test.tsx`, `tests/styling.test.ts`

**Interfaces:**
- Consumes Task 1 semantic token utilities.
- Produces shared components with no `as-nav-*` or `mobile-menu-*` styling dependency.

- [ ] **Step 1: Write a failing navigation audit**

```ts
test("navigation uses semantic Tailwind styling without legacy classes", () => {
  const source = readFileSync(new URL("../components/avatar-star-navbar.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /as-nav-|mobile-menu-/);
  assert.doesNotMatch(source, /(?:bg|text|border)-(?:sky|blue|white|black|amber|yellow|purple|emerald)-/);
  assert.match(source, /bg-nav-backdrop/);
  assert.match(source, /lg:hidden/);
});
```

- [ ] **Step 2: Verify the navigation audit is red**

Run `npm test -- --test-name-pattern="navigation uses semantic Tailwind styling"`.

Expected: FAIL because legacy classes and raw color utilities remain.

- [ ] **Step 3: Implement the shared-chrome migration**

Replace legacy classes with grouped semantic utilities, preserving the desktop/mobile split, focus-visible states, `aria-*` properties, menu data states, and scroll lock. Use patterns such as:

```tsx
<div className="rounded-[1.4rem] border border-nav-border bg-nav-surface/95 shadow-nav backdrop-blur-md">
```

Delete each corresponding global selector only after `rg -n 'as-nav-|mobile-menu-' app components` returns no styling use.

- [ ] **Step 4: Verify green and commit**

Run `npm test -- --test-name-pattern="mobile menu|navbar stays pinned|navigation uses semantic Tailwind styling"`; expect PASS.

```bash
git add components/avatar-star-navbar.tsx components/avatar-star-footer.tsx components/site-header.tsx components/ui/navigation-menu.tsx app/globals.css tests/homepage.test.tsx tests/styling.test.ts
git commit -m "refactor: migrate shared navigation styling to Tailwind"
```

### Task 3: Migrate Hall of Fame and carousel

**Files:**
- Modify: `components/hall-of-fame.tsx`, `app/globals.css`, `tests/homepage.test.tsx`, `tests/styling.test.ts`

**Interfaces:**
- Consumes Task 1 `hall-*` utilities and named carousel keyframes.
- Produces Tailwind-styled leaderboard markup while preserving `data-carousel-direction` and current ARIA labels.

- [ ] **Step 1: Write a failing Hall styling audit**

```ts
test("Hall of Fame uses semantic utilities rather than legacy selectors", () => {
  const source = readFileSync(new URL("../components/hall-of-fame.tsx", import.meta.url), "utf8");
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(source, /bg-hall-panel/);
  assert.match(source, /lg:absolute/);
  assert.doesNotMatch(source, /hall-of-fame-(?:stage|board|ghost|tabs|carousel-control)/);
  assert.doesNotMatch(css, /\.hall-of-fame-(?:stage|board|ghost|tabs|carousel-control)/);
});
```

- [ ] **Step 2: Verify the Hall audit is red**

Run `npm test -- --test-name-pattern="Hall of Fame uses semantic utilities"`.

Expected: FAIL because Hall layout is still global CSS.

- [ ] **Step 3: Implement Hall migration**

Apply semantic Tailwind utilities for the section, tabs, controls, board, podium, rows, and preview cards. Keep only named carousel keyframes, reduced-motion, and any unavoidable data selector in CSS. Preserve the existing client state and arrow/tab behavior.

```tsx
<div className="relative mt-4 flex justify-center lg:mt-5" data-carousel-direction={slideDirection}>
```

- [ ] **Step 4: Verify green and commit**

Run `npm test -- --test-name-pattern="interactive Hall of Fame|Hall of Fame uses semantic utilities"`; expect PASS.

```bash
git add components/hall-of-fame.tsx app/globals.css tests/homepage.test.tsx tests/styling.test.ts
git commit -m "refactor: move Hall of Fame styling to Tailwind"
```

### Task 4: Migrate Home page and character slider

**Files:**
- Modify: `app/(site)/page.tsx`, `app/globals.css`, `tests/homepage.test.tsx`, `tests/styling.test.ts`

**Interfaces:**
- Consumes Tasks 1–3 semantic utilities and shared components.
- Produces Home markup free of `as-*`, `event-*`, `badge-*`, `game-button-*`, `reward-dot`, and `character-*` presentation selectors.

- [ ] **Step 1: Write a failing Home audit**

```ts
test("Home page avoids legacy presentation classes and raw color utilities", () => {
  const source = readFileSync(new URL("../app/(site)/page.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /\b(?:as-|event-|badge-|game-button-|reward-dot|character-)/);
  assert.doesNotMatch(source, /(?:bg|text|border|from|via|to)-(?:sky|blue|white|black|amber|yellow|purple|emerald)-/);
  assert.match(source, /sm:/);
  assert.match(source, /lg:/);
});
```

- [ ] **Step 2: Verify the Home audit is red**

Run `npm test -- --test-name-pattern="Home page avoids legacy presentation classes"`.

Expected: FAIL because Home still depends on legacy classes and raw colors.

- [ ] **Step 3: Implement Home migration in visual order**

Convert hero, trailer modal, news ticker, events, character showcase, support, and footer-adjacent sections. Use typed maps containing only semantic classes. Retain `style={{ width: stat.percent }}` because it is data-driven geometry rather than color styling.

```tsx
const characterAccentClasses = {
  assassin: "border-brand-violet bg-brand-violet/20 text-brand-violet",
  gunner: "border-highlight bg-highlight/20 text-highlight",
} as const;
```

- [ ] **Step 4: Verify green and commit**

Run `npm test -- --test-name-pattern="homepage exposes|Home page avoids legacy presentation classes|interactive Hall of Fame"`; expect PASS.

```bash
git add 'app/(site)/page.tsx' app/globals.css tests/homepage.test.tsx tests/styling.test.ts
git commit -m "refactor: migrate Home styling to Tailwind"
```

### Task 5: Migrate Download and remaining route surfaces

**Files:**
- Modify: `app/(site)/download/page.tsx`, `app/(site)/login/page.tsx`, `app/(site)/login/login-form.client.tsx`, `app/(protected)/dashboard/page.tsx`, `app/not-found.tsx`, `components/submit-button.client.tsx`, `app/globals.css`, `tests/styling.test.ts`

**Interfaces:**
- Consumes Task 1 semantic utilities.
- Produces route surfaces with no legacy Download selectors or raw-color utilities.

- [ ] **Step 1: Write a failing route-surface audit**

```ts
test("Download uses semantic utilities without legacy classes", () => {
  const source = readFileSync(new URL("../app/(site)/download/page.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /\bas-(?:dl|section-ribbon|spec-card|step-card|help)-/);
  assert.doesNotMatch(source, /(?:bg|text|border|from|via|to)-(?:sky|blue|white|black|amber|yellow|purple|emerald)-/);
  assert.match(source, /bg-game-deep/);
});
```

- [ ] **Step 2: Verify the route-surface audit is red**

Run `npm test -- --test-name-pattern="Download uses semantic utilities"`.

Expected: FAIL because Download still includes legacy presentation classes.

- [ ] **Step 3: Implement route-surface migration**

Convert Download cards, installation steps, help links, login, dashboard, not-found, and submit controls. Add named tokens before using colors. Remove migrated selectors from `globals.css`.

```tsx
<section className="rounded-2xl border border-game-border bg-surface/80 p-5 text-game-foreground shadow-game backdrop-blur-md sm:p-6">
```

- [ ] **Step 4: Verify green and commit**

Run `npm test`; expect PASS.

```bash
git add 'app/(site)/download/page.tsx' 'app/(site)/login/page.tsx' 'app/(site)/login/login-form.client.tsx' 'app/(protected)/dashboard/page.tsx' app/not-found.tsx components/submit-button.client.tsx app/globals.css tests/styling.test.ts
git commit -m "refactor: migrate route styling to Tailwind"
```

### Task 6: Remove obsolete CSS and verify the whole refactor

**Files:**
- Modify: `app/globals.css`, `tests/styling.test.ts`

**Interfaces:**
- Consumes all migrated component class strings.
- Produces a global stylesheet containing only tokens, mappings, global rules, keyframes, and unavoidable selectors.

- [ ] **Step 1: Write a failing global stylesheet boundary test**

```ts
test("global stylesheet contains no retired component selector families", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.doesNotMatch(css, /\.(?:as-nav|as-hero|as-char|as-dl|as-section|as-spec|as-step|as-help|event-card|event-feature|badge|game-button|hall-of-fame)/);
  assert.match(css, /@keyframes hall-of-fame-slide-from-right/);
  assert.match(css, /prefers-reduced-motion/);
});
```

- [ ] **Step 2: Verify the boundary test is red**

Run `npm test -- --test-name-pattern="global stylesheet contains no retired component selector families"`.

Expected: FAIL until retired component selector blocks are removed.

- [ ] **Step 3: Delete obsolete selectors and retain global-only CSS**

Run `rg -n 'as-|event-|badge-|game-button-|hall-of-fame-' app components` before deletion. Keep semantic variables, `@theme inline`, base/browser styles, animation keyframes, necessary data selectors, and reduced-motion rules.

- [ ] **Step 4: Run final verification**

Run `npm test`, `npm run typecheck`, `npm run build`, `npm run lint`, and `git diff --check`.

Expected: tests, typecheck, build, and whitespace check pass. Report any pre-existing lint errors by file and line; do not change unrelated behavior to hide them.

- [ ] **Step 5: Commit final cleanup**

```bash
git add app/globals.css tests/styling.test.ts
git commit -m "refactor: remove legacy global component styling"
```

## Self-Review

- Spec coverage: Tasks 1–6 cover token centralization, Tailwind layout and breakpoints, component migration, responsive accessibility, raw-color prevention, and CSS cleanup.
- Placeholder scan: no deferred or undefined implementation steps remain.
- Type consistency: no new runtime API is introduced; Task 1 creates every semantic utility namespace consumed later.
- Review focus coverage: theme and raw-color checks are in Tasks 1 and 6; keyboard and narrow viewport checks remain in navbar/Hall/Home regression tasks; reduced motion is asserted in Task 6.
