/**
 * SEO helper — builds meta/OG/Twitter/JSON-LD head fragments consumed by
 * TanStack Start route `head()` functions. Keeps every page consistent
 * without each route having to remember every social/structured-data tag.
 *
 * All inputs are normalised to absolute URLs against SITE_URL so OG/Twitter
 * crawlers (which require absolute paths) work correctly in any environment.
 */

export const SITE_URL = (
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  "https://revistachiveve.co.mz"
).replace(/\/$/, "");

export const SITE_NAME = "Revista Chiveve";
export const SITE_TAGLINE =
  "A sua revista de referência para negócios, empreendedorismo, liderança e inovação em Moçambique e África.";
export const SITE_LOCALE = "pt_MZ";

// Default OG image used when a page has no hero of its own.
// Should be ≥ 1200×630 — host at /public/og-default.png when available.
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

// Local meta-tag shape — kept narrow so TS infers the right literal type for
// `pageSeo()`'s return value, which TanStack Start's strict head() validates.
type HeadMeta =
  | { title: string }
  | { charSet: string }
  | { name: string; content: string }
  | { property: string; content: string };

function absUrl(maybeRelative: string): string {
  if (/^https?:\/\//i.test(maybeRelative)) return maybeRelative;
  return SITE_URL + (maybeRelative.startsWith("/") ? "" : "/") + maybeRelative;
}

function joinTitle(pageTitle: string): string {
  if (pageTitle === SITE_NAME) return pageTitle;
  return `${pageTitle} · ${SITE_NAME}`;
}

export type PageSeoInput = {
  /** Page-specific title — site name is appended automatically. */
  title: string;
  /** Concise description (~140–160 chars). */
  description: string;
  /** Path with leading slash (e.g. `/artigos/economia`). Drives canonical + og:url. */
  path: string;
  /** Hero image URL (absolute or relative). Falls back to DEFAULT_OG_IMAGE. */
  image?: string;
  imageAlt?: string;
  /** OG type. Defaults to "website". Use "article" for posts. */
  type?: "website" | "article" | "profile";
  /** Pages that should NOT be indexed (search, etc.). */
  noindex?: boolean;
  /** Article-specific metadata when type === "article". */
  article?: {
    publishedAt?: string;
    modifiedAt?: string;
    authorName?: string;
    section?: string;
    tags?: string[];
  };
  /** Arbitrary JSON-LD entries to inject as <script type="application/ld+json">. */
  jsonLd?: unknown[];
};

/**
 * Build the SEO head fragment for any page. Returned literal-typed object
 * so it satisfies TanStack Start's strict `head()` shape.
 */
export function pageSeo(input: PageSeoInput) {
  const url = absUrl(input.path);
  const image = absUrl(input.image || DEFAULT_OG_IMAGE);
  const type = input.type ?? "website";

  const meta: HeadMeta[] = [
    { title: joinTitle(input.title) },
    { name: "description", content: input.description },

    // Open Graph
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: SITE_LOCALE },
    { property: "og:type", content: type },
    { property: "og:title", content: input.title },
    { property: "og:description", content: input.description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:alt", content: input.imageAlt ?? input.title },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: input.title },
    { name: "twitter:description", content: input.description },
    { name: "twitter:image", content: image },
  ];

  if (input.noindex) {
    meta.push({ name: "robots", content: "noindex,follow" });
  }

  if (type === "article" && input.article) {
    const a = input.article;
    if (a.publishedAt) {
      meta.push({ property: "article:published_time", content: a.publishedAt });
    }
    if (a.modifiedAt) {
      meta.push({ property: "article:modified_time", content: a.modifiedAt });
    }
    if (a.authorName) {
      meta.push({ property: "article:author", content: a.authorName });
    }
    if (a.section) {
      meta.push({ property: "article:section", content: a.section });
    }
    for (const tag of a.tags ?? []) {
      meta.push({ property: "article:tag", content: tag });
    }
  }

  const links = [{ rel: "canonical", href: url }];

  const scripts = (input.jsonLd ?? []).map((data) => ({
    type: "application/ld+json",
    children: JSON.stringify(data),
  }));

  return { meta, links, scripts };
}

// ---------------------------------------------------------------------------
// JSON-LD builders
// ---------------------------------------------------------------------------

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SITE_TAGLINE,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_TAGLINE,
    inLanguage: "pt-MZ",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/pesquisa?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absUrl(it.path),
    })),
  };
}

export type ArticleJsonLdInput = {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  modifiedAt?: string;
  authorName?: string;
  section?: string;
  tags?: string[];
};

export function articleJsonLd(input: ArticleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: input.title,
    description: input.description,
    image: [absUrl(input.image)],
    datePublished: input.publishedAt,
    dateModified: input.modifiedAt ?? input.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": absUrl(input.url) },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    ...(input.authorName
      ? { author: { "@type": "Person", name: input.authorName } }
      : {}),
    ...(input.section ? { articleSection: input.section } : {}),
    ...(input.tags && input.tags.length > 0 ? { keywords: input.tags.join(", ") } : {}),
  };
}

export type EventJsonLdInput = {
  title: string;
  description: string;
  url: string;
  image: string;
  startDate: string;
  locationName?: string;
  city?: string;
  organizer?: string;
  registrationUrl?: string;
};

export function eventJsonLd(input: EventJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.title,
    description: input.description,
    image: [absUrl(input.image)],
    startDate: input.startDate,
    url: absUrl(input.url),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(input.locationName || input.city
      ? {
          location: {
            "@type": "Place",
            name: input.locationName ?? input.city,
            address: input.city ?? "",
          },
        }
      : {}),
    ...(input.organizer
      ? {
          organizer: {
            "@type": "Organization",
            name: input.organizer,
          },
        }
      : {}),
    ...(input.registrationUrl && input.registrationUrl !== "#"
      ? {
          offers: {
            "@type": "Offer",
            url: input.registrationUrl,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}
