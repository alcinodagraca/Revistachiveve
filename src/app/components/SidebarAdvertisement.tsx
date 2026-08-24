import { Link } from "@tanstack/react-router";
import { FaArrowRight } from "react-icons/fa6";
import advertisementBackground from "../../assets/8d6a7f8aa277ad569b2c13d675b33535796b9eb5.png";

export function SidebarAdvertisement({ tall = false }: { tall?: boolean }) {
  return (
    <Link
      to="/anuncios"
      aria-label="Conheça os formatos de publicidade da Revista Chiveve"
      className={`group relative isolate flex overflow-hidden border-t-4 border-primary bg-[#111] p-6 text-white no-underline ${
        tall ? "min-h-[280px] md:min-h-[300px]" : "min-h-[220px]"
      }`}
    >
      <img
        src={advertisementBackground}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-30 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-20 bg-gradient-to-b from-black/60 via-black/75 to-black/95"
      />
      <span
        aria-hidden
        className="absolute -bottom-16 -right-5 -z-10 font-serif text-[220px] font-black leading-none text-white/[0.04] transition-transform duration-500 group-hover:-translate-y-2"
      >
        C
      </span>

      <span className="flex flex-1 flex-col">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
          Publicidade
        </span>
        <span className="mt-4 max-w-[210px] font-serif text-[22px] font-bold leading-[1.08]">
          A sua marca merece ser vista.
        </span>
        <span className="mt-2 max-w-[220px] font-sans text-[12px] leading-[1.45] text-white/65">
          Fale com líderes, empreendedores e decisores em Moçambique.
        </span>
        <span className="mt-auto inline-flex items-center gap-2 pt-4 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">
          Anuncie na Chiveve
          <FaArrowRight
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </span>
    </Link>
  );
}
