import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestIP,
} from "@tanstack/react-start/server";
import { Resend } from "resend";
import { listContactCategories } from "./wp/contacts";
import { getWPSubmissionConfig } from "./wp/env";
import { CONTACT_CATEGORY_NAMES } from "../data/contactCategories";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d][\d\s()./-]{5,49}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const SUBMISSION_ERROR =
  "Não foi possível receber a submissão. Tente novamente.";
export const MAX_SUBMISSION_IMAGE_BYTES = 2 * 1024 * 1024;
export const MAX_SUBMISSION_PDF_BYTES = 3 * 1024 * 1024;
export const MAX_TENDER_UPLOAD_BYTES = 3 * 1024 * 1024;
const IMAGE_TYPES = {
  "image/jpeg": { extension: "jpg", signature: [0xff, 0xd8, 0xff] },
  "image/png": { extension: "png", signature: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
  "image/webp": { extension: "webp", signature: [0x52, 0x49, 0x46, 0x46] },
} as const;

export type SubmissionImage = { mime: string; base64: string };
export type SubmissionPdf = { mime: "application/pdf"; base64: string };

export const TENDER_TYPES = [
  "Concurso Público",
  "Concurso Limitado",
  "Manifestação de interesse",
  "Contratação",
  "Fornecimento",
  "Prestação de serviços",
  "Consultoria",
  "Empreitada pública",
  "Outros",
] as const;

type TenderType = (typeof TENDER_TYPES)[number];

type SubmissionBase = {
  submitterName: string;
  submitterEmail: string;
  consent: true;
  turnstileToken: string;
  fax?: string;
  image?: SubmissionImage;
};

export type UsefulContactSubmission = SubmissionBase & {
  name: string;
  categoryId: number;
  categoryName?: string;
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
  editalPdf?: SubmissionPdf;
};

export type EventSubmission = SubmissionBase & {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  city: string;
  price: string;
  organizer: string;
  registrationUrl: string;
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
    image: validateImageInput(input.image),
  };
}

export function validateImageInput(input: unknown): SubmissionImage | undefined {
  if (input === undefined || input === null) return undefined;
  const record = asRecord(input);
  const mime = record.mime;
  const base64 = record.base64;
  if (
    typeof mime !== "string" ||
    !(mime in IMAGE_TYPES) ||
    typeof base64 !== "string" ||
    !base64.length ||
    base64.length > Math.ceil(MAX_SUBMISSION_IMAGE_BYTES / 3) * 4 ||
    !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(base64)
  ) {
    throw new Error("A imagem deve ser JPEG, PNG ou WebP e ter até 2 MB.");
  }
  return { mime, base64 };
}

export function decodeSubmissionImage(image: SubmissionImage): Buffer {
  const bytes = Buffer.from(image.base64, "base64");
  const format = IMAGE_TYPES[image.mime as keyof typeof IMAGE_TYPES];
  if (
    !format ||
    !bytes.length ||
    bytes.length > MAX_SUBMISSION_IMAGE_BYTES ||
    !format.signature.every((byte, index) => bytes[index] === byte) ||
    (image.mime === "image/webp" && bytes.toString("ascii", 8, 12) !== "WEBP")
  ) {
    throw new Error("A imagem deve ser JPEG, PNG ou WebP e ter até 2 MB.");
  }
  return bytes;
}

export function validatePdfInput(input: unknown): SubmissionPdf | undefined {
  if (input === undefined || input === null) return undefined;
  const record = asRecord(input);
  const { mime, base64 } = record;
  if (
    mime !== "application/pdf" ||
    typeof base64 !== "string" ||
    !base64.length ||
    base64.length > Math.ceil(MAX_SUBMISSION_PDF_BYTES / 3) * 4 ||
    !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(base64)
  ) {
    throw new Error("O edital deve ser um PDF com até 3 MB.");
  }
  return { mime, base64 };
}

export function decodeSubmissionPdf(pdf: SubmissionPdf): Buffer {
  const bytes = Buffer.from(pdf.base64, "base64");
  if (
    bytes.length < 5 ||
    bytes.length > MAX_SUBMISSION_PDF_BYTES ||
    bytes.toString("ascii", 0, 5) !== "%PDF-"
  ) {
    throw new Error("O edital deve ser um PDF com até 3 MB.");
  }
  return bytes;
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
  const categoryName = optionalString(record, "categoryName", 100);
  const isKnownCategory = CONTACT_CATEGORY_NAMES.some(
    (name) => name.localeCompare(categoryName, "pt", { sensitivity: "base" }) === 0,
  );
  if (!Number.isInteger(categoryId) || (categoryId <= 0 && !isKnownCategory)) {
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
    categoryName,
    phone,
    email: publicEmail,
    address,
    publicWebsite,
    description: requiredString(record, "description", 10, 1_000),
  };
}

