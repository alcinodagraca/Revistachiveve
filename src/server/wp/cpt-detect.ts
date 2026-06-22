import { wpGet } from "./client";

/**
 * Probe WP REST to see whether a CPT's rest_base is registered.
 * Cached aggressively (10 min) — if you register a CPT in WP it'll pick
 * up after the TTL, or restart the server.
 */
type TypesResponse = Record<string, { rest_base?: string; slug: string }>;

let typesCache: { fetchedAt: number; rest_bases: Set<string> } | null = null;
const TYPES_TTL_MS = 10 * 60_000;

export async function getRegisteredRestBases(): Promise<Set<string>> {
  if (typesCache && Date.now() - typesCache.fetchedAt < TYPES_TTL_MS) {
    return typesCache.rest_bases;
  }
  try {
    const data = await wpGet<TypesResponse>("/types", { ttlMs: 0 });
    const rest_bases = new Set<string>();
    for (const value of Object.values(data)) {
      if (value?.rest_base) rest_bases.add(value.rest_base);
    }
    typesCache = { fetchedAt: Date.now(), rest_bases };
    return rest_bases;
  } catch {
    // If /types is unreachable, return empty so callers fall back gracefully.
    return new Set();
  }
}

export async function hasRestBase(restBase: string): Promise<boolean> {
  const bases = await getRegisteredRestBases();
  return bases.has(restBase);
}
