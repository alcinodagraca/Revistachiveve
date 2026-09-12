import { wpList } from "./client";
import type { WPPost } from "./types";
import { resolveFeaturedImage } from "./media";
import { decodeEntities, stripTags } from "./util";
import { hasRestBase } from "./cpt-detect";
import { sanitizeWordPressHtml } from "./content";

export type Event = {
  id: number;
  slug: string;
  title: string;
  image: string;
  date: string;
  displayDate: string;
  day: string;
  month: string;
  location: string;
  city: string;
  description: string[];
  bodyHtml: string;
  price: string;
  organizer: string;
  registrationUrl: string;
  modifiedAt: string;
};

const REST_BASE = "eventos";
const LIST_TTL_MS = 60_000;
const DETAIL_TTL_MS = 5 * 60_000;

const MONTH_PT_SHORT = [
  "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
  "JUL", "AGO", "SET", "OUT", "NOV", "DEZ",
];

function formatDisplayDate(iso: string): { displayDate: string; day: string; month: string } {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { displayDate: iso, day: "", month: "" };
  const day = String(d.getDate()).padStart(2, "0");
  const month = MONTH_PT_SHORT[d.getMonth()];
  const displayDate = `${day} ${month.charAt(0)}${month.slice(1).toLowerCase()} ${d.getFullYear()}`;
  return { displayDate, day, month };
}

type WPEvent = WPPost & {
  meta?: Record<string, unknown>;
  acf?: Record<string, unknown>;
};

function pickMeta(post: WPEvent, key: string): string | undefined {
  const v = post.meta?.[key] ?? post.acf?.[key];
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return undefined;
}

function pick(post: WPEvent, ...keys: string[]): string | undefined {
  for (const k of keys) {
    const v = pickMeta(post, k);
    if (v) return v;
  }
  return undefined;
}

function normalizeWPEvent(post: WPEvent): Event {
  const iso =
    pick(post, "data_do_evento", "event_date") ?? post.date_gmt;
  const { displayDate, day, month } = formatDisplayDate(iso);
  const bodyHtml = sanitizeWordPressHtml(post.content.rendered);
  return {
    id: post.id,
    slug: post.slug,
    title: decodeEntities(post.title.rendered),
    image: resolveFeaturedImage(post),
    date: iso,
    displayDate: pick(post, "event_display_date") ?? displayDate,
    day,
    month,
    location: pick(post, "local_do_evento", "event_location") ?? "",
    city: pick(post, "cidade", "event_city") ?? "",
    description: stripTags(bodyHtml)
      .split(/\n+/)
      .filter(Boolean),
    bodyHtml,
    price: pick(post, "preco_do_evento", "event_price") ?? "",
    organizer: pick(post, "organizador", "event_organizer") ?? "",
    registrationUrl: pick(post, "link_do_evento", "event_registration_url") ?? "",
    modifiedAt: post.modified_gmt ?? post.modified,
  };
}

export async function listEvents(): Promise<Event[]> {
  if (!(await hasRestBase(REST_BASE))) return [];
  const events: WPEvent[] = [];
  let page = 1;

  for (;;) {
    const res = await wpList<WPEvent>(`/${REST_BASE}`, {
      params: { _embed: 1, per_page: 100, page, orderby: "date", order: "desc" },
      ttlMs: LIST_TTL_MS,
    });
    events.push(...res.items);
    if (page >= res.totalPages || res.items.length === 0) break;
    page++;
  }

  return events.map(normalizeWPEvent);
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  if (!(await hasRestBase(REST_BASE))) return null;
  const res = await wpList<WPEvent>(`/${REST_BASE}`, {
    params: { slug, _embed: 1, per_page: 1 },
    ttlMs: DETAIL_TTL_MS,
  });
  return res.items.length > 0 ? normalizeWPEvent(res.items[0]) : null;
}
