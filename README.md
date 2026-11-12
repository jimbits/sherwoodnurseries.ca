# Sherwood Nurseries

Website for Sherwood Nurseries (sherwoodnursaries.ca), built with
[Astro](https://docs.astro.build), Tailwind CSS v4 and MDX.

## Requirements

- [Bun](https://bun.sh) (package manager and script runner)
- Node.js 22.23.4 or newer (see `engines` in `package.json`)

## Getting started

```sh
bun install
bun dev          # http://localhost:4321
```

To run the dev server in the background (handy for agents and long sessions):

```sh
bun astro dev --background
bun astro dev status   # is it running?
bun astro dev logs     # view output
bun astro dev stop     # shut it down
```

In VS Code you can also start it from **Run and Debug → Development server**.

## Commands

Run all commands from the project root.

| Command               | What it does                                       |
| :-------------------- | :------------------------------------------------- |
| `bun install`         | Install dependencies                               |
| `bun dev`             | Start the dev server at `localhost:4321`           |
| `bun run build`       | Build the production site to `./dist/`             |
| `bun preview`         | Serve the production build locally                 |
| `bun astro check`     | Type-check `.astro` and `.ts` files                |
| `bun run lint:md`     | Lint Markdown files with markdownlint              |
| `bun run lint:md:fix` | Lint Markdown and fix what can be fixed            |
| `bunx prettier -w .`  | Format the codebase (Astro + Tailwind class order) |

> Use `bun run build`, not `bun build`. `bun build` is Bun's own bundler and
> won't run Astro.

## Project structure

```text
/
├── artwork/                  Source design files (Affinity .af) — not shipped
├── public/                   Static files served as-is (favicon, logos, splash)
└── src/
    ├── assets/               Images/SVGs processed by Astro (brand logo, favicon)
    ├── components/
    │   ├── blocks/           Page sections built from smaller parts
    │   │   ├── announcement-bar/   Top-of-page notice (Message, SeasonStatus)
    │   │   └── social-media/       Social links (LinkList, Linker, SocialMediaLink)
    │   ├── brand/            Brand, BrandLogo, BrandText, BrandTagline
    │   ├── product/          Product display
    │   └── Catalog.astro
    ├── data/                 Product data (products.json) and its type (product.ts)
    ├── icons/                Raw SVG icons, grouped by set (e.g. social/)
    ├── layouts/              Page shells (Layout.astro)
    ├── lib/utils/            Helpers, e.g. cn()
    ├── pages/                File-based routes — each file becomes a URL
    ├── styles/global.css     Tailwind entry point
    └── ui/                   Low-level primitives: Badge, Button, Icon
```

## Conventions

### Import aliases

Use the `@/` alias instead of long relative paths. It maps to `src/`:

```astro
---
import Layout from "@/layouts/Layout.astro";
import Badge from "@/ui/badge/Badge.astro";
import { cn } from "@/lib/utils/cn";
---
```

Aliases are defined in `tsconfig.json`.

### Components

- **`ui/`** holds small, generic building blocks with no site-specific content.
- **`components/blocks/`** holds larger sections made by combining `ui/`
  pieces. A folder can have an `index.ts` that re-exports its parts:

  ```ts
  import { Brand, BrandLogo, BrandText } from "@/components/brand";
  ```

- Components take a `class` prop and merge it with their default classes
  using `cn()`, so callers can override styles:

  ```astro
  ---
  const { class: className, ...props } = Astro.props;
  ---
  <span class={cn("rounded-md bg-green-100 px-1.5", className)} {...props}>
    <slot />
  </span>
  ```

  `cn()` combines `clsx` (conditional classes) and `tailwind-merge`
  (later Tailwind classes win). Use `class-variance-authority` (`cva`) when a
  component needs variants such as size or colour.

### Styling

Tailwind CSS v4 is loaded through the Vite plugin and imported once in
`src/styles/global.css`. There is no `tailwind.config.js`; configure the theme
with `@theme` in `global.css`.

### Static files vs. assets

- Put files in `public/` when they need a fixed URL (e.g. `/favicon.svg`).
- Put images in `src/assets/` when you import them in components, so Astro can
  optimise them.

## Other folders

- `.notes/` — personal working notes and references. Not part of the site.
- `AGENTS.md` — instructions for AI coding assistants working in this repo.

## Learn more

- [Astro docs](https://docs.astro.build)
- [Tailwind CSS docs](https://tailwindcss.com/docs)
- [Astro VS Code extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)
  (recommended in `.vscode/extensions.json`)
