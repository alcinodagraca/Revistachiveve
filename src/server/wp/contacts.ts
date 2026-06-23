import { wpList } from "./client";
import type { WPPost, WPTerm } from "./types";
import { resolveFeaturedImage } from "./media";
import { decodeEntities, stripTags } from "./util";
import { hasRestBase } from "./cpt-detect";

export type UsefulContact = {
  id: number;
  slug: string;
  category: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  logo: string;
  description: string;
};

const REST_BASE = "contacto-util";
const TTL_MS = 5 * 60_000;

type WPContact = WPPost & {
  meta?: Record<string, unknown>;
  acf?: Record<string, unknown>;
};

function pickMeta(post: WPContact, ...keys: string[]): string {
  for (const k of keys) {
    const v = post.meta?.[k] ?? post.acf?.[k];
    if (typeof v === "string" && v) return v;
    if (typeof v === "number") return String(v);
  }
  return "";
}

function pickContactCategory(post: WPContact): string {
  const groups = post._embedded?.["wp:term"];
  if (!groups) return "Outros";
  for (const group of groups) {
    const term: WPTerm | undefined = group.find(
      (t) => t.taxonomy === "contacto-categoria",
    );
    if (term) return decodeEntities(term.name);
  }
  return "Outros";
}

function normalize(post: WPContact): UsefulContact {
  return {
    id: post.id,
    slug: post.slug,
    category: pickContactCategory(post),
    name: decodeEntities(post.title.rendered),
    phone: pickMeta(post, "telefone", "contacto_phone"),
    email: pickMeta(post, "email", "contacto_email"),
    address: pickMeta(post, "morada", "contacto_address"),
    website: pickMeta(post, "website", "contacto_website"),
    logo: resolveFeaturedImage(post),
    description:
      pickMeta(post, "descricao", "contacto_description") ||
      stripTags(post.excerpt.rendered),
  };
}

export async function listContacts(): Promise<UsefulContact[] | null> {
  if (!(await hasRestBase(REST_BASE))) return null;
  try {
    const res = await wpList<WPContact>(`/${REST_BASE}`, {
      params: { _embed: 1, per_page: 100, orderby: "title", order: "asc" },
      ttlMs: TTL_MS,
    });
    return res.items.map(normalize);
  } catch {
    return null;
  }
}
