export function AdvertisementBanner() {
  return (
    <section className="px-4 md:px-8 bg-background py-8">
      <div className="max-w-[1280px] mx-auto bg-[#111] p-8 flex flex-wrap items-center justify-between gap-4">
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
          className="transition-opacity hover:opacity-90 inline-block bg-primary text-white py-3 px-6 font-sans text-sm font-semibold tracking-[0.06em] uppercase no-underline rounded-md whitespace-nowrap"
        >
          Anuncie Aqui
        </a>
      </div>
    </section>
  );
}
