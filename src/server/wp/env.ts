/**
 * WordPress REST env contract. Server-only.
 *
 * VITE_WP_REST_BASE_URL exists in .env but is intentionally NOT read here —
 * per the SSR-only decision, WP fetches never leave the server. Reading the
 * server-prefixed vars keeps creds and the base URL out of the client bundle.
 */
import { config as loadDotenv } from "dotenv";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

// Vite's loadEnv only populates process.env in the build process — Nitro's
// server runtime is a separate context. Load .env explicitly here.
// Walk up from cwd looking for a .env so we work regardless of where
// the Nitro process resolved its cwd.
let envLoaded = false;
function ensureEnvLoaded() {
  if (envLoaded) return;
  envLoaded = true;

  // First try standard dotenv (cwd-based)
  try {
    loadDotenv();
  } catch {
    // ignore
  }
  if (process.env.WP_REST_BASE_URL) return;

  // Fall back: walk up the directory tree looking for .env
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    const candidate = resolve(dir, ".env");
    if (existsSync(candidate)) {
      try {
        const raw = readFileSync(candidate, "utf8");
        for (const line of raw.split(/\r?\n/)) {
          const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/i);
          if (!m) continue;
          const k = m[1];
          if (process.env[k] !== undefined) continue;
          let v = m[2];
          if (
            (v.startsWith('"') && v.endsWith('"')) ||
            (v.startsWith("'") && v.endsWith("'"))
          ) {
            v = v.slice(1, -1);
          }
          process.env[k] = v;
        }
        return;
      } catch {
        // ignore
      }
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
}

export class WPNotConfiguredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WPNotConfiguredError";
  }
}

export type WPConfig = {
  baseUrl: string;
  authHeader: string | null;
};

let cached: WPConfig | null = null;

export function getWPConfig(): WPConfig {
  if (cached) return cached;
  ensureEnvLoaded();

  const baseUrl = process.env.WP_REST_BASE_URL?.replace(/\/$/, "");
  if (!baseUrl) {
    throw new WPNotConfiguredError(
      "WP_REST_BASE_URL is not set. Add it to .env (see .env.example).",
    );
  }

  const user = process.env.WP_APP_USERNAME;
  const pass = process.env.WP_APP_PASSWORD;
  const authHeader =
    user && pass
      ? "Basic " + Buffer.from(`${user}:${pass}`).toString("base64")
      : null;

  cached = { baseUrl, authHeader };
  return cached;
}

export function isWPConfigured(): boolean {
  try {
    getWPConfig();
    return true;
  } catch {
    return false;
  }
}
