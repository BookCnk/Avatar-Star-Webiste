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

  assert.match(html, /(Register|ลงทะเบียน|สมัคร)/i);
  assert.match(html, /(Download|ดาวน์โหลด)/i);
  assert.match(html, /(Top-?up|เติมเงิน)/i);
  assert.match(html, /(Events[\s\S]*Activities|กิจกรรม)/i);
  assert.match(html, /(Characters|ตัวละคร)/i);
  assert.match(html, /aria-label="Primary Game Navigation"/);
  assert.match(html, /class="mobile-menu-backdrop"/);
  assert.match(html, /class="mobile-menu-panel"/);
  assert.match(html, /class="mobile-menu-close"/);
  assert.match(html, /data-state="closed"/);
  assert.match(html, /(Download|ดาวน์โหลด)/i);
  assert.match(html, /(Language|ภาษา)/i);

  const hashDownloadLinks = html.match(/href="#download"/g) ?? [];
  assert.equal(
    hashDownloadLinks.length,
    0,
    "download navigation should use the /download route instead of a hash anchor"
  );
  assert.match(html, /href="\/download"/);
});

test("community section renders an interactive Hall of Fame leaderboard", () => {
  const html = renderToStaticMarkup(
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  );

  assert.match(html, /<section[^>]*id="community"/);
  assert.match(html, /HALL OF FAME/);
  assert.match(html, /role="tablist"/);
  assert.equal((html.match(/role="tab"/g) ?? []).length, 3);
  assert.match(html, /aria-label="Rank 1"/);
  assert.match(html, /aria-label="Ranks 4 to 10"/);
  assert.match(html, /aria-label="Previous ranking category"/);
  assert.match(html, /aria-label="Next ranking category"/);
  assert.match(html, /data-ranking-card="previous"/);
  assert.match(html, /data-ranking-card="next"/);
  assert.match(html, /data-carousel-direction="next"/);
  assert.match(html, /aria-label="Previous ranking category: คะแนนรวมสูงสุด"/);
  assert.match(html, /aria-label="Next ranking category: ชนะสูงสุด"/);
  assert.doesNotMatch(html, /Different avatars\. Same sky\./);
});

test("Thai font is applied globally and remains the display-font fallback", () => {
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(layout, /<body className="[^"]*\bfont-sans\b[^"]*"/);
  assert.match(
    css,
    /--font-display:\s*Impact,\s*Haettenschweiler,\s*"Arial Narrow Bold",\s*var\(--font-noto-thai\),\s*sans-serif;/,
  );
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

test("mobile menu backdrop stays visible without over-darkening the page", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /--as-nav-backdrop:\s*rgba\(3, 11, 29, 0\.42\)/);
  assert.match(css, /background:\s*var\(--as-nav-backdrop\)/);
  assert.match(css, /-webkit-backdrop-filter:\s*blur\(12px\) saturate\(1\.1\)/);
  assert.doesNotMatch(
    css,
    /html\[data-mobile-menu-open="true"\]\s+main > :not\(header\)\s*\{[^}]*filter:\s*blur/,
  );
});

test("opening the mobile menu does not shift the fixed navbar", () => {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /html\s*\{[^}]*scrollbar-gutter:\s*stable/);
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
