import { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaCheck, FaPaperPlane } from "react-icons/fa6";
import type { ContactCategory } from "../../server/wp/contacts";
import {
  submitEvent,
  submitTender,
  submitUsefulContact,
  TENDER_TYPES,
  MAX_SUBMISSION_IMAGE_BYTES,
} from "../../server/submissions";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { CONTACT_CATEGORY_NAMES } from "../../data/contactCategories";

type SubmissionState = "idle" | "sending" | "success" | "error";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
      theme: "light";
    },
  ) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const TURNSTILE_SCRIPT_ID = "cloudflare-turnstile-script";
const TURNSTILE_SITE_KEY = "0x4AAAAAAExoS6ttyxnKc9Lt";
const fieldLabel =
  "mb-1.5 block font-sans text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-primary";
const submissionForm =
  "space-y-4 px-5 py-5 sm:px-7 [&_[data-slot=input]]:min-h-[44px] [&_[data-slot=input]]:border-foreground/50 [&_[data-slot=input]]:bg-secondary/35 [&_[data-slot=input]]:focus-visible:bg-background [&_[data-slot=textarea]]:border-foreground/50 [&_[data-slot=textarea]]:bg-secondary/35 [&_[data-slot=textarea]]:focus-visible:bg-background";
const selectControl =
  "min-h-[44px] w-full border border-foreground/50 bg-secondary/35 px-3 font-sans text-sm outline-none transition-[color,box-shadow] focus:border-ring focus:bg-background focus:ring-3 focus:ring-ring/50";

function TurnstileWidget({
  action,
  resetSignal,
  onToken,
  onError,
}: {
  action: string;
  resetSignal: number;
  onToken: (token: string) => void;
  onError: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(onToken);
  const errorCallbackRef = useRef(onError);
  callbackRef.current = onToken;
  errorCallbackRef.current = onError;

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !containerRef.current) return;
    let widgetId: string | undefined;
    let cancelled = false;

    const render = () => {
      if (cancelled || !window.turnstile || !containerRef.current || widgetId)
        return;
      widgetId = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        action,
        callback: (token) => callbackRef.current(token),
        "expired-callback": () => {
          callbackRef.current("");
          errorCallbackRef.current();
        },
        "error-callback": () => {
          callbackRef.current("");
          errorCallbackRef.current();
        },
        theme: "light",
      });
    };

    const handleScriptError = () => {
      document.getElementById(TURNSTILE_SCRIPT_ID)?.remove();
      if (!cancelled) errorCallbackRef.current();
    };

    let script = document.getElementById(
      TURNSTILE_SCRIPT_ID,
    ) as HTMLScriptElement | null;
    if (window.turnstile) {
      render();
    } else {
      if (!script) {
        script = document.createElement("script");
        script.id = TURNSTILE_SCRIPT_ID;
        script.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", render);
      script.addEventListener("error", handleScriptError);
    }

    return () => {
      cancelled = true;
      script?.removeEventListener("load", render);
      script?.removeEventListener("error", handleScriptError);
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [action, resetSignal]);

  if (!TURNSTILE_SITE_KEY) {
    return (
      <p className="border border-destructive/35 bg-destructive/5 p-3 font-sans text-sm text-destructive">
        O formulário aguarda a configuração da verificação anti-spam.
      </p>
    );
  }

  return <div ref={containerRef} className="min-h-[65px]" />;
}

