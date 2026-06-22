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

const REST_BASE = "edicoes";
const TTL_MS = 5 * 60_000;

type WPEdition = WPPost & {
  meta?: Record<string, unknown>;
  acf?: Record<string, unknown>;
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

function normalize(post: WPEdition): Edition {
  return {
    id: post.id,
    slug: post.slug,
    title: decodeEntities(post.title.rendered),
    subtitle: pickMetaString(post, "edicao_subtitle") ?? "",
    cover: resolveFeaturedImage(post),
    date: pickMetaString(post, "edicao_date") ?? post.date_gmt,
    featured: Boolean(pickMeta(post, "edicao_featured")),
    highlights: pickMetaStringArray(post, "edicao_highlights"),
    pdfDownloadUrl: pickMetaString(post, "edicao_pdf_url"),
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
