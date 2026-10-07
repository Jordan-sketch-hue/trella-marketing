# Trella Marketing Consultant — Web Platform

Full-stack marketing-consultancy platform: public marketing site + client portal + team admin/CRM.
Companion native app lives in `../trella-marketing-mobile`.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 (CSS-first) · Recharts · lucide-react · TypeScript.
**Data:** typed mock-data layer (`src/lib/data.ts`) — **Supabase-ready**, no backend wired yet.
**Brand:** ultramarine `#16019A` + red `#ED1C24` (sampled from the real logo) · Sora + Inter. See `BRAND.md`.

## Run

```bash
npm install      # already installed
npm run dev      # http://localhost:3000
npm run build    # production build (61 routes, all green)
```

## Structure

```
src/
  app/
    (site)/        Marketing — Home, Services(+[slug]), Work(+[slug]),
                   About, Pricing, Insights(+[slug]), Contact, Book, Brand, Privacy, Terms
    portal/        Client Portal (logged-in client = Blue Mahoe Bistro)
                   Dashboard, Campaigns(+[id]), Content, Reports, Invoices, Messages, Files, Settings
    admin/         Team Admin / CRM
                   Dashboard, Clients(+[id]), Leads, Campaigns, Content, Reports,
                   Invoices, Analytics, Team, Settings
  components/      Logo, ui (Button/Card/Badge/StatCard/…), charts (Recharts wrappers),
                   PortalShell, SiteHeader, SiteFooter, Icon
  lib/             data.ts (mock data + selectors), types.ts, utils.ts
public/            logo.png, logo-transparent.png, monogram(+-transparent).png, logo.jpg
```

Route groups: `(site)` gets the marketing header/footer; `portal/` and `admin/` get the collapsible
`PortalShell` (sidebar persists via `localStorage`). The three tiers are linked from the footer and header.

## Notes / conventions
- **Server vs client boundary:** `StatCard` lives in `components/ui.tsx` (server-safe) so server pages can
  pass it lucide icons. The `portal` + `admin` layouts are `"use client"` because they pass icon components
  into the client `PortalShell`.
- Recharts formatters use `(v: any)` (strict TS). Base CSS resets are wrapped in `@layer base`.
- Imagery uses on-brand gradient `CoverTile`s (no external image URLs) so nothing breaks.
- Deploy target: Vercel (`vercel --prod`). Wire Supabase + auth (Clerk or Supabase Auth) for real data.
