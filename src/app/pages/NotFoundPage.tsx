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
        className="text-center max-w-[560px]"
      >
        <div className="font-serif font-semibold text-7xl md:text-9xl text-primary leading-none tracking-[-0.02em] mb-4">
          404
        </div>

        <div className="h-0.5 w-[60px] bg-primary mx-auto mb-6" />

        <Heading as="h1" variant="article-title" className="text-foreground mb-4">
          Página não encontrada
        </Heading>

        <p className="font-sans text-base text-muted-foreground leading-[1.6] mb-8">
          A página que procura pode ter sido movida, removida ou nunca ter
          existido. Volte ao início e explore os nossos artigos mais recentes.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 transition-opacity hover:opacity-90 py-3 px-5 bg-primary text-white rounded-md font-sans text-sm font-semibold tracking-[0.05em] uppercase no-underline"
        >
          <FaArrowLeft size={16} />
          Voltar à página inicial
        </Link>
      </motion.div>
    </div>
  );
}
