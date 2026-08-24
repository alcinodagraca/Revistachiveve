import { FaUsers } from "react-icons/fa6";

export function CommunityCTA() {
  return (
    <section className="bg-secondary py-12">
      <div className="site-shell flex items-center justify-between gap-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary flex items-center justify-center">
            <FaUsers size={28} color="#FFFFFF" />
          </div>
          <div>
            <h3 className="font-serif text-[26px] font-semibold text-foreground leading-[1.3] mb-3">
              Junte-se à próxima geração de empreendedores
            </h3>
            <p className="font-sans text-base font-normal text-muted-foreground leading-[1.65] max-w-[600px]">
              Faça parte de uma comunidade crescente de líderes e profissionais que acompanham as melhores histórias de negócios em Moçambique. Acesso exclusivo a conteúdo premium e eventos.
            </p>
          </div>
        </div>

        <a
          href="#newsletter"
          className="flex-shrink-0 py-4 px-8 bg-primary text-white font-sans text-sm font-semibold tracking-[0.06em] uppercase no-underline whitespace-nowrap transition-opacity duration-200 hover:opacity-90"
        >
          Assine desde 500 MT / mês
        </a>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          section > div {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          section > div > a {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
