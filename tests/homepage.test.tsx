import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import HomePage from "../app/(site)/page";

test("homepage exposes the primary game actions and content sections", () => {
  const html = renderToStaticMarkup(<HomePage />);

  assert.match(html, /Play now/i);
  assert.match(html, /Download/i);
  assert.match(html, /Events[\s\S]*Activities/i);
  assert.match(html, /Characters/i);
  assert.match(html, /aria-label="Primary navigation"/);
});
