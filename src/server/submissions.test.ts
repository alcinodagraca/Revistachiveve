import assert from "node:assert/strict";
import test from "node:test";
import {
  buildEventPayload,
  buildTenderPayload,
  buildUsefulContactPayload,
  decodeSubmissionImage,
  isAllowedSubmissionOrigin,
  isValidTurnstileResult,
  validateEventSubmission,
  validateTenderSubmission,
  validateUsefulContactSubmission,
  validateImageInput,
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

const event = {
  ...base,
  title: "  Fórum Empresarial da Beira  ",
  description:
    "  Um encontro dedicado à liderança, inovação e novas oportunidades de negócio.  ",
  date: "2026-11-14",
  startTime: "09:00",
  endTime: "13:30",
  location: "  Centro Cultural da Beira  ",
  city: "  Beira, Moçambique  ",
  price: "Entrada livre",
  organizer: "  Revista Negócios no Chiveve  ",
  registrationUrl: "https://example.com/inscricao",
};

test("validates and normalizes a useful contact submission", () => {
  const result = validateUsefulContactSubmission(usefulContact);

  assert.equal(result.name, "Hospital Central da Beira");
  assert.equal(result.email, "info@hospital.example");
  assert.equal(result.submitterEmail, "maria@example.com");
  assert.equal(result.publicWebsite, "https://hospital.example/");
});

test("accepts valid optional images for every submission type", () => {
  const image = {
    mime: "image/png",
    base64: Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]).toString("base64"),
  };
  assert.deepEqual(decodeSubmissionImage(image), Buffer.from(image.base64, "base64"));
  assert.deepEqual(validateUsefulContactSubmission({ ...usefulContact, image }).image, image);
  assert.deepEqual(validateTenderSubmission({ ...tender, image }).image, image);
  assert.deepEqual(validateEventSubmission({ ...event, image }).image, image);
  assert.equal(validateImageInput(undefined), undefined);
});

test("rejects mismatched signatures, SVG, and oversized images", () => {
  assert.throws(() => validateImageInput({ mime: "image/svg+xml", base64: "PHN2Zz4=" }), /JPEG, PNG ou WebP/);
  assert.throws(() => decodeSubmissionImage({ mime: "image/png", base64: Buffer.from("not an image").toString("base64") }), /JPEG, PNG ou WebP/);
  assert.throws(() => validateImageInput({ mime: "image/jpeg", base64: "A".repeat(3_000_000) }), /JPEG, PNG ou WebP/);
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

test("validates an event and builds a safe pending WordPress payload", () => {
  const result = validateEventSubmission(event);
  const payload = buildEventPayload(result);

  assert.equal(result.title, "Fórum Empresarial da Beira");
  assert.equal(payload.status, "pending");
  assert.equal(payload.acf.event_date, "20261114");
  assert.equal(payload.acf.event_location, "Centro Cultural da Beira");
  assert.match(payload.content, /09:00–13:30/);
});

test("rejects invalid event dates, times, URLs, and consent", () => {
  assert.throws(
    () => validateEventSubmission({ ...event, date: "2026-02-31" }),
    /Data do evento inválida/,
  );
  assert.throws(
    () => validateEventSubmission({ ...event, endTime: "08:30" }),
    /hora de fim deve ser posterior/,
  );
  assert.throws(
    () =>
      validateEventSubmission({
        ...event,
        registrationUrl: "javascript:alert(1)",
      }),
    /Link inválido/,
  );
  assert.throws(
    () => validateEventSubmission({ ...event, consent: false }),
    /aceitar os termos/,
  );
});

test("escapes submitted event descriptions before storing HTML", () => {
  const result = validateEventSubmission({
    ...event,
    description: "Encontro aberto <script>alert('x')</script> para empresários.",
    startTime: "",
    endTime: "",
    status: "publish",
  });
  const payload = buildEventPayload(result);

  assert.equal(payload.status, "pending");
  assert.doesNotMatch(payload.content, /<script>/);
  assert.match(payload.content, /&lt;script&gt;/);
  assert.equal("status" in result, false);
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