function Honeypot() {
  return (
    <div
      className="absolute -left-[10000px] h-px w-px overflow-hidden"
      aria-hidden="true"
    >
      <label htmlFor="submission-fax">Fax</label>
      <input
        id="submission-fax"
        name="fax"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}

function ConsentField({ id }: { id: string }) {
  return (
    <label
      htmlFor={id}
      className="flex items-start gap-3 font-sans text-sm leading-6 text-foreground/75"
    >
      <input
        id={id}
        name="consent"
        type="checkbox"
        required
        className="mt-1 size-4 accent-primary"
      />
      <span>
        Confirmo que os dados são correctos e autorizo a Revista Chiveve a
        analisá-los, editá-los e publicá-los após aprovação editorial.
      </span>
    </label>
  );
}

function SubmissionFeedback({
  state,
  error,
}: {
  state: SubmissionState;
  error: string;
}) {
  if (state === "success") {
    return (
      <div
        className="border border-primary/25 bg-primary/5 p-6 text-center"
        role="status"
      >
        <FaCheck className="mx-auto mb-3 text-primary" size={24} />
        <p className="font-serif text-xl font-semibold text-foreground">
          Submissão recebida
        </p>
        <p className="mt-2 font-sans text-sm leading-6 text-foreground/70">
          A equipa editorial irá rever os dados antes de qualquer publicação.
        </p>
      </div>
    );
  }
  if (state === "error") {
    return (
      <p
        className="border border-destructive/35 bg-destructive/5 p-3 font-sans text-sm text-destructive"
        role="alert"
      >
        {error}
      </p>
    );
  }
  return null;
}

function VerificationRetry({ onRetry }: { onRetry: () => void }) {
  return (
    <Button type="button" variant="outline" size="sm" onClick={onRetry}>
      Recarregar verificação
    </Button>
  );
}

function DialogCta({
  eyebrow,
  text,
  button,
  inverted = false,
  children,
}: {
  eyebrow: string;
  text: string;
  button: string;
  inverted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`mb-10 flex flex-col gap-5 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-7 ${
        inverted
          ? "border-0 bg-primary"
          : "border-y border-border bg-secondary/45"
      }`}
    >
      <div className={inverted ? "min-w-0 flex-1" : undefined}>
        <p
          className={`mb-1 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.12em] ${
            inverted ? "text-primary-foreground" : "text-primary"
          }`}
        >
          {eyebrow}
        </p>
        <p
          className={`${inverted ? "max-w-4xl text-primary-foreground/90" : "max-w-2xl text-foreground/75"} font-sans text-[0.94rem] font-light leading-7`}
        >
          {text}
        </p>
      </div>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className={`self-start shrink-0 md:self-auto ${
            inverted
              ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              : ""
          }`}
        >
          {button}
          <FaArrowRight />
        </Button>
      </DialogTrigger>
      {children}
    </div>
  );
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error && error.message
    ? error.message
    : "Não foi possível receber a submissão. Tente novamente.";
}

function ImageField({ id, label }: { id: string; label: string }) {
  return (
    <div className="md:col-span-2">
      <label htmlFor={id} className={fieldLabel}>{label}</label>
      <input
        id={id}
        name="image"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        aria-describedby={`${id}-hint`}
        className="block min-h-11 min-w-0 w-full border border-foreground/50 bg-secondary/35 p-2 font-sans text-sm text-foreground file:mr-3 file:border-0 file:bg-primary file:px-3 file:py-2 file:font-semibold file:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      />
      <p id={`${id}-hint`} className="mt-1.5 font-sans text-xs leading-5 text-foreground/75">
        Opcional · JPEG, PNG ou WebP · máximo 2 MB. A imagem será revista, mas o ficheiro poderá ser acessível por link após o envio; não inclua dados confidenciais.
      </p>
    </div>
  );
}

async function readSubmissionImage(value: FormDataEntryValue | null) {
  if (!(value instanceof File) || value.size === 0) return undefined;
  if (
    value.size > MAX_SUBMISSION_IMAGE_BYTES ||
    !["image/jpeg", "image/png", "image/webp"].includes(value.type)
  ) {
    throw new Error("A imagem deve ser JPEG, PNG ou WebP e ter até 2 MB.");
  }
  const bytes = new Uint8Array(await value.arrayBuffer());
  let binary = "";
  for (let index = 0; index < bytes.length; index += 8192) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 8192));
  }
  return { mime: value.type, base64: btoa(binary) };
}

