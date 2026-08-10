# WordPress Setup — Revista Chiveve Headless CMS

This frontend (TanStack Start + React) consumes WordPress at
`https://dev.cahubauto.com/wp-json/wp/v2` as a **headless CMS**. All data
fetches happen server-side via TanStack Start `createServerFn`. Every
section of the site is designed to either:

- **A — Pull from WP** when the right post type / category / fields exist.
- **B — Fall back to inline mock data** so the site never goes blank.

Cutover for each Phase 2 entity is automatic: the moment the CPT and its
fields are registered in WP and at least one record is published, the
frontend picks it up on the next cache miss (≤60 s for lists, 5 min for
detail pages, 1 h for categories). No code change required.

---

## Phase 1 — Articles & Categories (LIVE)

Articles use **built-in WP `post`** with **built-in WP categories**.

### What's already working

- Article listings (`/artigos`) — most recent posts.
- Category pages (`/artigos/<slug>`) — posts in that category.
- Article detail (`/artigos/<category>/<slug>`) — full `content.rendered`
  rendered inside `Prose`, with images, lists, headings, embeds preserved.
- Search (`/pesquisa?q=…`) — backed by WP `?search=…`.
- Header dropdown — categories list comes from WP.
- Featured image → article hero + `og:image`.
- `excerpt` → meta description + lede.
- Author display name → byline.
- `date_gmt` → `article:published_time`.
- Reading time computed from word count (no field needed).

### What you need to do for Phase 1

1. **Audit category slugs.** The frontend routes articles by WP category
   slug. Ensure these slugs exist (rename in WP if needed):

   | Used in frontend | Currently in WP | Action |
   | --- | --- | --- |
   | `economia` | ✓ | none |
   | `empreendedorismo` | ✓ | none |
   | `opiniao` | ✓ | none |
   | `inovacao-tecnologia` | — | create or rename existing |
   | `lideranca` | — | create or rename existing |
   | `analise` | — | create or rename existing |
   | `empresas`, `entrevistas`, `editorial`, `destaques`, `actualidade` | ✓ | already work, just add a brand color in `src/data/category-colors.ts` if you want a non-default accent |

   Any **new** category you add in WP shows up automatically in the
   `/artigos` grid and the Header dropdown.

2. **Add a Description on each category** (Posts → Categories → Edit).
   The text appears as the category page subtitle.

3. **Featured image on every post.** Without one, the hero falls back to a
   placeholder.

---

## Phase 2 — CPTs to register

All Phase 2 CPTs are registered via **CPT UI** (already installed at
`/wp-admin/admin.php?page=cptui_manage_post_types`). Fields use **SCF**
(formerly ACF) — when you create a field group, **tick "Show in REST"** on
the group, and **also on every individual field** (SCF doesn't propagate
that flag automatically across all field types).

### 2A — Events (`event`)

Frontend route: `/eventos`, `/eventos/<slug>`. Falls back to
`src/data/events.ts` until live.

**CPT UI → Add Post Type:**

- Post Type Slug: `event`
- Plural Label: `Eventos`
- Singular Label: `Evento`
- **Show in REST:** Yes ✓
- **REST API base slug:** `eventos`
- Supports: `title`, `editor`, `thumbnail`, `custom-fields`

**SCF → Field Group "Detalhes do Evento" (Show in REST ✓):**

| Field name (slug) | Type | Notes |
| --- | --- | --- |
| `event_date` | Date Picker | ISO output (YYYY-MM-DD). Used for displayDate, day, month. |
| `event_location` | Text | Venue name + street. |
| `event_city` | Text | "Maputo, Moçambique". |
| `event_price` | Text | Free-form: "Entrada livre", "MZN 1500", etc. |
| `event_organizer` | Text | Default "Revista Chiveve". |
| `event_registration_url` | URL | Inscription link. |

The event **body** uses the standard WP editor — rendered as HTML inside
Prose, same as articles. The **featured image** becomes the hero.

### 2B — Print Editions (Download Monitor)

Frontend route: `/edicao-impressa`. Powered by the **Download Monitor** plugin
— each PDF upload becomes an edition automatically. No second CPT to create,
no URLs to copy around.

**Authoring workflow (per edition):**

1. WP admin → **Downloads → Add New**
2. Title — e.g. `Revista Chiveve — Junho 2026`
3. **Add file** → upload the PDF (Download Monitor creates the download +
   tracking record)
4. **Featured Image** → upload a cover (3:4 portrait, ≥ 800px wide
   recommended)
5. Toggle **Featured: Yes** on the edition you want as the current hero
   (only one at a time — DLM exposes this as a top-level flag the frontend
   reads directly)
6. **Publish**

The page picks up the new edition within ~5 min (list TTL). PDF download
links go through DLM's `/download/<id>/` redirect, so download counts are
tracked automatically.

**Optional v2 — richer fields.** The frontend normalizer falls back to
`acf` / `meta` for these slugs if the user wants subtitle/date/highlights:

| Field name (slug) | Type | Notes |
| --- | --- | --- |
| `edicao_subtitle` | Text | Shown under the title. |
| `edicao_date` | Date Picker or text | Display date shown above the title in cards. |
| `edicao_highlights` | Repeater or newline textarea | Bulleted "Nesta Edição" block on the hero. |
| `edicao_pdf_url` | URL or File (return URL) | Overrides DLM's `/download/...` link if set. |

