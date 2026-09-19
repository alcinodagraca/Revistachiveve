import { DomUtils, parseDocument } from "htmlparser2";

export const LONG_ARTICLE_CHARACTERS = 6_000;
export const ARTICLE_PREVIEW_CHARACTERS = 2_000;

function readableLength(text: string): number {
  return text.replace(/\s+/g, " ").trim().length;
}

/**
 * Split already-sanitized WordPress HTML only at a complete, top-level
 * paragraph. Keeping the original slices preserves markup, media and links.
 * If a post has no safe boundary, show it in full instead of breaking HTML.
 */
export function findArticlePreviewEnd(html: string): number | null {
  const document = parseDocument(html, { withEndIndices: true });
  if (readableLength(DomUtils.textContent(document)) < LONG_ARTICLE_CHARACTERS) {
    return null;
  }

  let characters = 0;
  for (const node of document.children) {
    characters += readableLength(DomUtils.textContent(node));
    if (
      node.type !== "tag" ||
      node.name !== "p" ||
      node.endIndex === null ||
      characters < ARTICLE_PREVIEW_CHARACTERS
    ) {
      continue;
    }

    const splitAt = node.endIndex + 1;
    const remainingHtml = html.slice(splitAt);
    if (readableLength(DomUtils.textContent(parseDocument(remainingHtml))) === 0) {
      return null;
    }
    return splitAt;
  }

  return null;
}

/**
 * Finds a safe paragraph boundary close to the article midpoint so an
 * editorial CTA can sit between complete paragraphs rather than inside HTML.
 */
export function findArticleInlineCtaEnd(html: string): number | null {
  const document = parseDocument(html, { withEndIndices: true });
  const totalCharacters = readableLength(DomUtils.textContent(document));
  if (totalCharacters < LONG_ARTICLE_CHARACTERS) return null;

  const target = Math.max(ARTICLE_PREVIEW_CHARACTERS + 800, Math.floor(totalCharacters / 2));
  let characters = 0;
  for (const node of document.children) {
    characters += readableLength(DomUtils.textContent(node));
    if (
      node.type !== "tag" ||
      node.name !== "p" ||
      node.endIndex === null ||
      characters < target
    ) {
      continue;
    }

    const splitAt = node.endIndex + 1;
    const remaining = readableLength(DomUtils.textContent(parseDocument(html.slice(splitAt))));
    return remaining >= 500 ? splitAt : null;
  }

  return null;
}
