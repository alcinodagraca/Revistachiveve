import assert from "node:assert/strict";
import test from "node:test";
import { validateContactInput } from "./contact";

const validInput = {
  name: "  Maria Silva  ",
  email: "  MARIA@example.com  ",
  subject: "  Sugestão editorial  ",
  message: "  Esta é uma mensagem suficientemente longa.  ",
  website: "",
};

test("validateContactInput normalizes valid contact data", () => {
  assert.deepEqual(validateContactInput(validInput), {
    name: "Maria Silva",
    email: "maria@example.com",
    subject: "Sugestão editorial",
    message: "Esta é uma mensagem suficientemente longa.",
    website: "",
  });
});

test("validateContactInput rejects an invalid email", () => {
  assert.throws(
    () => validateContactInput({ ...validInput, email: "not-an-email" }),
    /email inválido/,
  );
});

test("validateContactInput rejects short and oversized fields", () => {
  assert.throws(() => validateContactInput({ ...validInput, name: "A" }), /inválidos/);
  assert.throws(
    () => validateContactInput({ ...validInput, message: "x".repeat(5_001) }),
    /inválidos/,
  );
});
