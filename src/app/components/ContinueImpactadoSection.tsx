import { Facebook, Twitter, Youtube, Linkedin } from "lucide-react";

export function ContinueImpactadoSection() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-2 gap-12 items-center">
          <div className="relative pb-[56.25%] h-0">
            <iframe
              className="absolute top-0 left-0 w-full h-full border-none"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Conheça a Revista Negócios no Chiveve"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="font-sans text-sm font-semibold text-white uppercase tracking-[0.1em] mb-4 opacity-90">
              Vídeo Canal
            </p>

            <h3 className="font-serif text-3xl font-semibold text-white mb-6 leading-[1.2] tracking-[-0.01em]">
              A Revolução Empreendedora Começa Aqui
            </h3>

            <p className="font-sans text-base font-normal text-white/95 leading-[1.65] mb-6">
              Descubra histórias inspiradoras de empreendedores moçambicanos que estão a transformar os seus sonhos em realidade. O nosso canal traz entrevistas exclusivas, análises de mercado e insights valiosos para o seu negócio crescer.
            </p>

            <p className="font-sans text-base font-semibold text-white mb-6">
              Assista agora e inspire-se!
            </p>

            <div className="flex gap-3 items-center">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center transition-all duration-200 border border-white/30 hover:bg-white/25 hover:-translate-y-0.5"
              >
                <Facebook size={18} color="#FFFFFF" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center transition-all duration-200 border border-white/30 hover:bg-white/25 hover:-translate-y-0.5"
              >
                <Twitter size={18} color="#FFFFFF" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center transition-all duration-200 border border-white/30 hover:bg-white/25 hover:-translate-y-0.5"
              >
                <Youtube size={18} color="#FFFFFF" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center transition-all duration-200 border border-white/30 hover:bg-white/25 hover:-translate-y-0.5"
              >
                <Linkedin size={18} color="#FFFFFF" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          section > div > div {
            grid-template-columns: 1fr !important;
            gap: var(--spacing-32) !important;
          }
        }
      `}</style>
    </section>
  );
}