Attach the SCF Field Group to Post Type **`dlm_download`** with Show-in-REST
enabled on the group **and** on each field. The fields surface immediately
on the next page load — no code change needed.

### 2C — Public Tenders (`concurso`)

Frontend route: `/concursos-publicos`. Falls back to inline mock until live.

**CPT UI → Add Post Type:**

- Post Type Slug: `concurso`
- Plural Label: `Concursos Públicos`
- Singular Label: `Concurso`
- Show in REST: Yes ✓
- REST API base slug: `concurso`
- Supports: `title`, `editor`, `custom-fields`

**SCF → Field Group "Concurso" (Show in REST ✓):**

| Field name (slug) | Type | Notes |
| --- | --- | --- |
| `concurso_institution` | Text | E.g. "Ministério das Finanças". |
| `concurso_deadline` | Date Picker | Display date. |
| `concurso_type` | Select | Options: `Concurso Público`, `Concurso Limitado`, `Outros`. |
| `concurso_vacancies` | Number | Integer. |
| `concurso_edital_url` | URL | Link to the public notice PDF. If empty, the CTA renders as a disabled-style button. |

### 2D — Useful Contacts (`contacto-util`)

Frontend route: `/contactos-uteis`. Falls back to inline mock until live.

**CPT UI → Add Post Type:**

- Post Type Slug: `contacto-util`
- Plural Label: `Contactos Úteis`
- Singular Label: `Contacto Útil`
- Show in REST: Yes ✓
- REST API base slug: `contacto-util`
- Supports: `title`, `thumbnail`, `custom-fields`

**CPT UI → Add Taxonomy:**

- Taxonomy Slug: `contacto-categoria`
- Plural Label: `Categorias de Contactos`
- Show in REST: Yes ✓
- Attach to post type: `contacto-util`
- Use the category filter pills at the top of the directory page; new
  taxonomy terms show up automatically.

**SCF → Field Group "Contacto" (Show in REST ✓):**

| Field name (slug) | Type |
| --- | --- |
| `contacto_phone` | Text |
| `contacto_email` | Email |
| `contacto_address` | Textarea |
| `contacto_website` | URL |
| `contacto_description` | Textarea (1–2 lines) |

The logo comes from the **featured image**. The contact **name** is the
post title.

### 2E — Team (`team-member`)

Frontend route: `/sobre-nos`. Falls back to inline mock until live.

**CPT UI → Add Post Type:**

- Post Type Slug: `team-member`
- Plural Label: `Equipa`
- Singular Label: `Membro da Equipa`
- Show in REST: Yes ✓
- REST API base slug: `team`
- Supports: `title`, `editor`, `thumbnail`, `custom-fields`, `page-attributes`
- **`page-attributes`** enables the menu_order field — set it on each
  member to control display order.

**SCF → Field Group "Equipa" (Show in REST ✓):**

| Field name (slug) | Type |
| --- | --- |
| `team_role` | Text — e.g. "Editor-Chefe" |
| `team_bio` | Textarea — optional, falls back to `content` |

**Name** = post title. **Portrait** = featured image.

---

## Server-side caching

Each fetcher has its own TTL. Editors will see new content within these
windows, or you can hard-restart Node to invalidate immediately:

| Endpoint | TTL |
| --- | --- |
| Article lists / search | 60 s |
| Article detail | 5 min |
| Categories | 1 h |
| Events list / detail | 60 s / 5 min |
| Editions | 5 min |
| Tenders | 1 min |
| Contacts | 5 min |
| Team | 1 h |
| Registered REST bases (CPT detection) | 10 min |

To **force-refresh during testing**: edit `src/server/wp/client.ts` and
the `clearWPCache()` export call site, or restart `pnpm dev`.

---

## Verification per entity

After you register a CPT and add at least one record, the corresponding
route should switch from mock to WP without a code change:

```bash
# Restart dev so the CPT-detection cache picks up the new rest_base
pnpm dev

# Hit the route
curl -s http://localhost:3000/eventos | grep -i "<title>"

# Or check the WP REST directly
curl -s "https://dev.cahubauto.com/wp-json/wp/v2/eventos?per_page=1&_embed=1"
```

If you see the WP-published record on the page, you're done.

---

## Environment

Required server-side env vars (in `.env`, copy from `.env.example`):

```
VITE_WP_REST_BASE_URL=https://dev.cahubauto.com/wp-json/wp/v2

# Server-only (do not prefix with VITE)
WP_REST_BASE_URL=https://dev.cahubauto.com/wp-json/wp/v2
WP_APP_USERNAME=…
WP_APP_PASSWORD=…   # Application Password, not your login password
```

`.env` is **never committed** (already in `.gitignore`). On production
hosts, set these via the host's secret manager.

---

## Sitemap

`public/sitemap.xml` is regenerated by `pnpm sitemap` (also runs as part
of `pnpm build`). It pulls every published post + every category from WP
and writes a static XML file. Re-run after major content drops, or set
up a daily cron in production.

`robots.txt` already references `/sitemap.xml`.
