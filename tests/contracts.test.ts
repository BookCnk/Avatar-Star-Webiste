import assert from "node:assert/strict";
import test from "node:test";
import { developmentFallbackEnabled } from "../shared/development";
import { loginSchema } from "../shared/validations";

test("database fallback is development-only", () => {
  assert.equal(developmentFallbackEnabled("development", undefined), true);
  assert.equal(developmentFallbackEnabled("development", "false"), false);
  assert.equal(developmentFallbackEnabled("production", "true"), false);
});

test("login validation rejects extra properties and invalid emails", () => {
  assert.equal(
    loginSchema.safeParse({
      email: "user@example.com",
      password: "correct-password",
      role: "owner",
    }).success,
    false
  );
  assert.equal(
    loginSchema.safeParse({
      email: "invalid-email",
      password: "correct-password",
    }).success,
    false
  );
  assert.equal(
    loginSchema.safeParse({
      email: "user@example.com",
      password: "validpassword123",
    }).success,
    true
  );
});