export function UsefulContactSubmissionDialog({
  categories,
}: {
  categories: ContactCategory[];
}) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<SubmissionState>("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [resetSignal, setResetSignal] = useState(0);

  if (!TURNSTILE_SITE_KEY) return null;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && state === "sending") return;
    setOpen(nextOpen);
    if (!nextOpen) {
      setState("idle");
      setError("");
      setToken("");
      setResetSignal((value) => value + 1);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "sending" || !token) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const categoryName = String(data.get("categoryName") ?? "");
    const categoryId =
      categories.find(
        (category) =>
          category.name.localeCompare(categoryName, "pt", {
            sensitivity: "base",
          }) === 0,
      )?.id ?? 0;
    setState("sending");
    setError("");
    try {
      await submitUsefulContact({
        data: {
          image: await readSubmissionImage(data.get("image")),
          name: String(data.get("name") ?? ""),
          categoryId,
          categoryName,
          phone: String(data.get("phone") ?? ""),
          email: String(data.get("email") ?? ""),
          address: String(data.get("address") ?? ""),
          publicWebsite: String(data.get("publicWebsite") ?? ""),
          description: String(data.get("description") ?? ""),
          submitterName: String(data.get("submitterName") ?? ""),
          submitterEmail: String(data.get("submitterEmail") ?? ""),
          consent: data.get("consent") === "on",
          turnstileToken: token,
          fax: String(data.get("fax") ?? ""),
        },
      });
      form.reset();
      setState("success");
    } catch (submissionError) {
      setError(getErrorMessage(submissionError));
      setState("error");
      setToken("");
      setResetSignal((value) => value + 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogCta
        eyebrow="Submeter Organização"
        text="Representa uma empresa, instituição, associação ou organização relevante para o ecossistema empresarial? Envie os seus dados para análise e possível inclusão no Directório de Contactos da Revista Negócios no Chiveve."
        button="Submeter Organização"
        inverted
      >
        <DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto rounded-none border-0 p-0 shadow-2xl sm:max-w-2xl">
          <DialogHeader className="sticky top-0 z-10 border-b border-border bg-background px-5 py-5 pr-14 shadow-sm sm:px-7">
            <DialogTitle className="font-sans text-2xl font-normal leading-tight tracking-[-0.025em] text-primary sm:text-3xl">
              Submeter Organização
            </DialogTitle>
            <DialogDescription className="leading-6">
              Partilhe os dados da organização. A nossa equipa irá analisá-los
              antes de os publicar no directório.
            </DialogDescription>
          </DialogHeader>
          {state === "success" ? (
            <div className="p-6">
              <SubmissionFeedback state={state} error={error} />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={submissionForm}>
              <Honeypot />
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label htmlFor="contact-name" className={fieldLabel}>
                    Nome da organização *
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    required
                    minLength={2}
                    maxLength={140}
                  />
                </div>
                <div>
                  <label htmlFor="contact-category" className={fieldLabel}>
                    Categoria *
                  </label>
                  <select
                    id="contact-category"
                    name="categoryName"
                    required
                    defaultValue=""
                    className={selectControl}
                  >
                    <option value="" disabled>
                      Seleccione
                    </option>
                    {CONTACT_CATEGORY_NAMES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-phone" className={fieldLabel}>
                    Telefone
                  </label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    maxLength={50}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className={fieldLabel}>
                    Email público
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    maxLength={254}
                  />
                </div>
                <div>
                  <label htmlFor="contact-website" className={fieldLabel}>
                    Website
                  </label>
                  <Input
                    id="contact-website"
                    name="publicWebsite"
                    type="url"
                    placeholder="https://"
                    maxLength={2000}
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="contact-address" className={fieldLabel}>
                    Endereço
                  </label>
                  <Input id="contact-address" name="address" maxLength={300} />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="contact-description" className={fieldLabel}>
                    Descrição breve *
                  </label>
                  <Textarea
                    id="contact-description"
                    name="description"
                    required
                    minLength={10}
                    maxLength={1000}
                    rows={4}
                  />
                </div>
                <ImageField id="contact-image" label="Logótipo da organização" />
                <div>
                  <label htmlFor="contact-submitter" className={fieldLabel}>
                    Seu nome *
                  </label>
                  <Input
                    id="contact-submitter"
                    name="submitterName"
                    required
                    minLength={2}
                    maxLength={100}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-submitter-email"
                    className={fieldLabel}
                  >
                    Seu email *
                  </label>
                  <Input
                    id="contact-submitter-email"
                    name="submitterEmail"
                    type="email"
                    required
                    maxLength={254}
                  />
                </div>
              </div>
              <ConsentField id="contact-consent" />
              <TurnstileWidget
                action="submit_contact"
                resetSignal={resetSignal}
                onToken={setToken}
                onError={() => {
                  if (state === "sending") return;
                  setError(
                    "A verificação anti-spam expirou ou falhou. Tente novamente.",
                  );
                  setState("error");
                }}
              />
              <SubmissionFeedback state={state} error={error} />
              {state === "error" && (
                <VerificationRetry
                  onRetry={() => {
                    setState("idle");
                    setError("");
                    setResetSignal((value) => value + 1);
                  }}
                />
              )}
              <Button
                type="submit"
                size="lg"
                disabled={state === "sending" || !token || !TURNSTILE_SITE_KEY}
                className="w-full sm:w-auto"
              >
                <FaPaperPlane />
                {state === "sending" ? "A enviar..." : "Enviar para aprovação"}
              </Button>
            </form>
          )}
        </DialogContent>
      </DialogCta>
    </Dialog>
  );
}

export function EventSubmissionDialog() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<SubmissionState>("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [resetSignal, setResetSignal] = useState(0);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && state === "sending") return;
    setOpen(nextOpen);
    if (!nextOpen) {
      setState("idle");
      setError("");
      setToken("");
      setResetSignal((value) => value + 1);
    }
  };

  const focusFeedback = () => {
    requestAnimationFrame(() => {
      document.getElementById("event-submission-feedback")?.focus();
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "sending" || !token) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("sending");
    setError("");
    try {
      await submitEvent({
        data: {
          image: await readSubmissionImage(data.get("image")),
          title: String(data.get("title") ?? ""),
          description: String(data.get("description") ?? ""),
          date: String(data.get("date") ?? ""),
          startTime: String(data.get("startTime") ?? ""),
          endTime: String(data.get("endTime") ?? ""),
          location: String(data.get("location") ?? ""),
          city: String(data.get("city") ?? ""),
          price: String(data.get("price") ?? ""),
          organizer: String(data.get("organizer") ?? ""),
          registrationUrl: String(data.get("registrationUrl") ?? ""),
          submitterName: String(data.get("submitterName") ?? ""),
          submitterEmail: String(data.get("submitterEmail") ?? ""),
          consent: data.get("consent") === "on",
          turnstileToken: token,
          fax: String(data.get("fax") ?? ""),
        },
      });
      form.reset();
      setState("success");
      focusFeedback();
    } catch (submissionError) {
      setError(getErrorMessage(submissionError));
      setState("error");
      setToken("");
      setResetSignal((value) => value + 1);
      focusFeedback();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogCta
        eyebrow="Tem um evento para divulgar?"
        text="Envie os dados do evento para análise. A nossa equipa irá verificar a informação antes de a publicar na agenda."
        button="Submeter evento"
        inverted
      >
        <DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto rounded-none border-0 p-0 shadow-2xl sm:max-w-2xl">
          <DialogHeader className="sticky top-0 z-10 border-b border-border bg-background px-5 py-5 pr-14 shadow-sm sm:px-7">
            <DialogTitle className="font-sans text-2xl font-normal leading-tight tracking-[-0.025em] text-primary sm:text-3xl">
              Submeter evento
            </DialogTitle>
            <DialogDescription className="leading-6">
              Partilhe os dados essenciais. A submissão ficará pendente até ser
              revista pela equipa editorial.
            </DialogDescription>
          </DialogHeader>
          {state === "success" ? (
            <div
              id="event-submission-feedback"
              className="p-6 outline-none"
              tabIndex={-1}
            >
              <SubmissionFeedback state={state} error={error} />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={submissionForm}>
              <Honeypot />
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label htmlFor="event-title" className={fieldLabel}>
                    Nome do evento *
                  </label>
                  <Input
                    id="event-title"
                    name="title"
                    required
                    minLength={3}
                    maxLength={180}
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="event-description" className={fieldLabel}>
                    Descrição breve *
                  </label>
                  <Textarea
                    id="event-description"
                    name="description"
                    required
                    minLength={20}
                    maxLength={2000}
                    rows={4}
                  />
                </div>
                <div>
                  <label htmlFor="event-date" className={fieldLabel}>
                    Data do evento *
                  </label>
                  <Input id="event-date" name="date" type="date" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="event-start-time" className={fieldLabel}>
                      Início
                    </label>
                    <Input id="event-start-time" name="startTime" type="time" />
                  </div>
                  <div>
                    <label htmlFor="event-end-time" className={fieldLabel}>
                      Fim
                    </label>
                    <Input id="event-end-time" name="endTime" type="time" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="event-location" className={fieldLabel}>
                    Local *
                  </label>
                  <Input
                    id="event-location"
                    name="location"
                    required
                    minLength={2}
                    maxLength={220}
                    placeholder="Nome do espaço e endereço"
                  />
                </div>
                <div>
                  <label htmlFor="event-city" className={fieldLabel}>
                    Cidade *
                  </label>
                  <Input
                    id="event-city"
                    name="city"
                    required
                    minLength={2}
                    maxLength={120}
                    placeholder="Beira, Moçambique"
                  />
                </div>
                <div>
                  <label htmlFor="event-price" className={fieldLabel}>
                    Acesso ou preço
                  </label>
                  <Input
                    id="event-price"
                    name="price"
                    maxLength={100}
                    placeholder="Entrada livre, convite ou valor"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="event-organizer" className={fieldLabel}>
                    Organização *
                  </label>
                  <Input
                    id="event-organizer"
                    name="organizer"
                    required
                    minLength={2}
                    maxLength={150}
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="event-registration-url" className={fieldLabel}>
                    Link de inscrição ou informação
                  </label>
                  <Input
                    id="event-registration-url"
                    name="registrationUrl"
                    type="url"
                    maxLength={2000}
                    placeholder="https://"
                  />
                </div>
                <ImageField id="event-image" label="Cartaz ou imagem do evento" />
                <div>
                  <label htmlFor="event-submitter" className={fieldLabel}>
                    Seu nome *
                  </label>
                  <Input
                    id="event-submitter"
                    name="submitterName"
                    required
                    minLength={2}
                    maxLength={100}
                  />
                </div>
                <div>
                  <label htmlFor="event-submitter-email" className={fieldLabel}>
                    Seu email *
                  </label>
                  <Input
                    id="event-submitter-email"
                    name="submitterEmail"
                    type="email"
                    required
                    maxLength={254}
                  />
                </div>
              </div>
              <ConsentField id="event-consent" />
              <TurnstileWidget
                action="submit_event"
                resetSignal={resetSignal}
                onToken={setToken}
                onError={() => {
                  if (state === "sending") return;
                  setError(
                    "A verificação anti-spam expirou ou falhou. Tente novamente.",
                  );
                  setState("error");
                  focusFeedback();
                }}
              />
              <div
                id="event-submission-feedback"
                className="outline-none"
                tabIndex={-1}
              >
                <SubmissionFeedback state={state} error={error} />
              </div>
              {state === "error" && (
                <VerificationRetry
                  onRetry={() => {
                    setState("idle");
                    setError("");
                    setResetSignal((value) => value + 1);
                  }}
                />
              )}
              <Button
                type="submit"
                size="lg"
                disabled={state === "sending" || !token}
                className="w-full sm:w-auto"
              >
                <FaPaperPlane />
                {state === "sending" ? "A enviar..." : "Enviar para aprovação"}
              </Button>
            </form>
          )}
        </DialogContent>
      </DialogCta>
    </Dialog>
  );
}

export function TenderSubmissionDialog() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<SubmissionState>("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [resetSignal, setResetSignal] = useState(0);

  if (!TURNSTILE_SITE_KEY) return null;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && state === "sending") return;
    setOpen(nextOpen);
    if (!nextOpen) {
      setState("idle");
      setError("");
      setToken("");
      setResetSignal((value) => value + 1);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "sending" || !token) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("sending");
    setError("");
    try {
      await submitTender({
        data: {
          image: await readSubmissionImage(data.get("image")),
          title: String(data.get("title") ?? ""),
          institution: String(data.get("institution") ?? ""),
          deadline: String(data.get("deadline") ?? ""),
          type: String(data.get("type") ?? ""),
          vacancies: Number(data.get("vacancies")),
          editalUrl: String(data.get("editalUrl") ?? ""),
          submitterName: String(data.get("submitterName") ?? ""),
          submitterEmail: String(data.get("submitterEmail") ?? ""),
          consent: data.get("consent") === "on",
          turnstileToken: token,
          fax: String(data.get("fax") ?? ""),
        },
      });
      form.reset();
      setState("success");
    } catch (submissionError) {
      setError(getErrorMessage(submissionError));
      setState("error");
      setToken("");
      setResetSignal((value) => value + 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogCta
        eyebrow="Tem um concurso para divulgar?"
        text="Instituições públicas, organizações, empresas e parceiros podem enviar editais, anúncios de contratação ou oportunidades institucionais para publicação na revista."
        button="Submeter concurso"
        inverted
      >
        <DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto rounded-none border-0 p-0 shadow-2xl sm:max-w-2xl">
          <DialogHeader className="sticky top-0 z-10 border-b border-border bg-background px-5 py-5 pr-14 shadow-sm sm:px-7">
            <DialogTitle className="font-sans text-2xl font-normal leading-tight tracking-[-0.025em] text-primary sm:text-3xl">
              Submeter concurso
            </DialogTitle>
            <DialogDescription className="leading-6">
              Partilhe os dados essenciais e o link oficial. A nossa equipa irá
              verificar a informação antes da publicação.
            </DialogDescription>
          </DialogHeader>
          {state === "success" ? (
            <div className="p-6">
              <SubmissionFeedback state={state} error={error} />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={submissionForm}>
              <Honeypot />
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label htmlFor="tender-title" className={fieldLabel}>
                    Título do concurso *
                  </label>
                  <Input
                    id="tender-title"
                    name="title"
                    required
                    minLength={3}
                    maxLength={180}
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="tender-institution" className={fieldLabel}>
                    Instituição *
                  </label>
                  <Input
                    id="tender-institution"
                    name="institution"
                    required
                    minLength={2}
                    maxLength={150}
                  />
                </div>
                <div>
                  <label htmlFor="tender-deadline" className={fieldLabel}>
                    Data limite *
                  </label>
                  <Input
                    id="tender-deadline"
                    name="deadline"
                    type="date"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="tender-type" className={fieldLabel}>
                    Tipo *
                  </label>
                  <select
                    id="tender-type"
                    name="type"
                    required
                    defaultValue={TENDER_TYPES[0]}
                    className={selectControl}
                  >
                    {TENDER_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="tender-vacancies" className={fieldLabel}>
                    Número de vagas (quando aplicável)
                  </label>
                  <Input
                    id="tender-vacancies"
                    name="vacancies"
                    type="number"
                    min={0}
                    max={100000}
                  />
                </div>
                <div>
                  <label htmlFor="tender-url" className={fieldLabel}>
                    Link oficial do edital *
                  </label>
                  <Input
                    id="tender-url"
                    name="editalUrl"
                    type="url"
                    required
                    placeholder="https://"
                    maxLength={2000}
                  />
                </div>
                <ImageField id="tender-image" label="Imagem do concurso" />
                <div>
                  <label htmlFor="tender-submitter" className={fieldLabel}>
                    Seu nome *
                  </label>
                  <Input
                    id="tender-submitter"
                    name="submitterName"
                    required
                    minLength={2}
                    maxLength={100}
                  />
                </div>
                <div>
                  <label
                    htmlFor="tender-submitter-email"
                    className={fieldLabel}
                  >
                    Seu email *
                  </label>
                  <Input
                    id="tender-submitter-email"
                    name="submitterEmail"
                    type="email"
                    required
                    maxLength={254}
                  />
                </div>
              </div>
              <ConsentField id="tender-consent" />
              <TurnstileWidget
                action="submit_tender"
                resetSignal={resetSignal}
                onToken={setToken}
                onError={() => {
                  if (state === "sending") return;
                  setError(
                    "A verificação anti-spam expirou ou falhou. Tente novamente.",
                  );
                  setState("error");
                }}
              />
              <SubmissionFeedback state={state} error={error} />
              {state === "error" && (
                <VerificationRetry
                  onRetry={() => {
                    setState("idle");
                    setError("");
                    setResetSignal((value) => value + 1);
                  }}
                />
              )}
              <Button
                type="submit"
                size="lg"
                disabled={state === "sending" || !token || !TURNSTILE_SITE_KEY}
                className="w-full sm:w-auto"
              >
                <FaPaperPlane />
                {state === "sending" ? "A enviar..." : "Enviar para aprovação"}
              </Button>
            </form>
          )}
        </DialogContent>
      </DialogCta>
    </Dialog>
  );
}
