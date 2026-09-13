#!/usr/bin/env tsx
/**
 * Builds public/sitemap.xml at build time. Run before `pnpm build` to ship a
 * fresh sitemap. Wired to package.json as `pnpm sitemap`.
 *
 * Re-run via cron or CI hook for incremental updates without rebuilding.
 */
import { existsSync, writeFileSync, mkdirSync } from "node:fs";
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

type SitemapEntry = { loc: string; lastmod?: string };

function buildXml(entries: SitemapEntry[]): string {
  const body = entries
    .map(
      (entry) =>
        `  <url>\n    <loc>${xmlEscape(entry.loc)}</loc>${
          entry.lastmod
            ? `\n    <lastmod>${xmlEscape(entry.lastmod)}</lastmod>`
            : ""
        }\n  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

function writeSitemap(entries: SitemapEntry[], outPath: string): void {
  writeFileSync(outPath, buildXml(entries), "utf8");
  console.log(`[sitemap] wrote ${entries.length} URLs to ${outPath}`);
}

async function getDynamicEntries(): Promise<SitemapEntry[]> {
  const [categories, events] = await Promise.all([
    listCategories(),
    listEvents(),
  ]);

  // Paginate through articles (WP caps per_page at 100).
  const allArticles: Awaited<ReturnType<typeof listArticles>>["articles"] = [];
  let page = 1;
  for (;;) {
    const chunk = await listArticles({ perPage: 100, page });
    allArticles.push(...chunk.articles);
    if (page >= chunk.totalPages || chunk.articles.length === 0) break;
    page++;
  }
  const entries: SitemapEntry[] = [];
  for (const c of categories.filter((category) => category.count > 0)) {
    entries.push({ loc: `${SITE_URL}/artigos/${c.slug}` });
  }
  for (const a of allArticles) {
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
  return entries;
}

async function main() {
  const outDir = resolve(process.cwd(), "public");
  mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, "sitemap.xml");

  const staticEntries = STATIC_PATHS.map((path) => ({
    loc: `${SITE_URL}${path}`,
  }));

  try {
    const dynamicEntries = await getDynamicEntries();
    writeSitemap([...staticEntries, ...dynamicEntries], outPath);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    if (existsSync(outPath)) {
      console.warn(
        `[sitemap] WordPress unavailable; keeping the existing sitemap. ${reason}`,
      );
      return;
    }

    console.warn(
      `[sitemap] WordPress unavailable and no previous sitemap exists; writing static routes only. ${reason}`,
    );
    writeSitemap(staticEntries, outPath);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
