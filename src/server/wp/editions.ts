import { wpList } from "./client";
import type { WPPost } from "./types";
import { resolveFeaturedImage } from "./media";
import { decodeEntities } from "./util";
import { hasRestBase } from "./cpt-detect";

export type Edition = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  cover: string;
  date: string;
  featured: boolean;
  highlights: string[];
  pdfDownloadUrl?: string;
};

// Editions are served by the Download Monitor plugin's CPT (`dlm_download`).
// Each DLM upload becomes an edition; DLM's built-in Featured flag drives the
// hero block on /edicao-impressa. Subtitle/date/highlights are read via the
// existing acf/meta fallback chain — if the user later adds an SCF group on
// dlm_download with `edicao_*` field slugs, the normalizer picks them up
// without any code change.
const REST_BASE = "dlm_download";
const TTL_MS = 5 * 60_000;

type WPEdition = WPPost & {
  meta?: Record<string, unknown>;
  acf?: Record<string, unknown>;
  // DLM exposes its Featured toggle as a top-level "yes"/"no" string.
  featured?: string | boolean;
};

function pickMeta(post: WPEdition, key: string): unknown {
  return post.meta?.[key] ?? post.acf?.[key];
}

function pickMetaString(post: WPEdition, key: string): string | undefined {
  const v = pickMeta(post, key);
  return typeof v === "string" || typeof v === "number" ? String(v) : undefined;
}

function pickMetaStringArray(post: WPEdition, key: string): string[] {
  const v = pickMeta(post, key);
  if (Array.isArray(v)) return v.map(String).filter(Boolean);
  if (typeof v === "string" && v.length > 0) {
    // newline-separated fallback (common SCF textarea)
    return v.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

function isDlmFeatured(post: WPEdition): boolean {
  if (post.featured === true) return true;
  if (typeof post.featured === "string") {
    return post.featured.toLowerCase() === "yes";
  }
  // Fallback to an SCF/ACF flag if the user wires one up later.
  return Boolean(pickMeta(post, "edicao_featured"));
}

function formatEditionDate(value: string | undefined): string {
  if (!value) return "";
  const match = value.match(/^(\d{4})-?(\d{2})-?(\d{2})$/);
  if (!match) return value;

  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  const label = new Intl.DateTimeFormat("pt-MZ", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function normalize(post: WPEdition): Edition {
  return {
    id: post.id,
    slug: post.slug,
    title: decodeEntities(post.title.rendered),
    subtitle: pickMetaString(post, "edicao_subtitle") ?? "",
    cover: resolveFeaturedImage(post),
    date: formatEditionDate(pickMetaString(post, "edicao_date")),
    featured: isDlmFeatured(post),
    highlights: pickMetaStringArray(post, "edicao_highlights"),
    // post.link is the DLM download URL (e.g. /download/<slug>/) — using it
    // preserves DLM's download-count tracking.
    pdfDownloadUrl: pickMetaString(post, "edicao_pdf_url") ?? post.link,
  };
}

export async function listEditions(): Promise<Edition[] | null> {
  if (!(await hasRestBase(REST_BASE))) return null;
  try {
    const res = await wpList<WPEdition>(`/${REST_BASE}`, {
      params: { _embed: 1, per_page: 30, orderby: "date", order: "desc" },
      ttlMs: TTL_MS,
    });
    return res.items.map(normalize);
  } catch {
    return null;
  }
}
