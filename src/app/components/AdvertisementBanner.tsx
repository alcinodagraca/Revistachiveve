import { Link } from "@tanstack/react-router";

export function AdvertisementBanner() {
  return (
    <section className="bg-background py-0">
      <div className="site-shell">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#111] px-10 py-8 md:px-12 md:py-9">
          <div className="max-w-3xl">
            <p className="mb-2 font-sans text-xs font-medium uppercase tracking-[0.12em] text-white/72">
              Espaço publicitário
            </p>
            <h2 className="mb-2 font-sans text-xl font-semibold text-white">
              Dê visibilidade à sua marca
            </h2>
            <p className="font-sans text-sm font-light leading-[1.65] text-white/78">
              Anuncie na Revista Negócios no Chiveve e aproxime a sua empresa de
              leitores interessados em negócios, empreendedorismo, liderança,
              inovação e oportunidades em Moçambique.
            </p>
          </div>

          <Link
            to="/anuncios"
            className="inline-flex min-h-[44px] items-center whitespace-nowrap bg-primary px-6 py-3 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-white no-underline transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Anunciar aqui
          </Link>
        </div>
      </div>
    </section>
  );
}
