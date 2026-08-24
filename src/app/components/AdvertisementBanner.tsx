export function AdvertisementBanner() {
  return (
    <section className="bg-background py-0">
      <div className="site-shell">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#111] px-10 py-8 md:px-12 md:py-9">
          <div>
          <p className="font-sans text-xl font-semibold text-white mb-1">
            Espaço Publicitário
          </p>
          <p className="font-sans text-xs font-normal text-white/60">
            Tamanho do anúncio: 1400 × 120 px
          </p>
          </div>

          <a
            href="#"
            className="inline-block whitespace-nowrap bg-primary px-6 py-3 font-sans text-sm font-semibold uppercase tracking-[0.06em] text-white no-underline transition-opacity hover:opacity-90"
          >
            Anuncie Aqui
          </a>
        </div>
      </div>
    </section>
  );
}
