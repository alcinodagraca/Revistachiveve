import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestIP,
} from "@tanstack/react-start/server";
import { Resend } from "resend";
import { listContactCategories } from "./wp/contacts";
import { getWPSubmissionConfig } from "./wp/env";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d][\d\s()./-]{5,49}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const SUBMISSION_ERROR =
  "Não foi possível receber a submissão. Tente novamente.";

export const TENDER_TYPES = [
  "Concurso Público",
  "Concurso Limitado",
  "Outros",
] as const;

type TenderType = (typeof TENDER_TYPES)[number];

type SubmissionBase = {
  submitterName: string;
  submitterEmail: string;
  consent: true;
  turnstileToken: string;
  fax?: string;
};

export type UsefulContactSubmission = SubmissionBase & {
  name: string;
  categoryId: number;
  phone: string;
  email: string;
  address: string;
  publicWebsite: string;
  description: string;
};

export type TenderSubmission = SubmissionBase & {
  title: string;
  institution: string;
  deadline: string;
  type: TenderType;
  vacancies: number;
  editalUrl: string;
};

type PendingPostResponse = { id: number };

export type TurnstileResult = {
  success?: boolean;
  action?: string;
  hostname?: string;
};

function asRecord(input: unknown): Record<string, unknown> {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("Dados de submissão inválidos.");
  }
  return input as Record<string, unknown>;
}

function requiredString(
  input: Record<string, unknown>,
  field: string,
  minLength: number,
  maxLength: number,
): string {
  const value = input[field];
  if (typeof value !== "string")
    throw new Error("Dados de submissão inválidos.");
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length < minLength || normalized.length > maxLength) {
    throw new Error("Dados de submissão inválidos.");
  }
  return normalized;
}

function optionalString(
  input: Record<string, unknown>,
  field: string,
  maxLength: number,
): string {
  const value = input[field];
  if (value === undefined || value === "") return "";
  if (typeof value !== "string")
    throw new Error("Dados de submissão inválidos.");
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length > maxLength)
    throw new Error("Dados de submissão inválidos.");
  return normalized;
}

function email(
  input: Record<string, unknown>,
  field: string,
  required = true,
): string {
  const value = required
    ? requiredString(input, field, 3, 254)
    : optionalString(input, field, 254);
  const normalized = value.toLowerCase();
  if (normalized && !EMAIL_PATTERN.test(normalized)) {
    throw new Error("Endereço de email inválido.");
  }
  return normalized;
}

function httpUrl(
  input: Record<string, unknown>,
  field: string,
  required = false,
): string {
  const value = required
    ? requiredString(input, field, 8, 2_000)
    : optionalString(input, field, 2_000);
  if (!value) return "";
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:")
      throw new Error();
    return url.toString();
  } catch {
    throw new Error(
      "Link inválido. Use um endereço iniciado por http:// ou https://.",
    );
  }
}

function submissionBase(input: Record<string, unknown>): SubmissionBase {
  if (input.consent !== true) {
    throw new Error("É necessário aceitar os termos de submissão.");
  }
  return {
    submitterName: requiredString(input, "submitterName", 2, 100),
    submitterEmail: email(input, "submitterEmail"),
    consent: true,
    turnstileToken: requiredString(input, "turnstileToken", 10, 2_048),
    fax: optionalString(input, "fax", 200),
  };
}

