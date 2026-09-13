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

export type TenderList = {
  tenders: Tender[];
  total: number;
  totalPages: number;
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

function formatDeadline(value: string | undefined): string {
  if (!value) return "";
  const compactMatch = value.match(/^(\d{4})(\d{2})(\d{2})$/);
  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const match = compactMatch ?? isoMatch;
  if (!match) return value;

  const [, year, month, day] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  if (
    date.getUTCFullYear() !== Number(year) ||
    date.getUTCMonth() !== Number(month) - 1 ||
    date.getUTCDate() !== Number(day)
  ) {
    return value;
  }

  return new Intl.DateTimeFormat("pt-MZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function normalize(post: WPTender): Tender {
  return {
    id: post.id,
    slug: post.slug,
    title: decodeEntities(post.title.rendered),
    institution:
      asString(pickMeta(post, "instituicao", "concurso_institution")) ?? "",
    deadline: formatDeadline(
      asString(
        pickMeta(post, "data_limite_de_submissao", "concurso_deadline"),
      ),
    ),
    type: asString(pickMeta(post, "tipo_de_concurso", "concurso_type")) ?? "",
    vacancies: asNumber(
      pickMeta(post, "numero_de_vagas", "concurso_vacancies"),
    ),
    editalUrl: asString(
      pickMeta(post, "link_do_concurso", "concurso_edital_url"),
    ),
  };
}

export async function listTenders({
  page = 1,
  perPage = 10,
}: {
  page?: number;
  perPage?: number;
} = {}): Promise<TenderList> {
  if (!(await hasRestBase(REST_BASE))) {
    return { tenders: [], total: 0, totalPages: 0 };
  }
  const res = await wpList<WPTender>(`/${REST_BASE}`, {
    params: { per_page: perPage, page, orderby: "date", order: "desc" },
    ttlMs: TTL_MS,
  });
  return {
    tenders: res.items.map(normalize),
    total: res.total,
    totalPages: res.totalPages,
  };
}
