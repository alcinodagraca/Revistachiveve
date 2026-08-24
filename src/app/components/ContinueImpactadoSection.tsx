import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa6";

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@RevistaChiveve";
const FACEBOOK_URL = "https://facebook.com/Revistachiveve/";
const LINKEDIN_URL =
  "https://www.linkedin.com/company/neg%C3%B3cios-no-chiveve/";
const YOUTUBE_EMBED_URL =
  "https://www.youtube.com/embed/videoseries?list=UUWODUyDIiKOTSLJ5DhcYsaw";

export function ContinueImpactadoSection() {
  return (
    <section className="bg-primary py-16 md:py-20">
      <div className="site-shell">
        <div className="mb-9 border-b border-white/30 pb-4">
          <h2 className="font-sans text-[1.25rem] font-semibold uppercase tracking-[-0.02em] text-[#ffd400]">
            Chiveve Em Vídeo
          </h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[1.08fr_0.92fr] md:gap-7">
          <div className="relative h-0 overflow-hidden bg-black pb-[57%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full border-none"
              src={YOUTUBE_EMBED_URL}
              title="Últimos vídeos da Revista Chiveve"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-4 bottom-4 inline-flex items-center gap-2 bg-white/92 px-3 py-2 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.04em] text-primary no-underline transition-opacity hover:opacity-90"
            >
              <FaYoutube size={14} className="text-[#ff2f2f]" />
              Explorar o canal
            </a>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="mb-5 font-sans text-[1.45rem] font-normal leading-[1.15] tracking-[-0.02em] text-[#ffd400] md:text-[1.65rem]">
              A actualidade empresarial em conversa directa
            </h3>

            <p className="mb-4 font-sans text-[1rem] font-light leading-[1.82] tracking-[0.005em] text-white/88 md:text-[1.02rem]">
              Acompanhe entrevistas, análises e histórias de quem está a mover
              os negócios em Moçambique. Cada episódio acrescenta contexto,
              leitura de mercado e vozes que ajudam a perceber o que está a
              mudar agora.
            </p>

            <p className="mb-6 font-sans text-[0.96rem] font-light leading-[1.5] tracking-[0.01em] text-white/92 md:text-[0.98rem]">
              Veja o último episódio e descubra o arquivo completo.
            </p>

            <div className="flex items-center gap-2.5">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#5f78b9] transition-opacity duration-200 hover:opacity-85"
              >
                <FaFacebook size={15} />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1b75bb] transition-opacity duration-200 hover:opacity-85"
              >
                <FaLinkedin size={14} />
              </a>
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-sans text-[0.78rem] font-medium uppercase tracking-[0.06em] text-primary no-underline transition-opacity duration-200 hover:opacity-85"
              >
                <FaYoutube size={15} className="text-[#ff2f2f]" />
                Canal no YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
