import { getWPConfig } from "./env";
import type { WPListResponse } from "./types";

export class WPError extends Error {
  status: number;
  body: string;
  constructor(status: number, body: string, message: string) {
    super(message);
    this.name = "WPError";
    this.status = status;
    this.body = body;
  }
}

type CacheEntry = { value: unknown; expiresAt: number };
const cache = new Map<string, CacheEntry>();

const DEFAULT_TTL_MS = 60_000;
const CACHE_LOG = process.env.WP_CACHE_LOG === "1";

function buildUrl(path: string, params?: Record<string, unknown>): string {
  const { baseUrl } = getWPConfig();
  const url = new URL(baseUrl + (path.startsWith("/") ? path : "/" + path));
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v === undefined || v === null) continue;
      if (Array.isArray(v)) {
        for (const item of v) url.searchParams.append(k, String(item));
      } else {
        url.searchParams.set(k, String(v));
      }
    }
  }
  return url.toString();
}

type FetchOpts = {
  params?: Record<string, unknown>;
  /** TTL in ms. Pass 0 to bypass cache. */
  ttlMs?: number;
  /** Set true for endpoints that need WP auth (drafts, private, write). */
  auth?: boolean;
  signal?: AbortSignal;
};

export async function wpGet<T>(
  path: string,
  opts: FetchOpts = {},
): Promise<T> {
  const { params, ttlMs = DEFAULT_TTL_MS, auth = false, signal } = opts;
  const url = buildUrl(path, params);
  const cacheKey = `GET ${url}${auth ? " (auth)" : ""}`;

  if (ttlMs > 0) {
    const hit = cache.get(cacheKey);
    if (hit && hit.expiresAt > Date.now()) {
      if (CACHE_LOG) console.log(`[wp-cache] HIT ${url}`);
      return hit.value as T;
    }
  }

  const { authHeader } = getWPConfig();
  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (auth && authHeader) headers.Authorization = authHeader;

  const res = await fetch(url, { headers, signal });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new WPError(
      res.status,
      body,
      `WP ${res.status} on ${url}: ${body.slice(0, 200)}`,
    );
  }
  const value = (await res.json()) as T;
  if (ttlMs > 0) {
    cache.set(cacheKey, { value, expiresAt: Date.now() + ttlMs });
    if (CACHE_LOG) console.log(`[wp-cache] MISS ${url} (cached ${ttlMs}ms)`);
  }
  return value;
}

/**
 * GET a paginated list endpoint. Returns items + total + totalPages
 * from X-WP-Total / X-WP-TotalPages response headers.
 */
export async function wpList<T>(
  path: string,
  opts: FetchOpts = {},
): Promise<WPListResponse<T>> {
  const { params, ttlMs = DEFAULT_TTL_MS, auth = false, signal } = opts;
  const url = buildUrl(path, params);
  const cacheKey = `LIST ${url}${auth ? " (auth)" : ""}`;

  if (ttlMs > 0) {
    const hit = cache.get(cacheKey);
    if (hit && hit.expiresAt > Date.now()) {
      if (CACHE_LOG) console.log(`[wp-cache] HIT ${url}`);
      return hit.value as WPListResponse<T>;
    }
  }

  const { authHeader } = getWPConfig();
  const headers: Record<string, string> = { Accept: "application/json" };
  if (auth && authHeader) headers.Authorization = authHeader;

  const res = await fetch(url, { headers, signal });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new WPError(
      res.status,
      body,
      `WP ${res.status} on ${url}: ${body.slice(0, 200)}`,
    );
  }
  const items = (await res.json()) as T[];
  const total = Number(res.headers.get("X-WP-Total") ?? items.length);
  const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? 1);
  const value: WPListResponse<T> = { items, total, totalPages };
  if (ttlMs > 0) {
    cache.set(cacheKey, { value, expiresAt: Date.now() + ttlMs });
    if (CACHE_LOG) console.log(`[wp-cache] MISS ${url} (cached ${ttlMs}ms)`);
  }
  return value;
}

export function clearWPCache(): void {
  cache.clear();
}
