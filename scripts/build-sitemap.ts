#!/usr/bin/env tsx
/**
 * Builds public/sitemap.xml at build time. Run before `pnpm build` to ship a
 * fresh sitemap. Wired to package.json as `pnpm sitemap`.
 *
 * Re-run via cron or CI hook for incremental updates without rebuilding.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { config as loadDotenv } from "dotenv";
import { listArticles } from "../src/server/wp/articles";
import { listCategories } from "../src/server/wp/categories";
import { listEvents } from "../src/server/wp/events";

loadDotenv({ path: ".env.local", override: false, quiet: true });
loadDotenv({ path: ".env", override: false, quiet: true });

const SITE_URL = (
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  "https://www.revistachiveve.com"
).replace(/\/+$/, "");

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function normalizeLastmod(value: string): string | undefined {
  const normalized = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(value)
    ? `${value}Z`
    : value;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

const STATIC_PATHS = [
  "/",
  "/artigos",
  "/eventos",
  "/edicao-impressa",
  "/sobre-nos",
  "/contactos",
  "/contactos-uteis",
  "/concursos-publicos",
  "/anuncios",
  "/privacidade",
  "/termos",
];

async function main() {
  const [categories, events] = await Promise.all([listCategories(), listEvents()]);

  // Paginate through articles (WP caps per_page at 100).
  const allArticles: Awaited<ReturnType<typeof listArticles>>["articles"] = [];
  let page = 1;
  for (;;) {
    const chunk = await listArticles({ perPage: 100, page });
    allArticles.push(...chunk.articles);
    if (page >= chunk.totalPages || chunk.articles.length === 0) break;
    page++;
  }
  const list = { articles: allArticles };

  const entries: { loc: string; lastmod?: string }[] = [];
  for (const p of STATIC_PATHS) entries.push({ loc: `${SITE_URL}${p}` });
  for (const c of categories.filter((category) => category.count > 0)) {
    entries.push({ loc: `${SITE_URL}/artigos/${c.slug}` });
  }
  for (const a of list.articles) {
    entries.push({
      loc: `${SITE_URL}/artigos/${a.category}/${a.slug}`,
      lastmod: normalizeLastmod(a.modifiedAt || a.publishedAt),
    });
  }
  for (const event of events) {
    entries.push({
      loc: `${SITE_URL}/eventos/${event.slug}`,
      lastmod: normalizeLastmod(event.modifiedAt),
    });
  }

  const body = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${xmlEscape(e.loc)}</loc>${
          e.lastmod ? `\n    <lastmod>${xmlEscape(e.lastmod)}</lastmod>` : ""
        }\n  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

  const outDir = resolve(process.cwd(), "public");
  mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, "sitemap.xml");
  writeFileSync(outPath, xml, "utf8");
  console.log(`[sitemap] wrote ${entries.length} URLs to ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
