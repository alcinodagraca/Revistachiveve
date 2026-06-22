import { wpList } from "./client";
import type { WPPost } from "./types";
import { decodeEntities } from "./util";
import { hasRestBase } from "./cpt-detect";

export type Tender = {
  id: number;
  slug: string;
  title: string;
  institution: string;
  deadline: string;
  type: string;
  vacancies: number;
  editalUrl?: string;
};

const REST_BASE = "concursos";
const TTL_MS = 60_000;

type WPTender = WPPost & {
  meta?: Record<string, unknown>;
  acf?: Record<string, unknown>;
};

function pickMeta(post: WPTender, key: string): unknown {
  return post.meta?.[key] ?? post.acf?.[key];
}

function asString(v: unknown): string | undefined {
  return typeof v === "string" || typeof v === "number" ? String(v) : undefined;
}

function asNumber(v: unknown, fallback = 0): number {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}

function normalize(post: WPTender): Tender {
  return {
    id: post.id,
    slug: post.slug,
    title: decodeEntities(post.title.rendered),
    institution: asString(pickMeta(post, "concurso_institution")) ?? "",
    deadline: asString(pickMeta(post, "concurso_deadline")) ?? "",
    type: asString(pickMeta(post, "concurso_type")) ?? "Concurso Público",
    vacancies: asNumber(pickMeta(post, "concurso_vacancies")),
    editalUrl: asString(pickMeta(post, "concurso_edital_url")),
  };
}

export async function listTenders(): Promise<Tender[] | null> {
  if (!(await hasRestBase(REST_BASE))) return null;
  try {
    const res = await wpList<WPTender>(`/${REST_BASE}`, {
      params: { per_page: 50, orderby: "date", order: "desc" },
      ttlMs: TTL_MS,
    });
    return res.items.map(normalize);
  } catch {
    return null;
  }
}
