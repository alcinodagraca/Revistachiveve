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

export type ContactCategory = {
  id: number;
  name: string;
  slug: string;
};

const REST_BASE = "contacto-util";
const TTL_MS = 5 * 60_000;
const MAX_PAGES = 10;

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
      stripTags(post.excerpt?.rendered ?? ""),
  };
}

export async function listContacts(): Promise<UsefulContact[] | null> {
  if (!(await hasRestBase(REST_BASE))) return null;
  const first = await wpList<WPContact>(`/${REST_BASE}`, {
    params: {
      _embed: 1,
      per_page: 100,
      page: 1,
      orderby: "title",
      order: "asc",
    },
    ttlMs: TTL_MS,
  });
  const pageCount = Math.min(first.totalPages, MAX_PAGES);
  const remaining = await Promise.all(
    Array.from(
      { length: Math.max(0, pageCount - 1) },
      (_, index) => index + 2,
    ).map((page) =>
      wpList<WPContact>(`/${REST_BASE}`, {
        params: {
          _embed: 1,
          per_page: 100,
          page,
          orderby: "title",
          order: "asc",
        },
        ttlMs: TTL_MS,
      }),
    ),
  );
  const contacts = [first, ...remaining].flatMap((response) => response.items);

  return contacts.length > 0 ? contacts.map(normalize) : null;
}

export async function listContactCategories(): Promise<ContactCategory[]> {
  const params = {
    per_page: 100,
    hide_empty: false,
    orderby: "name",
    order: "asc",
  };
  const first = await wpList<WPTerm>("/contacto-categorias", {
    params: { ...params, page: 1 },
    ttlMs: TTL_MS,
  });
  const pageCount = Math.min(first.totalPages, MAX_PAGES);
  const remaining = await Promise.all(
    Array.from(
      { length: Math.max(0, pageCount - 1) },
      (_, index) => index + 2,
    ).map((page) =>
      wpList<WPTerm>("/contacto-categorias", {
        params: { ...params, page },
        ttlMs: TTL_MS,
      }),
    ),
  );
  const terms = [first, ...remaining].flatMap((response) => response.items);

  return terms.map(({ id, name, slug }) => ({
    id,
    name: decodeEntities(name),
    slug,
  }));
}
