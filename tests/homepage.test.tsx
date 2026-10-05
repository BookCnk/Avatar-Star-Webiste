import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import HomePage from "../app/(site)/page";
import { LanguageProvider } from "../lib/language-context";

test("homepage exposes the primary game actions and content sections", () => {
  const html = renderToStaticMarkup(
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  );

  assert.match(html, /Register/i);
  assert.match(html, /Download/i);
  assert.match(html, /Top-?up/i);
  assert.match(html, /Events[\s\S]*Activities/i);
  assert.match(html, /Characters/i);
  assert.match(html, /aria-label="Primary Game Navigation"/);
  assert.match(html, /class="mobile-menu-backdrop"/);
  assert.match(html, /class="mobile-menu-panel"/);
  assert.match(html, /class="mobile-menu-close"/);
  assert.match(html, /data-state="closed"/);
  assert.match(html, /Download/i);
  assert.match(html, /Language/i);

  const hashDownloadLinks = html.match(/href="#download"/g) ?? [];
  assert.equal(
    hashDownloadLinks.length,
    0,
    "download navigation should use the /download route instead of a hash anchor"
  );
  assert.match(html, /href="\/download"/);
});

test("mobile menu does not add an opaque white highlight layer", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.doesNotMatch(css, /\.mobile-menu-panel::before\s*\{/);
  assert.doesNotMatch(
    css,
    /\.mobile-menu-item-active[\s\S]*?border:\s*1\.5px solid #ffffff/
  );
  assert.match(css, /\.mobile-menu-panel::\-webkit\-scrollbar\s*\{/);
  assert.match(css, /scrollbar-color:/);
});

test("mobile menu backdrop provides a cross-browser translucent blur", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /--as-nav-backdrop:\s*rgba\(3, 11, 29, 0\.68\)/);
  assert.match(css, /background:\s*var\(--as-nav-backdrop\)/);
  assert.match(css, /-webkit-backdrop-filter:\s*blur\(24px\) saturate\(1\.2\)/);
  assert.match(css, /html\[data-mobile-menu-open="true"\]\s+main > :not\(header\)/);
  assert.match(css, /filter:\s*blur\(8px\)/);
});

test("mobile menu locks both document scroll containers while open", () => {
  const navbar = readFileSync(
    new URL("../components/avatar-star-navbar.tsx", import.meta.url),
    "utf8"
  );

  assert.match(navbar, /document\.body\.style\.overflow = "hidden"/);
  assert.match(navbar, /document\.documentElement\.style\.overflow = "hidden"/);
  assert.match(navbar, /document\.documentElement\.dataset\.mobileMenuOpen = "true"/);
  assert.match(navbar, /delete document\.documentElement\.dataset\.mobileMenuOpen/);
});

test("navbar stays pinned to the viewport while the page scrolls", () => {
  const navbar = readFileSync(
    new URL("../components/avatar-star-navbar.tsx", import.meta.url),
    "utf8"
  );

  assert.match(navbar, /<header className="fixed top-2/);
  assert.match(navbar, /left-1\/2 -translate-x-1\/2/);
});
