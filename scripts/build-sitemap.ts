#!/usr/bin/env tsx
/**
 * Builds public/sitemap.xml at build time. Run before `pnpm build` to ship a
 * fresh sitemap. Wired to package.json as `pnpm sitemap`.
 *
 * Re-run via cron or CI hook for incremental updates without rebuilding.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { listArticles, listCategories } from "../src/server/wp";

const SITE_URL =
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  "https://revistachiveve.co.mz";

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
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
  const categories = await listCategories().catch((e) => {
    console.error("[sitemap] listCategories failed:", e);
    return [];
  });

  // Paginate through articles (WP caps per_page at 100).
  const allArticles: Awaited<ReturnType<typeof listArticles>>["articles"] = [];
  let page = 1;
  for (;;) {
    let chunk;
    try {
      chunk = await listArticles({ perPage: 100, page });
    } catch (e) {
      console.error(`[sitemap] listArticles page ${page} failed:`, e);
      break;
    }
    allArticles.push(...chunk.articles);
    if (page >= chunk.totalPages || chunk.articles.length === 0) break;
    page++;
  }
  const list = { articles: allArticles };

  const entries: { loc: string; lastmod?: string }[] = [];
  for (const p of STATIC_PATHS) entries.push({ loc: `${SITE_URL}${p}` });
  for (const c of categories) {
    entries.push({ loc: `${SITE_URL}/artigos/${c.slug}` });
  }
  for (const a of list.articles) {
    entries.push({
      loc: `${SITE_URL}/artigos/${a.category}/${a.slug}`,
      lastmod: a.modifiedAt || a.publishedAt,
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
