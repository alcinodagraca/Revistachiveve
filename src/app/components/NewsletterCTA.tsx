import { useState } from "react";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setEmail("");
  }

  return (
    <section className="py-8 px-4">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 bg-primary p-8 md:flex-row md:items-center">
        <div className="max-w-[440px]">
          <h3 className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-white md:text-sm">
            Receba a selecção editorial
          </h3>
          <p className="font-sans text-sm font-light leading-[1.6] text-white/88">
            Uma leitura essencial, enviada para o seu e-mail, com negócios,
            liderança e inovação em perspectiva.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex min-w-[min(100%,460px)] w-full md:w-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite o seu e-mail"
            className="flex-1 px-4 py-3 outline-none font-sans text-sm bg-white text-foreground border-none"
          />
          <button
            type="submit"
            className="ml-2 bg-white px-6 py-3 font-sans text-sm font-medium text-primary transition-opacity hover:opacity-90"
          >
            {sent ? "✓ Enviado" : "Subscrever"}
          </button>
        </form>
      </div>
    </section>
  );
}
