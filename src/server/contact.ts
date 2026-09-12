import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function requiredString(
  input: Record<string, unknown>,
  field: keyof ContactInput,
  minLength: number,
  maxLength: number,
) {
  const value = input[field];
  if (typeof value !== "string") throw new Error("Dados de contacto inválidos.");

  const trimmed = value.trim();
  if (trimmed.length < minLength || trimmed.length > maxLength) {
    throw new Error("Dados de contacto inválidos.");
  }

  return trimmed;
}

export function validateContactInput(input: unknown): ContactInput {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("Dados de contacto inválidos.");
  }

  const record = input as Record<string, unknown>;
  const email = requiredString(record, "email", 3, 254).toLowerCase();
  if (!EMAIL_PATTERN.test(email)) throw new Error("Endereço de email inválido.");

  const website = record.website;
  if (website !== undefined && typeof website !== "string") {
    throw new Error("Dados de contacto inválidos.");
  }

  return {
    name: requiredString(record, "name", 2, 100),
    email,
    subject: requiredString(record, "subject", 3, 150),
    message: requiredString(record, "message", 10, 5_000),
    website: website?.trim().slice(0, 200),
  };
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator(validateContactInput)
  .handler(async ({ data }) => {
    // Bots commonly populate fields hidden from real visitors. Return success so
    // they do not learn that their submission was discarded.
    if (data.website) return { sent: true };

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const to = process.env.CONTACT_TO_EMAIL;
    if (!apiKey || !from || !to) {
      throw new Error("O serviço de contacto não está configurado.");
    }

    const recipients = to
      .split(",")
      .map((address) => address.trim())
      .filter(Boolean);
    if (recipients.length === 0) {
      throw new Error("O serviço de contacto não está configurado.");
    }

    const { error } = await new Resend(apiKey).emails.send({
      from,
      to: recipients,
      replyTo: data.email,
      subject: `[Contacto] ${data.subject}`,
      text: [
        `Nome: ${data.name}`,
        `Email: ${data.email}`,
        `Assunto: ${data.subject}`,
        "",
        data.message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend contact delivery failed:", error.name, error.message);
      throw new Error("Não foi possível enviar a mensagem.");
    }

    return { sent: true };
  });
