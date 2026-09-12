import assert from "node:assert/strict";
import test from "node:test";
import {
  buildTenderPayload,
  buildUsefulContactPayload,
  isAllowedSubmissionOrigin,
  isValidTurnstileResult,
  validateTenderSubmission,
  validateUsefulContactSubmission,
} from "./submissions";

const base = {
  submitterName: "  Maria Silva  ",
  submitterEmail: "  MARIA@example.com  ",
  consent: true,
  turnstileToken: "valid-turnstile-token",
  fax: "",
};

const usefulContact = {
  ...base,
  name: "  Hospital Central da Beira  ",
  categoryId: 14,
  phone: "+258 23 123 456",
  email: "  INFO@hospital.example  ",
  address: "  Avenida principal, Beira  ",
  publicWebsite: "https://hospital.example",
  description: "  Atendimento hospitalar de referência.  ",
};

const tender = {
  ...base,
  title: "  Técnico de Administração  ",
  institution: "  Município da Beira  ",
  deadline: "2026-10-31",
  type: "Concurso Público",
  vacancies: 4,
  editalUrl: "https://example.com/edital.pdf",
};

test("validates and normalizes a useful contact submission", () => {
  const result = validateUsefulContactSubmission(usefulContact);

  assert.equal(result.name, "Hospital Central da Beira");
  assert.equal(result.email, "info@hospital.example");
  assert.equal(result.submitterEmail, "maria@example.com");
  assert.equal(result.publicWebsite, "https://hospital.example/");
});

test("builds a pending useful contact payload with the live taxonomy key", () => {
  const payload = buildUsefulContactPayload(
    validateUsefulContactSubmission({ ...usefulContact, status: "publish" }),
  );

  assert.equal(payload.status, "pending");
  assert.deepEqual(payload["contacto-categorias"], [14]);
  assert.equal(payload.acf.contacto_phone, "+258 23 123 456");
  assert.equal("submitterEmail" in payload, false);
});

test("rejects a useful contact without a public contact method", () => {
  assert.throws(
    () =>
      validateUsefulContactSubmission({
        ...usefulContact,
        phone: "",
        email: "",
        address: "",
        publicWebsite: "",
      }),
    /pelo menos uma forma pública/,
  );
});

test("validates a tender and converts its date for SCF", () => {
  const result = validateTenderSubmission(tender);
  const payload = buildTenderPayload(result);

  assert.equal(result.submitterEmail, "maria@example.com");
  assert.equal(payload.status, "pending");
  assert.equal(payload.acf.concurso_deadline, "20261031");
  assert.equal(payload.acf.concurso_vacancies, 4);
});

test("rejects privileged, invalid, and unapproved tender data", () => {
  assert.throws(
    () => validateTenderSubmission({ ...tender, type: "Emprego privado" }),
    /Tipo de concurso inválido/,
  );
  assert.throws(
    () =>
      validateTenderSubmission({ ...tender, editalUrl: "javascript:alert(1)" }),
    /Link inválido/,
  );
  assert.throws(
    () => validateTenderSubmission({ ...tender, consent: false }),
    /aceitar os termos/,
  );
  assert.throws(
    () => validateTenderSubmission({ ...tender, deadline: "2026-02-31" }),
    /Data limite inválida/,
  );
});

test("requires the expected Turnstile action and production hostname", () => {
  const result = {
    success: true,
    action: "submit_contact",
    hostname: "www.revistachiveve.com",
  };

  assert.equal(
    isValidTurnstileResult(
      result,
      "submit_contact",
      new Set(["www.revistachiveve.com"]),
    ),
    true,
  );
  assert.equal(
    isValidTurnstileResult(
      result,
      "submit_tender",
      new Set(["www.revistachiveve.com"]),
    ),
    false,
  );
  assert.equal(
    isValidTurnstileResult(result, "submit_contact", new Set(["example.com"])),
    false,
  );
});

test("accepts only explicitly allowed submission origins", () => {
  const allowedOrigins = new Set(["https://www.revistachiveve.com"]);

  assert.equal(
    isAllowedSubmissionOrigin(
      "https://www.revistachiveve.com",
      allowedOrigins,
    ),
    true,
  );
  assert.equal(
    isAllowedSubmissionOrigin("https://attacker.example", allowedOrigins),
    false,
  );
  assert.equal(isAllowedSubmissionOrigin(undefined, allowedOrigins), false);
  assert.equal(isAllowedSubmissionOrigin("not-an-origin", allowedOrigins), false);
});
