import { FaWhatsapp } from "react-icons/fa6";

export function WhatsAppFollowCta({ url }: { url: string }) {
  return (
    <aside
      aria-label="Receba notícias da Revista Negócios no Chiveve no WhatsApp"
      className="my-10 border-[3px] border-[#168A45] bg-background p-5 sm:flex sm:items-center sm:gap-6 sm:px-8 sm:py-6"
    >
      <FaWhatsapp aria-hidden size={54} className="mb-4 shrink-0 text-[#168A45] sm:mb-0" />
      <p className="max-w-[610px] font-sans text-xl leading-[1.35] text-foreground sm:text-2xl">
        Receba, <strong className="font-semibold">em primeira mão</strong>, as principais notícias da{" "}
        <strong className="font-semibold">Revista Negócios no Chiveve</strong> no seu{" "}
        <strong className="font-semibold">WhatsApp</strong>.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-11 shrink-0 items-center justify-center border border-primary bg-primary px-5 py-2.5 font-sans text-sm font-semibold uppercase tracking-[0.08em] text-primary-foreground no-underline transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_12px_28px_rgba(36,83,214,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transform-none sm:mt-0"
      >
        Seguir no WhatsApp
      </a>
    </aside>
  );
}
