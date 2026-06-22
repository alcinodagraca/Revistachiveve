import type { WPMedia, WPPost } from "./types";

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200";

/** Pick the URL of a particular size if WP exposed it, else the original. */
export function pickMediaSize(
  media: WPMedia | undefined,
  preferred: ("large" | "medium_large" | "full" | "medium")[] = [
    "large",
    "full",
  ],
): string | null {
  if (!media) return null;
  const sizes = media.media_details?.sizes;
  if (sizes) {
    for (const key of preferred) {
      const s = sizes[key];
      if (s?.source_url) return s.source_url;
    }
  }
  return media.source_url ?? null;
}

export function resolveFeaturedImage(
  post: WPPost,
  preferred?: Parameters<typeof pickMediaSize>[1],
): string {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  return pickMediaSize(media, preferred) ?? PLACEHOLDER;
}

export function resolveFeaturedAlt(post: WPPost): string {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  return media?.alt_text || "";
}
