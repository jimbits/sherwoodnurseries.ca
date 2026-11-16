# CLAUDE.md — Sherwood Nurseries website

Rebuild of https://sherwoodnurseries.ca with Astro + Tailwind CSS.

## Business

- **Name:** Sherwood Nurseries — 8-acre tree nursery and garden centre
- **Location:** just outside Sherwood Park, Alberta (Canada)
- **Service area:** Sherwood Park, Fort Saskatchewan, Edmonton
- **Climate:** USDA/Canadian hardiness zone ~3b–4a; every plant listed must be hardy here
- **Partner:** Little Creek Landscape Design (Sherwood Park)
- **Phone:** (587) 545-6929
- **Email:** info@sherwoodnurseries.ca
- **Address:** 22040 Township Rd 522, Sherwood Park, AB
- **Hours:**
  - Mon–Wed: 9 a.m.–6 p.m.
  - Thu: 9 a.m.–8 p.m.
  - Fri–Sat: 9 a.m.–6 p.m.
  - Sun: 10 a.m.–5 p.m.
- **Close For Season:** Monday, October 12, 2026
- **Reopens** Saturday, March 20, 2027

In code, these facts live in `src/data/business.ts` and `src/data/hours.ts`.
When they change, update both this file and the data files.

## Products

- **Trees:** fruit trees to evergreens (e.g. Apple, Spring Snow Crab)
- **Shrubs:** TODO
- **Perennials:** e.g. Stella D'oro Daylily, Vanilla Strawberry Hydrangea
- No online ordering. Tree pricing and inventory: customers call.

## Services

- Delivery and installation of trees and shrubs
- Planting guidance (planting guide download)
- Yard / green-space design using nursery inventory
- Plant warranty (see Warranty page)

## Site map

- Home
- About → Helpful Guides, Warranty
- Products (Trees, Shrubs, Perennials)
  - Plant detail page per plant: `/products/[category]/[slug]` (zone, size, sun, price, photos)