function isValidCalendarDate(value: string): boolean {
  if (!DATE_PATTERN.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function validateUsefulContactSubmission(
  input: unknown,
): UsefulContactSubmission {
  const record = asRecord(input);
  const categoryId = Number(record.categoryId);
  if (!Number.isInteger(categoryId) || categoryId <= 0) {
    throw new Error("Seleccione uma categoria válida.");
  }

  const phone = optionalString(record, "phone", 50);
  if (phone && !PHONE_PATTERN.test(phone)) {
    throw new Error("Número de telefone inválido.");
  }
  const publicEmail = email(record, "email", false);
  const address = optionalString(record, "address", 300);
  const publicWebsite = httpUrl(record, "publicWebsite");
  if (!phone && !publicEmail && !address && !publicWebsite) {
    throw new Error("Indique pelo menos uma forma pública de contacto.");
  }

  return {
    ...submissionBase(record),
    name: requiredString(record, "name", 2, 140),
    categoryId,
    phone,
    email: publicEmail,
    address,
    publicWebsite,
    description: requiredString(record, "description", 10, 1_000),
  };
}

export function validateTenderSubmission(input: unknown): TenderSubmission {
  const record = asRecord(input);
  const deadline = requiredString(record, "deadline", 10, 10);
  if (!isValidCalendarDate(deadline)) {
    throw new Error("Data limite inválida.");
  }

  const type = requiredString(record, "type", 3, 50);
  if (!TENDER_TYPES.includes(type as TenderType)) {
    throw new Error("Tipo de concurso inválido.");
  }

  const vacancies = Number(record.vacancies);
  if (!Number.isInteger(vacancies) || vacancies < 0 || vacancies > 100_000) {
    throw new Error("Número de vagas inválido.");
  }

  return {
    ...submissionBase(record),
    title: requiredString(record, "title", 3, 180),
    institution: requiredString(record, "institution", 2, 150),
    deadline,
    type: type as TenderType,
    vacancies,
    editalUrl: httpUrl(record, "editalUrl", true),
  };
}

export function buildUsefulContactPayload(data: UsefulContactSubmission) {
  return {
    status: "pending" as const,
    title: data.name,
    "contacto-categorias": [data.categoryId],
    acf: {
      contacto_phone: data.phone,
      contacto_email: data.email,
      contacto_address: data.address,
      contacto_website: data.publicWebsite,
      contacto_description: data.description,
    },
  };
}

export function buildTenderPayload(data: TenderSubmission) {
  return {
    status: "pending" as const,
    title: data.title,
    acf: {
      concurso_institution: data.institution,
      concurso_deadline: data.deadline.replaceAll("-", ""),
      concurso_type: data.type,
      concurso_vacancies: data.vacancies,
      concurso_edital_url: data.editalUrl,
    },
  };
}

export function isValidTurnstileResult(
  result: TurnstileResult,
  expectedAction: string,
  expectedHostnames: ReadonlySet<string>,
): boolean {
  return Boolean(
    result.success &&
      result.action === expectedAction &&
      result.hostname &&
      expectedHostnames.has(result.hostname),
  );
}

export function isAllowedSubmissionOrigin(
  origin: string | undefined,
  allowedOrigins: ReadonlySet<string>,
): boolean {
  if (!origin) return false;
  try {
    return allowedOrigins.has(new URL(origin).origin);
  } catch {
    return false;
  }
}

function assertSameOrigin(): void {
  const origin = getRequestHeader("origin");
  const allowedOrigins = new Set(
    (
      process.env.SUBMISSION_ORIGINS ?? "https://www.revistachiveve.com"
    )
      .split(",")
      .flatMap((value) => {
        try {
          return [new URL(value.trim()).origin];
        } catch {
          return [];
        }
      }),
  );
  if (!isAllowedSubmissionOrigin(origin, allowedOrigins)) {
    throw new Error(SUBMISSION_ERROR);
  }
}

async function verifyTurnstile(
  token: string,
  expectedAction: string,
): Promise<void> {
  getWPSubmissionConfig();
  const secret = process.env.TURNSTILE_SECRET;
  const expectedHostnames = new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((hostname) => hostname.trim().toLowerCase())
      .filter(Boolean),
  );
  if (!secret || expectedHostnames.size === 0) {
    throw new Error("O serviço de submissões não está configurado.");
  }

  const body = new URLSearchParams({ secret, response: token });
  const remoteIp = getRequestIP({ xForwardedFor: true });
  if (remoteIp) body.set("remoteip", remoteIp);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body,
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(SUBMISSION_ERROR);
    const result = (await response.json()) as TurnstileResult;
    if (!isValidTurnstileResult(result, expectedAction, expectedHostnames)) {
      throw new Error("A verificação anti-spam falhou. Tente novamente.");
    }
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.startsWith("A verificação anti-spam")
    ) {
      throw error;
    }
    console.error(
      "Turnstile verification failed:",
      error instanceof Error ? error.name : "UnknownError",
    );
    throw new Error(SUBMISSION_ERROR);
  } finally {
    clearTimeout(timeout);
  }
}

