export type Event = {
  slug: string;
  title: string;
  image: string;
  date: string; // ISO date
  displayDate: string;
  day: string;
  month: string;
  location: string;
  city: string;
  description: string[];
  price: string;
  organizer: string;
  registrationUrl: string;
};

export const events: Event[] = [
  {
    slug: "forum-empreendedorismo-maputo-2026",
    title: "Fórum de Empreendedorismo — Maputo 2026",
    image:
      "https://images.unsplash.com/photo-1775163560631-6ff15eb2fa1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2UlMjBldmVudCUyMG5ldHdvcmtpbmd8ZW58MXx8fHwxNzc1NjQxMzQ4fDA&ixlib=rb-4.1.0&q=80&w=1600",
    date: "2026-02-15",
    displayDate: "15 Fev 2026",
    day: "15",
    month: "FEV",
    location: "Centro de Conferências Joaquim Chissano, Maputo",
    city: "Maputo, Moçambique",
    description: [
      "O maior encontro de empreendedores do país regressa à capital com painéis sobre financiamento, internacionalização e construção de marca.",
      "Mais de 40 oradores confirmados e workshops práticos durante dois dias.",
    ],
    price: "Entrada livre, mediante inscrição",
    organizer: "Revista Chiveve",
    registrationUrl: "#",
  },
  {
    slug: "summit-negocios-inovacao-beira",
    title: "Summit de Negócios e Inovação — Beira",
    image:
      "https://images.unsplash.com/photo-1661286178389-e067299f907e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwZW50cmVwcmVuZXVyJTIwb2ZmaWNlJTIwbWVldGluZ3xlbnwxfHx8fDE3NzU2NDQ3NjV8MA&ixlib=rb-4.1.0&q=80&w=1600",
    date: "2026-03-22",
    displayDate: "22 Mar 2026",
    day: "22",
    month: "MAR",
    location: "Hotel Tivoli, Beira",
    city: "Beira, Sofala",
    description: [
      "Encontro focado em inovação aplicada a sectores tradicionais — agricultura, logística portuária e energia.",
      "Inclui pitches de startups da região centro do país.",
    ],
    price: "2.500 MZN",
    organizer: "Câmara de Comércio de Sofala",
    registrationUrl: "#",
  },
  {
    slug: "tech-africa-solucoes-digitais-pme",
    title: "Tech Africa: Soluções Digitais para PME",
    image:
      "https://images.unsplash.com/photo-1689763408012-8aa7d2dcd3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlY2hub2xvZ3klMjBpbm5vdmF0aW9uJTIwYWZyaWNhfGVufDF8fHx8MTc3NTY0NDc2NHww&ixlib=rb-4.1.0&q=80&w=1600",
    date: "2026-04-10",
    displayDate: "10 Abr 2026",
    day: "10",
    month: "ABR",
    location: "Universidade Lúrio, Nampula",
    city: "Nampula, Moçambique",
    description: [
      "Conferência prática para gestores de PME que querem entender o que cabe — e o que não cabe — no orçamento digital deste ano.",
    ],
    price: "1.500 MZN",
    organizer: "Tech Africa Initiative",
    registrationUrl: "#",
  },
  {
    slug: "workshop-lideranca-feminina-negocios",
    title: "Workshop de Liderança Feminina nos Negócios",
    image:
      "https://images.unsplash.com/photo-1759310610552-914069ec2e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJzaGlwJTIwbWFuYWdlbWVudCUyMHRlYW0lMjBjb3Jwb3JhdGV8ZW58MXx8fHwxNzc1NjQ0NzcyfDA&ixlib=rb-4.1.0&q=80&w=1600",
    date: "2026-05-05",
    displayDate: "05 Mai 2026",
    day: "05",
    month: "MAI",
    location: "Polana Serena Hotel, Maputo",
    city: "Maputo, Moçambique",
    description: [
      "Um dia intensivo com mentoras seniores e exercícios práticos sobre negociação, gestão de equipas e construção de presença executiva.",
    ],
    price: "Entrada livre, vagas limitadas",
    organizer: "Revista Chiveve & Rede WiB",
    registrationUrl: "#",
  },
];

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug);
}

export function getUpcomingEvents(n = 4): Event[] {
  return events.slice(0, n);
}

export function searchEvents(query: string): Event[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return events.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      e.city.toLowerCase().includes(q),
  );
}
