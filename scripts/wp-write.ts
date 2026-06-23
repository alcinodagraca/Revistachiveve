#!/usr/bin/env tsx
/**
 * Operator tool — create/update/delete WordPress CPT entries from the CLI.
 *
 * Auth uses the same WP_APP_USERNAME / WP_APP_PASSWORD env vars as the
 * runtime read client. The app itself never writes; only this script does.
 *
 * Usage:
 *   pnpm tsx scripts/wp-write.ts <kind> create <json>
 *   pnpm tsx scripts/wp-write.ts <kind> update <id> <json>
 *   pnpm tsx scripts/wp-write.ts <kind> delete <id>
 *   pnpm tsx scripts/wp-write.ts <kind> list
 *
 * kind = event | tender | contact   (matches REST bases: eventos, concurso, contacto-util)
 *
 * JSON shape per kind (Portuguese ACF field names match the WP setup):
 *   event   { title, content?, status?, data_do_evento, local_do_evento?,
 *             preco_do_evento?, organizador?, link_do_evento? }
 *   tender  { title, content?, status?, instituicao, data_limite_de_submissao,
 *             tipo_de_concurso?, numero_de_vagas?, link_do_concurso? }
 *   contact { title, content?, status?, telefone?, email?, website?,
 *             descricao?, "contacto-categoria"?: number[] }   // term IDs
 *
 * status defaults to "publish".
 */

import { config as loadDotenv } from "dotenv";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

// Load .env.local first (Vite convention: local overrides .env)
for (const f of [".env.local", ".env"]) {
  const p = resolve(process.cwd(), f);
  if (existsSync(p)) loadDotenv({ path: p, override: false });
}

const BASE = process.env.WP_REST_BASE_URL?.replace(/\/$/, "");
const USER = process.env.WP_APP_USERNAME;
const PASS = process.env.WP_APP_PASSWORD;

if (!BASE || !USER || !PASS) {
  console.error(
    "Missing WP_REST_BASE_URL / WP_APP_USERNAME / WP_APP_PASSWORD in .env.local",
  );
  process.exit(1);
}

const AUTH = "Basic " + Buffer.from(`${USER}:${PASS}`).toString("base64");

export const REST_BASE: Record<string, string> = {
  event: "eventos",
  tender: "concurso",
  contact: "contacto-util",
  post: "posts",
};

// Field-name allowlists per kind — anything in this set is routed through
// `acf` (SCF/ACF accepts writes through the `acf` payload key when each
// field has Show in REST enabled). Top-level WP fields (title, content,
// status, slug, featured_media, categories, taxonomies) pass through verbatim.
const ACF_KEYS: Record<string, ReadonlySet<string>> = {
  event: new Set([
    "data_do_evento",
    "local_do_evento",
    "preco_do_evento",
    "organizador",
    "link_do_evento",
    // accept (and forward) optional fields if you add them in SCF later:
    "cidade",
    "event_display_date",
  ]),
  tender: new Set([
    "instituicao",
    "data_limite_de_submissao",
    "tipo_de_concurso",
    "numero_de_vagas",
    "link_do_concurso",
  ]),
  contact: new Set([
    "telefone",
    "email",
    "website",
    "descricao",
    // forward if you add a morada (address) field in SCF later:
    "morada",
  ]),
  // Built-in WP posts use only top-level fields — see TOP_LEVEL_KEYS.
  post: new Set([]),
};

const TOP_LEVEL_KEYS = new Set([
  "title",
  "content",
  "excerpt",
  "status",
  "slug",
  "featured_media",
  "categories",
  "tags",
  "menu_order",
  "contacto-categoria", // taxonomy term IDs on contacts
]);

function buildPayload(kind: string, input: Record<string, unknown>) {
  const acfAllow = ACF_KEYS[kind];
  const out: Record<string, unknown> = { status: "publish" };
  const acf: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(input)) {
    if (v === undefined || v === null) continue;
    if (TOP_LEVEL_KEYS.has(k)) {
      out[k] = v;
    } else if (acfAllow.has(k)) {
      acf[k] = v;
    } else {
      console.warn(`[warn] unknown field "${k}" for kind="${kind}" — ignored`);
    }
  }
  if (Object.keys(acf).length > 0) out.acf = acf;
  return out;
}

export async function wpFetch(
  method: string,
  path: string,
  body?: unknown,
): Promise<unknown> {
  const url = BASE + (path.startsWith("/") ? path : "/" + path);
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: AUTH,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`WP ${method} ${path} → ${res.status}\n${text.slice(0, 800)}`);
  }
  return text ? JSON.parse(text) : null;
}

