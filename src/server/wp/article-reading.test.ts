import assert from "node:assert/strict";
import test from "node:test";
import {
  ARTICLE_PREVIEW_CHARACTERS,
  LONG_ARTICLE_CHARACTERS,
  findArticlePreviewEnd,
} from "./article-reading";

test("short articles remain visible in full", () => {
  assert.equal(findArticlePreviewEnd(`<p>${"a".repeat(LONG_ARTICLE_CHARACTERS - 1)}</p>`), null);
});

test("long articles split after a complete paragraph without changing HTML", () => {
  const first = `<p><strong>${"a".repeat(ARTICLE_PREVIEW_CHARACTERS - 200)}</strong></p>`;
  const second = `<p>${"b".repeat(300)} <a href="https://example.com">Fonte</a></p>`;
  const image = `<figure><img src="https://example.com/image.jpg" alt="Fotografia"></figure>`;
  const last = `<p>${"c".repeat(LONG_ARTICLE_CHARACTERS)}</p>`;
  const html = `${first}\n${second}\n${image}\n${last}`;
  const previewEnd = findArticlePreviewEnd(html);

  assert.ok(previewEnd);
  assert.equal(html.slice(0, previewEnd), `${first}\n${second}`);
  assert.equal(html.slice(0, previewEnd) + html.slice(previewEnd), html);
  assert.match(html.slice(previewEnd), /<figure>/);
  assert.match(html.slice(previewEnd), /<p>c/);
});

test("unsafe split points leave the complete article visible", () => {
  const html = `<div><p>${"a".repeat(LONG_ARTICLE_CHARACTERS)}</p></div>`;
  assert.equal(findArticlePreviewEnd(html), null);
});