- Services → Delivery & Planting (service area, costs, what's included)
- Gallery / Projects (before/after installs)
- Price List
- Plant Finder
- FAQ (planting season, delivery, sizes, warranty)
- Contact
- Privacy Policy (footer link; required by Alberta PIPA / PIPEDA once forms collect personal info)

## Audience & tone

- Local homeowners and businesses in the Edmonton region
- Warm, friendly, community-focused; plain language
- Canadian spelling (colour, centre), metric units first

## Brand

- Design tokens: `src/css/global.css` (see Styling below)
- Font: Nunito, self-hosted via the Astro Fonts API (`fonts` in
  `astro.config.mjs`, `<Font>` in `Layout.astro`, CSS variable `--font-nunito`)
- Company logo: `src/components/brand/logo.svg`; other logo drafts are in
  `src/assets/brand/`, `src/icons/logo/` and `public/logo-*`
- Design references (screenshots the UI is built from): `design/reference/`

## Tech stack

- Astro 7 + Tailwind CSS v4 (Vite plugin, no `tailwind.config.js`) + MDX
- Runtime and package manager: Bun (Node ≥ 22.23.4 also required)
- Hosting: Cloudflare Workers static assets (`wrangler.jsonc` serves `./dist`)
- Fully static output: no SSR adapter, no API routes, no content collections yet
- Content source: TODO (`docs/content-source.md` is planned but not written yet)
- Forms: TODO (`docs/forms.md` is planned but not written yet)

## Commands

```sh
bun install
bun dev                    # http://localhost:4321
bun astro dev --background # preferred for agents; also: status, logs, stop
bun run build              # NOT `bun build` (that is Bun's bundler, not Astro)
bun preview
bun astro check            # type-check .astro and .ts
bun run lint:md            # markdownlint; lint:md:fix to auto-fix
bunx prettier -w .         # format (prettier-plugin-astro)
```

There are no tests. Use `bun run build` to confirm a change compiles.

## Project layout

```text
src/
├── layouts/Layout.astro   The only page shell
├── pages/                 index, plant-finder, hero-drafts, guide/
├── components/
│   ├── announcement-bar/  Top strip (season message)
│   ├── appbar/            Brand + Plant Finder, Directions, Email, Phone, menu
│   ├── blocks/hero/       Hero (live), 3 drafts, VisitCard, PromoCard
│   ├── brand/             Brand, BrandLogo, BrandText, BrandTagline (index.ts re-exports)
│   ├── hours/             HoursList, HoursDialog, VisitDialog
│   ├── plant-finder/      PlantFinderDialog
│   ├── consultation/      BookConsultationForm (dialog)
│   └── page-mode/         Light/dark toggle + early-theme script
├── data/                  business.ts, hours.ts, plant-finder.ts
├── scripts/visit-status.ts  Client-side live open/closed status
├── css/global.css         Tailwind entry + design tokens
├── lib/utils/cn.ts        clsx + tailwind-merge
├── ui/                    Generic primitives: Badge, Button, Icon
└── archived/              Old components kept for reference; not imported
```

Outside `src/`: `design/` (references and hero mock-ups), `artwork/` (Affinity
`.af` sources), `docs/plans/` (working plans), `notes/`. `docs/`, `notes/` and
`artwork/` are **gitignored**, so they exist only on this machine.

## Architecture

### Layout

`Layout.astro` renders, in order: `AnnouncementBar`, `AppBar`, the home `Hero`
(skip with `<Layout hero={false}>`), the page `<slot />`, then three global
dialogs: `PlantFinderDialog`, `VisitDialog`, `BookConsultationForm`. Pages can
add to `<head>` with `slot="head"` (e.g. `noindex` on `/plant-finder`).

The announcement bar and app bar swap visual order with CSS `order` (app bar
first on phones).

### Global dialogs (open by data attribute)

Each dialog is a native `<dialog>` rendered once in the layout. Any element
with the matching attribute opens it, so buttons in the hero, app bar and
mobile menu share one dialog:

| Attribute                | Opens                                   |
| :----------------------- | :-------------------------------------- |
| `data-plant-finder-open` | `PlantFinderDialog`                     |
| `data-visit-open`        | `VisitDialog` (hours + directions)      |
| `data-consultation-open` | `BookConsultationForm`                  |

Use a real `href` on links as a no-JS fallback where one exists.

### Data and live status

- `src/data/business.ts`: name, address, phone (`phoneHref`), email, Google /
  Apple Maps links. Import from here; never hard-code contact details.
- `src/data/hours.ts`: weekly hours, season closure dates, time zone
  (`America/Edmonton`) and helpers (`getVisitStatus`, `hoursGroups`,
  `formatTime`). Times use Canadian style ("6 p.m.").
- `src/scripts/visit-status.ts`: `startVisitStatus()` fills any
  `[data-visit-status]` element's `[data-visit-label]`, `[data-visit-detail]`
  and `[data-visit-badge]` children in the browser and refreshes every minute.
  The server render is only a starting value, since the site is static.
- `src/data/plant-finder.ts`: filter fields (type, sun, size) and popular
  searches. The dialog submits GET to `/plant-finder`, which is a stub that
  echoes the filters and asks people to call. There is no plant data yet.

### Styling

- Tokens are defined with `@theme` in `src/css/global.css`, in OKLCH.
  - App tokens (switch with dark mode): `page`, `app`, `surface`, `border`,
    `ink`, `muted`, `primary`, `primary-tint`, `accent`, `danger`, …
  - Marketing tokens (`sherwood-forest`, `sherwood-mint`, `sherwood-leaf`, …):
    fixed across themes; used by the hero, dialogs and app bar.
  - Comments note contrast rules (e.g. `sherwood-leaf` and `primary-soft` are
    for icons and decoration only, never text).
- Custom type scale (`text-display`, `text-title`, `text-body`, …), radii
  (`rounded-sm/md/lg/pill`), shadows (`shadow-card`, `shadow-float`) and a
  `glass` utility.
- Dark mode is `data-theme="dark"` on `<html>` (custom `dark:` variant).
  `PageModeScript` must be in `<head>` to apply the saved theme before paint.
- Prefer tokens over raw hex. Tailwind's default palette is still enabled
  (some components use `olive-*`).

## Conventions

- Import with aliases: `@/` maps to `src/`; `@components/*` and `@lib/*` also
  work. Note `@ui/*` points to `src/components/ui`, which doesn't exist; use
  `@/ui/...` instead.
- Components accept a `class` prop and merge it with `cn()` so callers can
  override styles. Use `cva` when a component needs variants.
- Images that components import go in `src/assets/` and use `astro:assets`
  (`<Picture>`). Files that need a fixed URL go in `public/`.
- Start each component with a doc comment saying what it is, where it's used
  and any data attributes it relies on (the existing components do this).
- Before adding pages, metadata, schema or content, read
  `docs/plans/seo.md` and tick off items as work lands and add notes.
- Before choosing keywords, page types or content topics, read
  [docs/research/seo-goals.md](docs/research/seo-goals.md)
  (goals, which search types matter for a local nursery, and which we skip).

## Known issues and leftovers

- `BookConsultationForm` only validates and shows a confirmation. Nothing is
  sent. Do not ship to production until a forms backend is chosen.
- `src/ui/icon/Icon.astro` imports `@/icons/registry`, which doesn't exist, so
  anything importing it (e.g. `social-media/Linker.astro`) would break the build.
- Not used anywhere: `SiteHeader.astro`, `navigation/`, `Catalog.astro`,
  `product/`, `data/products.json` and `product.ts` (placeholder mugs and
  t-shirts), `announcement-bar/Temp.astro`, `SeasonStatus.astro`,
  `Message.astro`, `blocks/InfoStripHero.astro`, `blocks/social-media/`,
  `appbar/AppBarButton.astro`, `ui/button`. Some of these still contain the
  wrong phone number (`780-123-4567`).
- `AnnouncementBar` still uses hard-coded hex colours and a default message
  that says "Reopen September 2027"; the real reopening date is in `hours.ts`.
- `/hero-drafts` is a review page for four hero layouts; delete it and the
  unused drafts once a direction is final. `Hero.astro` (draft B) is live.
- `/guide` is a styleguide stub left over from a "Plant App" template.
- `index.astro` has an empty `<main>`; the home page is currently just the hero.
- Header rework plan: `docs/plans/header-rework.md`.

## Open decisions

- TODO: price list as PDF vs plant data
- TODO: Plant Finder implementation
- TODO: contact form destination
