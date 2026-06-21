import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const magazineCovers = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1588463340632-0dec4c6971dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hZ2F6aW5lJTIwY292ZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzU2NTA3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Revista Negócios de Chiveve – Abril 2021",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1610902422826-548d3472fff5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JiZXMlMjBtYWdhemluZSUyMGNvdmVyJTIwY2VvfGVufDF8fHx8MTc3NTY1MDc5OHww&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Revista Negócios de Chiveve – Março 2021",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTYwMjkwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Revista Negócios de Chiveve – Fevereiro 2021",
  },
];

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section
      id="newsletter"
      className="px-4 md:px-8 bg-background py-24 md:py-32"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid gap-12 items-center grid-cols-1 md:grid-cols-[5fr_7fr]">
          {/* Left: Form */}
          <div>
            <h2 className="font-sans font-bold text-xs md:text-sm uppercase tracking-[0.12em] text-primary mb-4">
              Subscreva a nossa newsletter
            </h2>

            <p className="font-sans text-base font-normal text-foreground leading-[1.6] mb-6">
              Receba o melhor da Negócios no Chiveve directamente no seu e-mail,
              com notícias de negócios, insights.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="E-mail*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full font-sans text-base font-normal text-foreground bg-background border-2 border-primary rounded-none py-4 px-5 outline-none mb-3"
              />
              <button
                type="submit"
                className="transition-opacity hover:opacity-90 w-full font-sans text-base font-semibold tracking-[0.02em] bg-primary text-white border-none rounded-none py-4 px-5 cursor-pointer"
              >
                {submitted ? "✓ Inscrito" : "Assinar"}
              </button>
            </form>

            <p className="font-sans text-sm font-normal text-foreground leading-[1.5] mt-4">
              Ao se cadastrar, você concorda com nossa{" "}
              <Link
                to="/privacidade"
                className="text-primary underline"
              >
                Política de Privacidade
              </Link>{" "}
              e com o uso de seus dados para fins de comunicação.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {magazineCovers.map((cover) => (
              <div key={cover.id}>
                <div className="w-full aspect-[3/4] overflow-hidden bg-secondary">
                  <ImageWithFallback
                    src={cover.image}
                    alt={cover.caption}
                    className="w-full h-full object-cover block"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
