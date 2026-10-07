# Site Motion System Design

## Goal

Introduce a cohesive motion system across the Avatar Star website that feels fluid, playful, and clearly connected to the floating-sky game world. Motion must improve continuity and feedback without delaying navigation, blocking input, increasing layout shift, or requiring a new animation dependency.

## Scope

Included:

- Route transitions for Home, Download, Events, Login, and Dashboard.
- Initial page and section entrance choreography.
- Scroll-triggered reveals for major content groups.
- Shared hover, focus, press, menu, modal, carousel, and card interactions.
- Ambient motion for selected hero and sky elements.
- Performance safeguards and reduced-motion behavior.
- Automated contract tests for the motion architecture.

Excluded:

- Replacing visual assets, copy, page structure, data models, or business logic.
- Continuous cursor-following effects, scroll-jacking, and JavaScript-driven parallax.
- A third-party animation package.
- Reworking unrelated lint failures or unrelated uncommitted product changes.

## Experience Direction

The motion language is **floating-sky inertia**: content settles into place as if arriving on a floating island, with short vertical travel, restrained scale, and soft opacity changes. The system uses one noticeable orchestrated entrance per page and quiet interaction feedback afterward. Hall of Fame navigation keeps its stronger lateral motion because direction communicates the adjacent ranking category.

Motion intensity varies by context:

- Public marketing pages use the full entrance choreography and limited ambient motion.
- Login and Dashboard use shorter, calmer reveals so the interface remains task-focused.
- Navigation, buttons, cards, menus, and dialogs use immediate micro-interactions with no artificial delay.

## Architecture

### Motion tokens

`app/globals.css` owns semantic motion variables for fast, standard, reveal, and route durations; emphasized and standard easing curves; stagger intervals; and reveal distances. Components consume named motion utilities or data attributes rather than defining arbitrary durations repeatedly.

The default implementation animates only compositor-friendly `transform` and `opacity`. Paint-heavy properties such as large blur filters and box shadows do not animate continuously.

### Native route continuity

Next.js native View Transitions are enabled in `next.config.ts`. The shared site layout wraps route content with React's `ViewTransition`, while the persistent navigation is named and anchored so it does not slide with page content. Unsupported browsers retain normal navigation without a broken intermediate state.

Route transitions use a short crossfade with a small vertical offset. They do not move the full viewport horizontally, and they never postpone link activation.

### Scroll reveal controller

A small client component mounted by the site layout owns one `IntersectionObserver`. It observes explicit `[data-motion]` elements, changes a data state when each element enters the viewport, and immediately unobserves revealed elements. It does not subscribe to scroll events and does not store per-element React state.

The controller re-scans after route changes using `usePathname`. Elements remain visible when JavaScript is unavailable; the hidden pre-reveal state is enabled only after the controller marks the document as motion-ready, preventing invisible content during hydration or script failure.

### Component choreography

Major sections receive explicit motion roles:

- `hero`: title, supporting copy, and primary actions reveal in a short stagger.
- `section`: the section container settles upward once.
- `stagger`: direct child cards or rows reveal in sequence with a capped delay.
- `scale`: focal artwork and ranking panels use a restrained scale settle.
- `ambient`: decorative sky layers drift slowly only when motion is allowed.

Interactive components use shared hover and press rules. Existing Hall of Fame carousel keyframes remain directional but adopt the centralized easing and duration tokens.

## Performance Strategy

- No new runtime dependency or animation library.
- One `IntersectionObserver` for the public site; no global scroll handler.
- Observed nodes are unregistered after their first reveal.
- `will-change` is applied only while an element is pending or actively transitioning.
- `content-visibility: auto` and an intrinsic-size fallback are applied to large below-the-fold public sections where they do not affect sticky or fixed positioning.
- Ambient effects stop when the document is hidden through native CSS animation suspension where possible; no permanent `requestAnimationFrame` loop is introduced.
- Existing Server Component boundaries remain unchanged except for the smallest client controller required for browser observation.
- Images continue using `next/image`; no animated layout dimensions are introduced.

## Accessibility

`prefers-reduced-motion: reduce` removes positional travel, scaling, ambient loops, smooth scrolling, and View Transition durations. Content remains immediately visible and interaction state changes remain understandable through color and focus styling.

Keyboard focus is never delayed by motion. Menus, dialogs, and carousels retain their current semantics and controls. Motion attributes are presentational and do not alter reading or tab order.

## Files and Responsibilities

- `next.config.ts`: enable the Next.js native View Transition integration.
- `app/(site)/layout.tsx`: mount the route transition wrapper and motion controller for public routes.
- `app/(protected)/layout.tsx`: apply the calmer route reveal for protected pages.
- `components/site-motion.client.tsx`: own the single observer lifecycle and route-change scan.
- `app/globals.css`: define semantic motion tokens, transition selectors, keyframes, optimization rules, and reduced-motion overrides.
- Public page and shared component TSX files: add semantic `data-motion` roles and shared interaction markers only where visual hierarchy benefits.
- `tests/homepage.test.tsx` and motion-focused tests: enforce tokens, progressive enhancement, reduced-motion support, and the absence of scroll-driven JavaScript.

## Testing and Verification

Automated checks cover:

- Motion tokens and reduced-motion overrides exist.
- The controller uses `IntersectionObserver`, unobserves completed elements, and does not register a scroll listener or animation frame loop.
- Route layouts mount the transition layer and controller.
- Major public pages expose semantic motion roles without changing their content contracts.

Verification runs the full test suite, TypeScript check, production build, targeted lint for touched TS/TSX files, and `git diff --check`. Existing unrelated lint failures are reported separately rather than silently expanded into the motion work.

## Acceptance Criteria

- All website routes have coherent route or entrance motion with progressive fallback.
- Home, Download, and Events sections reveal smoothly once as users scroll.
- Shared controls provide consistent hover, focus, and press feedback.
- Hall of Fame category changes remain directional and use centralized motion tokens.
- No third-party animation package, scroll listener, or permanent animation frame loop is added.
- Motion is limited to transform and opacity for primary transitions.
- Reduced-motion users receive immediate, stable content without positional animation.
- Tests, typecheck, production build, targeted lint, and whitespace verification are completed.

## Risks and Mitigations

- View Transition behavior can vary by browser: treat it as progressive enhancement and preserve normal navigation as the fallback.
- Hiding content before hydration can create invisible pages: only enable pre-reveal styles after the controller sets a document readiness flag.
- Too many reveals can feel repetitive: animate major groups, cap stagger delays, and avoid re-running entrance motion after an element is revealed.
- Large decorative effects can increase paint cost: keep ambient layers small in count, transform-only, and disabled for reduced motion.
- Existing global CSS is large: keep new rules under one motion-system section and rely on semantic attributes rather than adding page-specific keyframes.
