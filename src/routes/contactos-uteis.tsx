import { createFileRoute } from "@tanstack/react-router";
import ContactosUteisPage from "../app/pages/ContactosUteisPage";
import {
  fnListContactCategories,
  fnListContacts,
} from "../server/wp/server-fns";
import { pageSeo } from "../server/seo";

export const Route = createFileRoute("/contactos-uteis")({
  component: ContactosUteisPage,
  loader: async () => {
    const [contacts, contactCategories] = await Promise.all([
      fnListContacts().catch(() => null),
      fnListContactCategories().catch(() => []),
    ]);
    return {
      contacts: contacts ?? [],
      contactCategories,
    };
  },
  head: () =>
    pageSeo({
      title: "Directório empresarial e institucional",
      description:
        "Instituições, associações, empresas, serviços e organizações que apoiam oportunidades de negócio em Moçambique.",
      path: "/contactos-uteis",
    }),
});
