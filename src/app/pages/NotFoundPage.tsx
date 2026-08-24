import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { FaArrowLeft } from "react-icons/fa6";
import { Heading } from "../components/typography";

export default function NotFoundPage() {
  return (
    <div className="bg-background min-h-[70vh] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-[560px] text-center"
      >
        <div className="mb-4 font-sans text-[4.5rem] font-light leading-none tracking-[-0.04em] text-primary md:text-[6.5rem]">
          404
        </div>

        <div className="h-0.5 w-[60px] bg-primary mx-auto mb-6" />

        <Heading as="h1" variant="article-title" className="text-foreground mb-4">
          Página não encontrada
        </Heading>

        <p className="mb-8 font-sans text-[0.98rem] font-light text-muted-foreground leading-[1.72]">
          A página que procura pode ter sido movida, removida ou nunca ter
          existido. Volte ao início e explore os nossos artigos mais recentes.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary px-5 py-3 font-sans text-[0.88rem] font-medium uppercase tracking-[0.05em] text-white no-underline transition-opacity hover:opacity-90"
        >
          <FaArrowLeft size={16} />
          Voltar à página inicial
        </Link>
      </motion.div>
    </div>
  );
}
