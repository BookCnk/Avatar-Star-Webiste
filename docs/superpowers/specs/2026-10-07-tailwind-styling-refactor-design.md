# Tailwind Styling Refactor Design

## Goal

Move all product UI styling to Tailwind utilities while retaining a small, centralized CSS layer for semantic theme tokens, global browser rules, and animations that cannot be expressed cleanly as utilities. Preserve the current Avatar Star visual design and interactive behavior.

## Scope

Included:

- `app/(site)/page.tsx` and `app/(site)/download/page.tsx`
- `components/avatar-star-navbar.tsx` and `components/hall-of-fame.tsx`
- shared UI components and authentication pages where they use raw colors or legacy custom classes
- `app/globals.css` token organization, utility mappings, animation definitions, and removal of superseded component styling

Excluded:

- Product copy, routes, API behavior, data models, and database behavior
- A visual redesign or asset replacement

## Styling Architecture

### Global stylesheet

`app/globals.css` remains the only location that defines color values. It contains:

1. Theme variables for the base, game, navigation, Hall of Fame, and status color families.
2. Tailwind v4 `@theme inline` mappings from semantic variables to utility names.
3. Base element rules, font setup, browser-specific rules, and reduced-motion behavior.
4. Reusable keyframes and the small number of complex selectors that depend on pseudo-elements or data attributes.

It does not contain page layout, component spacing, component borders, component typography, component shadows, or breakpoint-specific component layouts that Tailwind utilities can express.

### Components

TSX owns all ordinary visual composition using Tailwind utilities:

- Layout, sizing, spacing, typography, borders, radii, shadows, gradients, and responsive behavior.
- Breakpoints use Tailwind variants such as `sm:`, `md:`, `lg:`, and `xl:`.
- State uses Tailwind variants and data attribute variants where possible.
- Component color classes use semantic token utilities only. No raw Tailwind palette names, arbitrary color values, hex values, RGB, RGBA, or HSL appear in components.

### Reuse

Repeated React structures become focused components or typed class variants. Repeated visual styles that remain purely presentational are expressed by composing semantic Tailwind utilities, not by adding a new global selector.

## Migration Plan

1. Normalize semantic tokens and `@theme` mappings in `globals.css`, including equivalent tokens for every currently hardcoded Avatar Star color.
2. Refactor the navbar and Hall of Fame, preserving mobile navigation and carousel accessibility.
3. Refactor Home page sections and character slider, extracting only genuinely repeated React structures.
4. Refactor Download page and shared UI/authentication surfaces.
5. Remove obsolete global component classes and verify no component relies on them.

## Responsive and Theme Rules

- Mobile-first layouts remain the default.
- Component breakpoints stay in TSX through Tailwind variants; media queries remain only for global behavior that cannot be localized.
- Existing light/dark semantic variables remain the source of truth. New Avatar Star tokens define both modes where the design needs a mode-specific value.
- `prefers-reduced-motion` continues to disable or minimize non-essential animation.

## Acceptance Criteria

- All scoped UI renders without legacy component styling selectors in `globals.css`.
- Component files contain no raw color values and no fixed Tailwind color utilities.
- `globals.css` contains only tokens, Tailwind mappings, global/browser rules, and required keyframes/selectors.
- Home, Download, Login, navigation, Hall of Fame, and shared UI retain their current responsive behavior and accessibility semantics.
- Tests, TypeScript, lint, production build, and whitespace checks are run. Existing unrelated lint failures are reported separately.

## Risks and Mitigations

- Large class strings can reduce readability: group classes by layout, surface, typography, interaction, then responsive variants; extract a component only when it represents a meaningful UI unit.
- Removing CSS selectors can subtly change visual precedence: migrate one surface at a time and preserve data attributes used by interactive state.
- Theme token gaps can invite raw colors: add a named semantic token before writing its corresponding Tailwind utility.
