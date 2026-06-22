/**
 * Decode the HTML entities WP loves to inject into title.rendered:
 * &#8211; (en-dash), &#8217; (curly apostrophe), &amp;, &quot;, etc.
 *
 * Pure server-safe — does NOT use DOMParser. Only covers what we'll see
 * in title/excerpt: named entities + numeric entities.
 */

const NAMED: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  laquo: "«",
  raquo: "»",
  mdash: "—",
  ndash: "–",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
};

export function decodeEntities(input: string): string {
  if (!input) return input;
  return input.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (_, ent: string) => {
    if (ent[0] === "#") {
      const isHex = ent[1] === "x" || ent[1] === "X";
      const codePoint = parseInt(ent.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      if (Number.isFinite(codePoint)) {
        try {
          return String.fromCodePoint(codePoint);
        } catch {
          return "";
        }
      }
      return "";
    }
    return NAMED[ent.toLowerCase()] ?? `&${ent};`;
  });
}

/** Strip HTML tags. Use for excerpts. Cheap, not security-grade. */
export function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, "")).trim();
}

/** Words ÷ 230 wpm, rounded up to at least 1 minute. */
export function readTimeFromHtml(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 230));
}