export function validateTenderSubmission(input: unknown): TenderSubmission {
  const record = asRecord(input);
  const image = validateImageInput(record.image);
  const editalPdf = validatePdfInput(record.editalPdf);
  const editalUrl = httpUrl(record, "editalUrl");
  if (!editalPdf && !editalUrl) {
    throw new Error("Anexe o edital em PDF ou indique o link oficial.");
  }
  if (image && editalPdf) {
    const imageBytes = decodeSubmissionImage(image).length;
    const pdfBytes = decodeSubmissionPdf(editalPdf).length;
    if (imageBytes + pdfBytes > MAX_TENDER_UPLOAD_BYTES) {
      throw new Error("O PDF e a imagem juntos não podem exceder 3 MB.");
    }
  } else if (editalPdf) {
    decodeSubmissionPdf(editalPdf);
  }
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
    editalUrl,
    editalPdf,
  };
}

function eventTime(
  input: Record<string, unknown>,
  field: string,
): string {
  const value = optionalString(input, field, 5);
  if (value && !/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) {
    throw new Error("Horário do evento inválido.");
  }
  return value;
}

export function validateEventSubmission(input: unknown): EventSubmission {
  const record = asRecord(input);
  const date = requiredString(record, "date", 10, 10);
  if (!isValidCalendarDate(date)) {
    throw new Error("Data do evento inválida.");
  }

  const startTime = eventTime(record, "startTime");
  const endTime = eventTime(record, "endTime");
  if (endTime && !startTime) {
    throw new Error("Indique a hora de início do evento.");
  }
  if (startTime && endTime && endTime <= startTime) {
    throw new Error("A hora de fim deve ser posterior à hora de início.");
  }

  return {
    ...submissionBase(record),
    title: requiredString(record, "title", 3, 180),
    description: requiredString(record, "description", 20, 2_000),
    date,
    startTime,
    endTime,
    location: requiredString(record, "location", 2, 220),
    city: requiredString(record, "city", 2, 120),
    price: optionalString(record, "price", 100),
    organizer: requiredString(record, "organizer", 2, 150),
    registrationUrl: httpUrl(record, "registrationUrl"),
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function buildUsefulContactPayload(data: UsefulContactSubmission) {
  return {
    status: "pending" as const,
    title: data.name,
    ...(data.categoryId > 0
      ? { "contacto-categorias": [data.categoryId] }
      : {}),
    acf: {
      contacto_phone: data.phone,
      contacto_email: data.email,
      contacto_address: data.address,
      contacto_website: data.publicWebsite,
      contacto_description: data.description,
    },
  };
}

export function buildTenderPayload(
  data: TenderSubmission,
  pdfMedia?: { id: number; sourceUrl: string },
) {
  return {
    status: "pending" as const,
    title: data.title,
    acf: {
      concurso_institution: data.institution,
      concurso_deadline: data.deadline.replaceAll("-", ""),
      concurso_type: data.type,
      concurso_vacancies: data.vacancies,
      concurso_edital_url: pdfMedia?.sourceUrl ?? data.editalUrl,
      ...(pdfMedia ? { concurso_edital_pdf: pdfMedia.id } : {}),
    },
  };
}

export function buildEventPayload(data: EventSubmission) {
  const time = data.startTime
    ? `${data.startTime}${data.endTime ? `–${data.endTime}` : ""}`
    : "";
  return {
    status: "pending" as const,
    title: data.title,
    content: [
      `<p>${escapeHtml(data.description)}</p>`,
      time ? `<p><strong>Horário:</strong> ${escapeHtml(time)}</p>` : "",
    ]
      .filter(Boolean)
      .join(""),
    acf: {
      event_date: data.date.replaceAll("-", ""),
      event_location: data.location,
      event_city: data.city,
      event_price: data.price,
      event_organizer: data.organizer,
      event_registration_url: data.registrationUrl,
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
  restBase: "contacto-util" | "concurso" | "eventos",
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

type UploadedMedia = { id: number; sourceUrl: string };

async function uploadSubmissionMedia(
  file: SubmissionImage | SubmissionPdf,
): Promise<UploadedMedia> {
  const isPdf = file.mime === "application/pdf";
  const bytes = isPdf
    ? decodeSubmissionPdf(file as SubmissionPdf)
    : decodeSubmissionImage(file);
  const { baseUrl, authHeader } = getWPSubmissionConfig();
  const extension = isPdf
    ? "pdf"
    : IMAGE_TYPES[file.mime as keyof typeof IMAGE_TYPES].extension;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  try {
    const response = await fetch(`${baseUrl}/media`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: authHeader,
        "Content-Type": file.mime,
        "Content-Disposition": `attachment; filename="submission-${crypto.randomUUID()}.${extension}"`,
      },
      body: new Blob([Uint8Array.from(bytes)], { type: file.mime }),
      signal: controller.signal,
    });
    if (!response.ok) {
      console.error("WordPress media upload failed:", response.status);
      throw new Error(`Não foi possível carregar ${isPdf ? "o PDF" : "a imagem"}. Tente novamente.`);
    }
    const media = (await response.json()) as { id?: number; source_url?: string };
    if (!Number.isInteger(media.id)) throw new Error(SUBMISSION_ERROR);
    if (isPdf && (!media.source_url || !/^https?:\/\//.test(media.source_url))) {
      throw new Error(SUBMISSION_ERROR);
    }
    return { id: media.id!, sourceUrl: media.source_url ?? "" };
  } catch (error) {
    if (error instanceof Error && (error.message === SUBMISSION_ERROR || error.message.startsWith("Não foi possível carregar"))) throw error;
    console.error("WordPress media upload request failed:", error instanceof Error ? error.name : "UnknownError");
    throw new Error(`Não foi possível carregar ${isPdf ? "o PDF" : "a imagem"}. Tente novamente.`);
  } finally {
    clearTimeout(timeout);
  }
}

async function uploadSubmissionImage(image?: SubmissionImage): Promise<number | undefined> {
  return image ? (await uploadSubmissionMedia(image)).id : undefined;
}

async function createSubmissionWithImage(
  restBase: "contacto-util" | "concurso" | "eventos",
  payload: Record<string, unknown>,
  image?: SubmissionImage,
): Promise<PendingPostResponse> {
  const mediaId = await uploadSubmissionImage(image);
  try {
    return await createPendingPost(restBase, {
      ...payload,
      ...(mediaId ? { featured_media: mediaId } : {}),
    });
  } catch (error) {
    // Upload permissions deliberately do not include deletion; leave a trace
    // for an editor to clean up the unattached media item if post creation fails.
    if (mediaId) console.error("Submission media needs review:", mediaId);
    throw error;
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
    const matchedCategory = categories.find(
      (category) =>
        category.id === data.categoryId ||
        category.name.localeCompare(data.categoryName ?? "", "pt", {
          sensitivity: "base",
        }) === 0,
    );
    if (data.categoryId > 0 && !matchedCategory) {
      throw new Error("Seleccione uma categoria válida.");
    }

    const submission = {
      ...data,
      categoryId: matchedCategory?.id ?? 0,
    };

    const post = await createSubmissionWithImage(
      "contacto-util",
      buildUsefulContactPayload(submission),
      data.image,
    );
    await notifyEditors({
      kind: "Contacto útil",
      postId: post.id,
      submitterName: data.submitterName,
      submitterEmail: data.submitterEmail,
      summary: [
        `Contacto: ${data.name}`,
        `Categoria: ${data.categoryName || matchedCategory?.name || data.categoryId}`,
      ],
    });
    return { accepted: true };
  });

export const submitTender = createServerFn({ method: "POST" })
  .inputValidator(validateTenderSubmission)
  .handler(async ({ data }) => {
    if (data.fax) return { accepted: true };
    assertSameOrigin();
    await verifyTurnstile(data.turnstileToken, "submit_tender");

    const pdfMedia = data.editalPdf
      ? await uploadSubmissionMedia(data.editalPdf)
      : undefined;
    let post: PendingPostResponse;
    try {
      post = await createSubmissionWithImage(
        "concurso",
        buildTenderPayload(data, pdfMedia),
        data.image,
      );
    } catch (error) {
      if (pdfMedia) console.error("Submission PDF needs review:", pdfMedia.id);
      throw error;
    }
    await notifyEditors({
      kind: "Concurso público",
      postId: post.id,
      submitterName: data.submitterName,
      submitterEmail: data.submitterEmail,
      summary: [`Concurso: ${data.title}`, `Instituição: ${data.institution}`],
    });
    return { accepted: true };
  });

export const submitEvent = createServerFn({ method: "POST" })
  .inputValidator(validateEventSubmission)
  .handler(async ({ data }) => {
    if (data.fax) return { accepted: true };
    assertSameOrigin();
    await verifyTurnstile(data.turnstileToken, "submit_event");

    const post = await createSubmissionWithImage("eventos", buildEventPayload(data), data.image);
    await notifyEditors({
      kind: "Evento",
      postId: post.id,
      submitterName: data.submitterName,
      submitterEmail: data.submitterEmail,
      summary: [
        `Evento: ${data.title}`,
        `Data: ${data.date}`,
        `Local: ${data.location}, ${data.city}`,
      ],
    });
    return { accepted: true };
  });
