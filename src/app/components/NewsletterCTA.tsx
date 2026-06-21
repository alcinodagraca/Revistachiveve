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
      <div className="max-w-[1200px] mx-auto bg-primary p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-[440px]">
          <h3 className="font-sans font-bold text-xs md:text-sm uppercase tracking-[0.12em] text-white mb-2">
            Subscreva a nossa newsletter
          </h3>
          <p className="font-sans text-sm leading-[1.6] text-white">
            Receba o melhor da Negócios no Chiveve directamente no seu e-mail,
            com notícias de negócios, insights e oportunidades.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex w-full md:w-auto min-w-[min(100%,460px)]"
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
            className="px-6 py-3 transition-opacity hover:opacity-90 font-sans text-sm font-semibold bg-white text-primary border-none ml-2 cursor-pointer"
          >
            {sent ? "✓ Enviado" : "Subscrever"}
          </button>
        </form>
      </div>
    </section>
  );
}
