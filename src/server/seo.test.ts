import assert from "node:assert/strict";
import test from "node:test";
import {
  articleJsonLd,
  DEFAULT_OG_IMAGE,
  eventJsonLd,
  pageSeo,
  SITE_URL,
} from "./seo";

test("pageSeo preserves pagination in the canonical URL", () => {
  const seo = pageSeo({
    title: "Artigos - Página 2",
    description: "Segunda página de artigos.",
    path: "/artigos?page=2",
    imageAlt: "Artigos",
  });

  assert.deepEqual(seo.links, [
    { rel: "canonical", href: `${SITE_URL}/artigos?page=2` },
  ]);
  assert.ok(
    seo.meta.some(
      (entry) =>
        "name" in entry &&
        entry.name === "twitter:image:alt" &&
        entry.content === "Artigos",
    ),
  );
});

test("pageSeo caps and normalizes metadata descriptions", () => {
  const seo = pageSeo({
    title: "Artigo",
    description: `Uma descrição   com espaços ${"e conteúdo ".repeat(30)}`,
    path: "/artigo",
  });
  const description = seo.meta.find(
    (entry) => "name" in entry && entry.name === "description",
  );

  assert.ok(description && "content" in description);
  assert.ok(description.content.length <= 160);
  assert.equal(description.content.includes("  "), false);
  assert.equal(description.content.endsWith("..."), true);
});

test("articleJsonLd normalizes WordPress GMT dates and empty images", () => {
  const schema = articleJsonLd({
    title: "Artigo",
    description: "Descrição",
    url: "/artigos/opiniao/artigo",
    image: "",
    publishedAt: "2026-08-10T14:07:20",
  });

  assert.deepEqual(schema.image, [DEFAULT_OG_IMAGE]);
  assert.equal(schema.datePublished, "2026-08-10T14:07:20.000Z");
  assert.equal(schema.dateModified, "2026-08-10T14:07:20.000Z");
});

test("eventJsonLd uses a valid fallback image", () => {
  const schema = eventJsonLd({
    title: "Evento",
    description: "Descrição",
    url: "/eventos/evento",
    image: "",
    startDate: "2026-10-01",
  });

  assert.deepEqual(schema.image, [DEFAULT_OG_IMAGE]);
  assert.equal(schema.startDate, "2026-10-01");
  assert.equal("offers" in schema, false);
});
