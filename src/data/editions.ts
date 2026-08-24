import cover2026 from "../assets/56c63c2734604de7d7d400cc85c2a9f24c36300f.png";
import cover2025 from "../assets/86b85d6af51a2134281f2359c0c4fa7a70c28c74.png";
import cover2024 from "../assets/e158732155360e3a9ba339cbc9c84493e22b7fd3.png";

export type MockEdition = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  cover: string;
  date: string;
  featured: boolean;
  highlights: string[];
  pdfDownloadUrl?: string;
};

export const editions: MockEdition[] = [
  {
    id: 1,
    slug: "revista-chiveve-agosto-2026",
    title: "Revista Chiveve N.º 12",
    subtitle: "Liderança, negócios e transformação económica",
    cover: cover2026,
    date: "Agosto 2026",
    featured: true,
    highlights: [
      "Especial sobre liderança empresarial em Moçambique",
      "Tendências de investimento e inovação para 2026",
      "Entrevistas exclusivas com líderes do mercado",
    ],
    pdfDownloadUrl: "#",
  },
  {
    id: 2,
    slug: "revista-chiveve-marco-2026",
    title: "Revista Chiveve N.º 11",
    subtitle: "Empreendedorismo, capital e futuro digital",
    cover: cover2025,
    date: "Março 2026",
    featured: false,
    highlights: [
      "Startups e novas oportunidades de financiamento",
      "Como escalar negócios em mercados africanos",
      "O papel da tecnologia na competitividade regional",
    ],
    pdfDownloadUrl: "#",
  },
  {
    id: 3,
    slug: "revista-chiveve-dezembro-2025",
    title: "Revista Chiveve N.º 10",
    subtitle: "Economia, talento e estratégia empresarial",
    cover: cover2024,
    date: "Dezembro 2025",
    featured: false,
    highlights: [
      "Análise macroeconómica do ano",
      "Perfis de executivos e empreendedores em destaque",
      "Boas práticas para equipas de alto desempenho",
    ],
    pdfDownloadUrl: "#",
  },
];
