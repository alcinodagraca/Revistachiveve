import assert from "node:assert/strict";
import test from "node:test";
import { normalizeArticle } from "./articles";
import { sanitizeWordPressHtml } from "./content";
import type { WPPost } from "./types";

test("sanitizes executable WordPress markup", () => {
  const result = sanitizeWordPressHtml(`
    <h2 class="wp-block-heading" onclick="alert(1)">Heading</h2>
    <script>alert("xss")</script>
    <a href="javascript:alert(1)" target="_blank">Unsafe link</a>
    <img src="https://example.com/image.jpg" onerror="alert(1)" alt="Example">
  `);

  assert.match(result, /<h2 class="wp-block-heading">Heading<\/h2>/);
  assert.doesNotMatch(result, /script|onclick|onerror|javascript:/);
  assert.match(result, /target="_blank" rel="noopener noreferrer"/);
  assert.match(result, /src="https:\/\/example.com\/image.jpg"/);
});

test("keeps embeds only from approved providers", () => {
  const result = sanitizeWordPressHtml(`
    <iframe src="https://www.youtube-nocookie.com/embed/abc" title="Video"></iframe>
    <iframe src="https://example.com/embed/abc" title="Untrusted"></iframe>
  `);

  assert.match(result, /youtube-nocookie\.com\/embed\/abc/);
  assert.doesNotMatch(result, /example\.com\/embed\/abc/);
});

test("sanitizes WordPress article content during normalization", () => {
  const article = normalizeArticle({
    id: 1,
    slug: "safe-article",
    title: { rendered: "Safe article" },
    excerpt: { rendered: "<p>Summary</p>" },
    content: { rendered: '<p>Body</p><img src="x" onerror="alert(1)">' },
    date: "2026-09-11T00:00:00",
    date_gmt: "2026-09-11T00:00:00",
    modified: "2026-09-11T00:00:00",
    status: "publish",
    link: "https://example.com/safe-article",
    author: 1,
    featured_media: 0,
    categories: [],
    tags: [],
  } satisfies WPPost);

  assert.match(article.bodyHtml, /<p>Body<\/p>/);
  assert.doesNotMatch(article.bodyHtml, /onerror/);
});
