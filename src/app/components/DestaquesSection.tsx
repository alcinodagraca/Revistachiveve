import { Link } from "@tanstack/react-router";
import { motion, type Variants } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heading, SectionHeader } from "./typography";

const destaques = [
  {
    id: 1,
    category: "empreendedorismo",
    slug: "dario-camal-bairro-central-mundo",
    image: "https://images.unsplash.com/photo-1642257834579-eee89ff3e9fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3NtYW4lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzU2NDQ3NTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: '"Dário Camal" – Do Bairro Central para o mundo',
    date: "05/01/2026",
    description:
      "Dário Camal fala do seu percurso associativo e influência para mudanças a nível internacional, mostrando que os sonhos não têm fronteiras.",
  },
  {
    id: 2,
    category: "lideranca",
    slug: "marlene-sousa-recursos-humanos",
    image: "https://images.unsplash.com/photo-1739300293504-234817eead52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3N3b21hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTY0NDYyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Marlene de Sousa – Uma mulher com a vida resumida em Recursos Humanos",
    date: "05/01/2026",
    description:
      "Natural de Quelimane e com 31 anos de idade, Marlene de Sousa conta como construiu uma carreira sólida no sector de RH em Moçambique.",
  },
  {
    id: 3,
    category: "empreendedorismo",
    slug: "ser-empresario-em-mocambique",
    image: "https://images.unsplash.com/photo-1709912760136-3da61d6f1361?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3phbWJpcXVlJTIwZW50cmVwcmVuZXVyJTIwbGVhZGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc1NjQ0NzU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Ser empresário em Moçambique",
    date: "04/01/2026",
    description:
      '"Procurem não correr atrás de muitos sonhos. Procure definir seu grande sonho e corra atrás para não perder-se pelo caminho." Uma conversa franca sobre empreendedorismo.',
  },
];

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function DestaquesSection() {
  return (
    <section className="px-4 md:px-8 bg-background py-16">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeader>Destaques</SectionHeader>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {destaques.map((item) => (
            <motion.article key={item.id} variants={itemVariants}>
              <Link
                to="/artigos/$category/$slug"
                params={{ category: item.category, slug: item.slug }}
                className="group block overflow-hidden mb-4 no-underline aspect-[4/3] bg-secondary"
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <Link
                to="/artigos/$category/$slug"
                params={{ category: item.category, slug: item.slug }}
                className="block transition-opacity hover:opacity-80 no-underline mb-2"
              >
                <Heading as="h3" variant="card-title" className="text-foreground">
                  {item.title}
                </Heading>
              </Link>

              <p className="font-sans text-sm font-normal text-muted-foreground mb-3">
                {item.date}
              </p>

              <p className="font-sans text-sm font-normal text-foreground leading-[1.5]">
                {item.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
