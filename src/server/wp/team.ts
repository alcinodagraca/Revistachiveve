import { wpList } from "./client";
import type { WPPost } from "./types";
import { resolveFeaturedImage } from "./media";
import { decodeEntities, stripTags } from "./util";
import { hasRestBase } from "./cpt-detect";

export type TeamMember = {
  id: number;
  slug: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
};

const REST_BASE = "team";
const TTL_MS = 60 * 60_000;

type WPTeamMember = WPPost & {
  meta?: Record<string, unknown>;
  acf?: Record<string, unknown>;
};

function pickMeta(post: WPTeamMember, key: string): string | undefined {
  const v = post.meta?.[key] ?? post.acf?.[key];
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return undefined;
}

function normalize(post: WPTeamMember): TeamMember {
  return {
    id: post.id,
    slug: post.slug,
    name: decodeEntities(post.title.rendered),
    role: pickMeta(post, "team_role") ?? "",
    image: resolveFeaturedImage(post),
    bio: pickMeta(post, "team_bio") || stripTags(post.content.rendered) || undefined,
  };
}

export async function listTeam(): Promise<TeamMember[] | null> {
  if (!(await hasRestBase(REST_BASE))) return null;
  try {
    const res = await wpList<WPTeamMember>(`/${REST_BASE}`, {
      params: { _embed: 1, per_page: 50, orderby: "menu_order", order: "asc" },
      ttlMs: TTL_MS,
    });
    return res.items.length > 0 ? res.items.map(normalize) : null;
  } catch {
    return null;
  }
}
