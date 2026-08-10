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

const REST_BASE = "concurso";
const TTL_MS = 60_000;

type WPTender = WPPost & {
  meta?: Record<string, unknown>;
  acf?: Record<string, unknown>;
};

function pickMeta(post: WPTender, ...keys: string[]): unknown {
  for (const k of keys) {
    const v = post.meta?.[k] ?? post.acf?.[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
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
    institution: asString(pickMeta(post, "instituicao", "concurso_institution")) ?? "",
    deadline: asString(pickMeta(post, "data_limite_de_submissao", "concurso_deadline")) ?? "",
    type: asString(pickMeta(post, "tipo_de_concurso", "concurso_type")) ?? "Concurso Público",
    vacancies: asNumber(pickMeta(post, "numero_de_vagas", "concurso_vacancies")),
    editalUrl: asString(pickMeta(post, "link_do_concurso", "concurso_edital_url")),
  };
}

export async function listTenders(): Promise<Tender[] | null> {
  if (!(await hasRestBase(REST_BASE))) return null;
  try {
    const res = await wpList<WPTender>(`/${REST_BASE}`, {
      params: { per_page: 50, orderby: "date", order: "desc" },
      ttlMs: TTL_MS,
    });
    return res.items.length > 0 ? res.items.map(normalize) : null;
  } catch {
    return null;
  }
}
