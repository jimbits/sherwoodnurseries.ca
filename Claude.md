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

- Design system: TODO
- Company Logo: src/components/brand/logo.svg

## Tech stack

- Astro (latest) + Tailwind CSS v4
- Runtime: Bun
- Hosting: Cloudflare
- Content source: TODO — options in docs/content-source.md
- Forms: TODO — options in docs/forms.md

## Open decisions

- TODO: price list as PDF vs plant data
- TODO: Plant Finder implementation
- TODO: contact form destination
