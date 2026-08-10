import { wpList } from "./client";
import type { WPPost } from "./types";
import { resolveFeaturedImage } from "./media";
import { decodeEntities, stripTags } from "./util";
import { hasRestBase } from "./cpt-detect";
import {
  events as MOCK_EVENTS,
  getEventBySlug as mockGetEventBySlug,
} from "../../data/events";
import type { Event as MockEvent } from "../../data/events";

export type Event = MockEvent & { id?: number; bodyHtml?: string };

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
    description: stripTags(post.content.rendered)
      .split(/\n+/)
      .filter(Boolean),
    bodyHtml: post.content.rendered,
    price: pick(post, "preco_do_evento", "event_price") ?? "Mais informações",
    organizer: pick(post, "organizador", "event_organizer") ?? "Revista Chiveve",
    registrationUrl: pick(post, "link_do_evento", "event_registration_url") ?? "#",
  };
}

function mockToEvent(e: MockEvent): Event {
  return { ...e };
}

export async function listEvents(): Promise<Event[]> {
  if (await hasRestBase(REST_BASE)) {
    try {
      const res = await wpList<WPEvent>(`/${REST_BASE}`, {
        params: { _embed: 1, per_page: 50, orderby: "date", order: "desc" },
        ttlMs: LIST_TTL_MS,
      });
      if (res.items.length > 0) return res.items.map(normalizeWPEvent);
    } catch {
      // fall through to mock
    }
  }
  return MOCK_EVENTS.map(mockToEvent);
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  if (await hasRestBase(REST_BASE)) {
    try {
      const res = await wpList<WPEvent>(`/${REST_BASE}`, {
        params: { slug, _embed: 1, per_page: 1 },
        ttlMs: DETAIL_TTL_MS,
      });
      if (res.items.length > 0) return normalizeWPEvent(res.items[0]);
    } catch {
      // fall through
    }
  }
  const mock = mockGetEventBySlug(slug);
  return mock ? mockToEvent(mock) : null;
}
