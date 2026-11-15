# Hero banner: design handoff

Spec for the Sherwood Nurseries home page hero. This file is the source of truth.
`hero-banner.html` is a visual reference only: do not copy its markup or CSS.

## Files

| File | Purpose |
| --- | --- |
| `hero-banner.md` | This spec |
| `hero-banner.html` | Static reference, open in a browser (1440 x 548) |
| `sherwood-nursery-yard.webp` | Hero background, 680 x 443 (placeholder resolution, see Open items) |

## Stack (assumed, confirm against the repo)

- Astro, Tailwind CSS v4
- No shadcn components. Build project-owned, shadcn-style Astro components, merging classes with the `cn` utility in `src/lib/utils/cn.ts`
- Server-render or prerender this page (hours, address and copy must be in the HTML)
- Use Tailwind theme tokens, no hard-coded hex. The reference is black and white on purpose: map `#111` / `#555` / `#bdbdbd` to the project's foreground, muted and border tokens.

## Layout

Desktop reference: 1440 wide, hero 548 tall, 96 px side padding, two columns with a 56 px gap.

```
<section hero>
  background image (cover) + gradient overlay
  ├─ Intro panel (left, 640 px, white, 40 px padding)
  │    eyebrow · h1 · lead · 2 buttons · trust row
  └─ Card stack (right, 520 px, 16 px gap)
       1. Shop plants (dark card, 4 category tiles)
       2. Plant finder (link card)
       3. Plan your visit (status + 2-button footer)
```

### Background

- Image: `sherwood-nursery-yard.webp`, `object-fit: cover`
- Overlay: Tailwind `mist-900` at 30% (top) to `mist-900` at 100% (bottom)
- Tailwind: `bg-linear-to-b from-mist-900/30 to-mist-900` on an absolutely positioned layer
- `mist-900` = `oklch(21.8% 0.008 223.9)` (needs a Tailwind version that ships the mist palette; otherwise add it under `@theme`)

### Intro panel

| Element | Copy | Notes |
| --- | --- | --- |
| Eyebrow | Tree nursery & garden centre · Sherwood Park, AB | 14 px, 600, uppercase. Carries the what + where keywords, keep it as text |
| `h1` | Everything your garden needs to take root. | 46 px, 700, line-height 1.1. Only `h1` on the page |
| Lead | Walk the rows, talk to our growers, and leave with plants that suit your soil, sun and space. | 18 px |
| Primary button | Shop trees & shrubs | Solid, 52 px high |
| Secondary button | Planting consultation | Outline, 52 px high |
| Trust row | [GOOGLE RATING + REVIEW COUNT] · [YEARS IN BUSINESS] · [PLANT WARRANTY] | Placeholders. Hide the row until real values exist |

### Card 1: Shop plants

- Dark card, `h2` "Shop plants", 4-column grid of link tiles
- Tiles: Trees, Shrubs, Perennials, New this week
- Each tile: image (76 px high, cover) above a 13 px label
- Images not supplied yet (see Open items)

### Card 2: Plant finder

- Whole card is one link
- Title: Find the right plant for your yard
- Subtitle: Try our plant finder application to get the right plant for your effort.
- Trailing arrow, decorative (`aria-hidden`)

### Card 3: Plan your visit

- Title: Plan your visit
- Status line: `● Open today until 5 PM · Sat 9:00 AM – 5:00 PM`
- Footer: 2 equal columns above a top border
  - Left: "Get directions" (solid, 44 px)
  - Right: "View nursery hours" (outline, 44 px)

## Behaviour

1. Compute the status line from one hours data source, in `America/Edmonton`. States: "Open today until {close}", "Closed · opens {day} {open}", "Closed today".
2. Render the status on the server, then refresh on the client so a cached page cannot show a stale state.
3. "Get directions" opens a maps link for the address below. No map embed in the hero.
4. Feed the same hours object into the JSON-LD (see SEO).

## Business data

| Field | Value |
| --- | --- |
| Name | Sherwood Nurseries (use one name everywhere; the old app bar said "Sherwood Park Tree Nursery") |
| Tagline | Take Root & Grow Strong |
| Address | 22040 Township Rd 522, Sherwood Park, AB |
| Phone | 587-545-6929 (`tel:+15875456929`) |
| Email | info@sherwoodnurseries.ca |
| Mon to Fri | 9:00 AM to 6:00 PM |
| Saturday | 9:00 AM to 5:00 PM |
| Sunday | 10:00 AM to 4:00 PM |
| Holidays | Closed |
| Nov to Mar | Seasonal hours apply, schedule not supplied |

## Responsive (not designed yet, suggested)

- Below `lg`: stack to one column, intro panel first, then cards
- Shop tiles: 4 columns down to 2 x 2 on small screens
- Keep all tap targets at least 44 px high
- Let the hero height grow with content; 548 px is the desktop reference only

## Accessibility

- Real `<a>` and `<button>` elements, visible focus styles
- Meaningful `alt` on the hero image, as in the reference
- Do not signal open/closed by colour alone; the text carries it
- Text contrast at least 4.5:1 against the panel backgrounds

## SEO / AEO / GEO

- Hero image is the likely LCP element: serve AVIF/WebP with `srcset`, explicit `width`/`height`, `fetchpriority="high"`, no lazy loading
- Title pattern: `Sherwood Nurseries | Tree Nursery & Garden Centre in Sherwood Park, AB`
- JSON-LD `GardenStore` (a `LocalBusiness` subtype) with name, address, geo, telephone and `openingHoursSpecification`, built from the same data as the visit card
- Name, address and phone must match the Google Business Profile exactly

## Open items

- [ ] Four category tile images (trees, shrubs, perennials, new this week)
- [ ] Real values for the three trust placeholders
- [ ] Confirm "for your effort" in the plant finder subtitle (possibly meant "for your yard")
- [ ] Hero photo at 1920 px wide or larger; the current file is 680 px
- [ ] Routes for: shop, consultation, plant finder, hours page
- [ ] Nov to Mar seasonal hours
- [ ] Mobile layout sign-off

## Suggested prompt

> Read @docs/design/hero-banner.md and build the home page hero as an Astro component with Tailwind. Use hero-banner.html only as a layout reference. Follow the project's existing tokens and component conventions, list anything in Open items you had to stub, and stop for review before touching other pages.

## Resources

- Tailwind colours: https://tailwindcss.com/docs/colors
- Astro components: https://docs.astro.build/en/basics/astro-components/
- Astro prerendering / on-demand rendering: https://docs.astro.build/en/guides/on-demand-rendering/
- schema.org GardenStore: https://schema.org/GardenStore
- Optimising LCP: https://web.dev/articles/optimize-lcp