/**
 * Download an image from a public URL and upload it to /wp/v2/media as a raw
 * binary body (simpler than multipart, works fine with WP REST).
 * Returns the new media attachment ID.
 */
export async function uploadMediaFromUrl(
  imageUrl: string,
  filename: string,
  alt?: string,
): Promise<number> {
  const fetched = await fetch(imageUrl);
  if (!fetched.ok) {
    throw new Error(`fetch ${imageUrl} → ${fetched.status}`);
  }
  const mime = fetched.headers.get("content-type") ?? "image/jpeg";
  const buf = Buffer.from(await fetched.arrayBuffer());

  const res = await fetch(BASE + "/media", {
    method: "POST",
    headers: {
      Authorization: AUTH,
      "Content-Type": mime,
      "Content-Disposition": `attachment; filename="${filename}"`,
      Accept: "application/json",
    },
    body: buf,
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`WP POST /media → ${res.status}\n${text.slice(0, 800)}`);
  }
  const media = JSON.parse(text) as { id: number };

  if (alt) {
    await wpFetch("POST", `/media/${media.id}`, { alt_text: alt });
  }
  return media.id;
}

function parseJsonArg(raw: string | undefined): Record<string, unknown> {
  if (!raw) throw new Error("missing JSON argument");
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      throw new Error("JSON must be an object");
    }
    return parsed as Record<string, unknown>;
  } catch (e) {
    throw new Error(`invalid JSON: ${(e as Error).message}`);
  }
}

function usage(code = 1): never {
  console.error(
    [
      "usage:",
      "  wp-write.ts <kind> create <json>",
      "  wp-write.ts <kind> update <id> <json>",
      "  wp-write.ts <kind> delete <id>",
      "  wp-write.ts <kind> list",
      "",
      "  kind = event | tender | contact | post",
      "",
      "  For `post create`, JSON may include `featured_image_url` (+ optional",
      "  `featured_image_alt`) to auto-upload the image and set featured_media.",
    ].join("\n"),
  );
  process.exit(code);
}

async function main() {
  const [kind, cmd, ...rest] = process.argv.slice(2);
  if (!kind || !cmd) usage();
  const base = REST_BASE[kind];
  if (!base) {
    console.error(`unknown kind "${kind}". Use one of: ${Object.keys(REST_BASE).join(", ")}`);
    process.exit(1);
  }

  if (cmd === "create") {
    const data = parseJsonArg(rest[0]);
    // Intercept featured_image_url before buildPayload (it's not a WP field).
    const imageUrl = data.featured_image_url;
    const imageAlt = data.featured_image_alt;
    delete data.featured_image_url;
    delete data.featured_image_alt;
    if (typeof imageUrl === "string" && imageUrl) {
      const filename =
        (typeof data.slug === "string" && data.slug
          ? data.slug
          : (typeof data.title === "string" ? data.title : "image")
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "")) + ".jpg";
      const mediaId = await uploadMediaFromUrl(
        imageUrl,
        filename,
        typeof imageAlt === "string" ? imageAlt : undefined,
      );
      data.featured_media = mediaId;
      console.log(`  uploaded media id=${mediaId} from ${imageUrl}`);
    }
    const payload = buildPayload(kind, data);
    const r = (await wpFetch("POST", `/${base}`, payload)) as {
      id: number;
      slug: string;
      link: string;
    };
    console.log(`created id=${r.id} slug=${r.slug}\n  ${r.link}`);
  } else if (cmd === "update") {
    const id = rest[0];
    if (!id) usage();
    const data = parseJsonArg(rest[1]);
    const payload = buildPayload(kind, data);
    const r = (await wpFetch("POST", `/${base}/${id}`, payload)) as {
      id: number;
      slug: string;
    };
    console.log(`updated id=${r.id} slug=${r.slug}`);
  } else if (cmd === "delete") {
    const id = rest[0];
    if (!id) usage();
    await wpFetch("DELETE", `/${base}/${id}?force=true`);
    console.log(`deleted id=${id}`);
  } else if (cmd === "list") {
    const r = (await wpFetch("GET", `/${base}?per_page=100&status=any`)) as Array<{
      id: number;
      slug: string;
      title: { rendered: string };
      status: string;
    }>;
    for (const p of r) {
      console.log(`${p.id}\t${p.status}\t${p.slug}\t${p.title.rendered}`);
    }
    console.log(`(${r.length} items)`);
  } else {
    usage();
  }
}

// Only run the CLI when invoked directly (allows other scripts to import
// `wpFetch` and `uploadMediaFromUrl` without re-entering main).
const invokedDirectly =
  process.argv[1] && process.argv[1].endsWith("wp-write.ts");
if (invokedDirectly) {
  main().catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  });
}