async function createPendingPost(
  restBase: "contacto-util" | "concurso",
  payload: Record<string, unknown>,
): Promise<PendingPostResponse> {
  const { baseUrl, authHeader } = getWPSubmissionConfig();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);
  try {
    const response = await fetch(`${baseUrl}/${restBase}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload, status: "pending" }),
      signal: controller.signal,
    });
    if (!response.ok) {
      console.error("WordPress submission failed:", restBase, response.status);
      throw new Error(SUBMISSION_ERROR);
    }
    const post = (await response.json()) as Partial<PendingPostResponse>;
    if (!Number.isInteger(post.id)) throw new Error(SUBMISSION_ERROR);
    return post as PendingPostResponse;
  } catch (error) {
    if (error instanceof Error && error.message === SUBMISSION_ERROR)
      throw error;
    console.error(
      "WordPress submission request failed:",
      restBase,
      error instanceof Error ? error.name : "UnknownError",
    );
    throw new Error(SUBMISSION_ERROR);
  } finally {
    clearTimeout(timeout);
  }
}

async function notifyEditors(input: {
  kind: string;
  postId: number;
  submitterName: string;
  submitterEmail: string;
  summary: string[];
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) {
    console.warn(
      "Submission persisted without editor email: Resend is not configured.",
    );
    return;
  }

  const recipients = to
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  if (recipients.length === 0) return;

  try {
    const wpOrigin = new URL(getWPSubmissionConfig().baseUrl).origin;
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to: recipients,
      replyTo: input.submitterEmail,
      subject: `[Submissão] ${input.kind} pendente`,
      text: [
        `Submetido por: ${input.submitterName}`,
        `Email: ${input.submitterEmail}`,
        `ID no WordPress: ${input.postId}`,
        `Rever: ${wpOrigin}/wp-admin/post.php?post=${input.postId}&action=edit`,
        "",
        ...input.summary,
      ].join("\n"),
    });
    if (error) {
      console.error(
        "Submission editor notification failed:",
        error.name,
        error.message,
      );
    }
  } catch (error) {
    console.error(
      "Submission editor notification failed:",
      error instanceof Error ? error.name : "UnknownError",
    );
  }
}

export const submitUsefulContact = createServerFn({ method: "POST" })
  .inputValidator(validateUsefulContactSubmission)
  .handler(async ({ data }) => {
    if (data.fax) return { accepted: true };
    assertSameOrigin();
    await verifyTurnstile(data.turnstileToken, "submit_contact");

    const categories = await listContactCategories();
    if (!categories.some((category) => category.id === data.categoryId)) {
      throw new Error("Seleccione uma categoria válida.");
    }

    const post = await createPendingPost(
      "contacto-util",
      buildUsefulContactPayload(data),
    );
    await notifyEditors({
      kind: "Contacto útil",
      postId: post.id,
      submitterName: data.submitterName,
      submitterEmail: data.submitterEmail,
      summary: [`Contacto: ${data.name}`, `Categoria ID: ${data.categoryId}`],
    });
    return { accepted: true };
  });

export const submitTender = createServerFn({ method: "POST" })
  .inputValidator(validateTenderSubmission)
  .handler(async ({ data }) => {
    if (data.fax) return { accepted: true };
    assertSameOrigin();
    await verifyTurnstile(data.turnstileToken, "submit_tender");

    const post = await createPendingPost("concurso", buildTenderPayload(data));
    await notifyEditors({
      kind: "Concurso público",
      postId: post.id,
      submitterName: data.submitterName,
      submitterEmail: data.submitterEmail,
      summary: [`Concurso: ${data.title}`, `Instituição: ${data.institution}`],
    });
    return { accepted: true };
  });
