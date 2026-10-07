# Trella Marketing — Build Conventions (read before writing any page)

Next.js 16 (App Router, Turbopack) + React 19 + Tailwind v4 (CSS-first) + Recharts + lucide-react.
**Mock data only**, Supabase-ready. White-dominant UI, brand = deep ultramarine `#16019a` + red `#ed1c24`.

## Rules
- DO NOT run `npm install` or `npm run build` (a dev server may be running; the orchestrator builds at the end).
- DO NOT edit shared foundation files: `globals.css`, `layout.tsx`, anything in `src/components/`, `src/lib/`, or the route-group `layout.tsx` files. Only CREATE the page files assigned to you.
- Pages are **server components** by default. Add `"use client"` at the top ONLY when the file uses `useState`/`onClick`/other hooks. The chart components are already client — you can import them into server pages.
- Recharts: any `formatter`/`tickFormatter` must take `(v: any)` (strict TS).
- No external image URLs. Use `<CoverTile hex=... />` or gradient blocks for imagery, `<Logo/>` for the logo.
- Money is USD — format with `usd()` from `@/lib/utils`. Dates with `shortDate()`.
- Match the visual quality of `src/app/(site)/page.tsx` (the home page) — rounded-2xl cards, `border-line`, generous spacing, hover lifts, brand gradients.

## Design tokens (Tailwind utilities)
Colors: `brand`, `brand-700`, `brand-900`, `brand-bright`, `brand-soft`, `accent`, `accent-700`, `accent-soft`, `ink`, `ink-soft`, `surface`, `surface-2`, `surface-3`, `line`.
Use as `bg-brand`, `text-brand`, `border-line`, `bg-surface-2`, etc.
Custom utility classes: `container-x`, `brand-gradient`, `brand-gradient-soft`, `text-gradient`, `dot-grid`, `ring-brand`, `shadow-brand`.
Headings auto-use the display font (Sora). Body is Inter.

## Components — `@/components/ui`
- `Container` — marketing max-width wrapper (use on marketing pages; NOT in portal/admin pages, they're already padded by PortalShell).
- `Eyebrow({children, onDark?})` — uppercase label with accent dot.
- `SectionHeading({eyebrow?, title, lead?, align?: "left"|"center", onDark?})`.
- `Button({children, href?, variant?: "primary"|"accent"|"dark"|"outline"|"ghost"|"white", size?: "sm"|"md"|"lg", type?, target?})` — renders `<Link>` (internal href), `<a>` (http/mailto/tel/wa.me), or `<button>`.
- `Card({children, className})` — rounded-2xl white card with border.
- `Badge({children, tone?: "neutral"|"brand"|"accent"|"good"|"warn"|"bad"|"info"|"dark"})`.
- `IconTile({children, tone?: "brand"|"accent"|"ink"})` — colored rounded tile; put a lucide icon inside.
- `Stars({n?})`, `Stat({value,label,sub?,onDark?})`, `CoverTile({hex, label?, className?, children?})`.

## Components — others
- `@/components/Logo` → `<Logo height? variant? onDark? />`.
- `@/components/Icon` → `<Icon name="Compass" />` (maps service/process icon strings). For arbitrary icons import from `lucide-react` directly.
- `@/components/charts` (client): `AreaTrend({data,dataKey,color?,height?,money?})`, `MultiLine({data,lines:[{key,color,name}],height?})`, `Bars({data,dataKey,color?,height?,money?})`, `Donut({data:[{name,value}],height?,money?})`, `Spark({data,dataKey,color?,height?})`. Exports `BRAND, BRIGHT, ACCENT, PALETTE`.
- `@/components/PortalShell` → `StatCard({label,value,delta?,icon?(LucideIcon),tone?:"brand"|"accent"|"ink"|"good"|"warn", up?:boolean})`. (PortalShell itself is already applied by the portal/admin layouts — do not add it in pages.)

## Data — `@/lib/data`
`brand`, `heroStats`, `serviceCategories`, `processSteps`, `packages`, `team`, `caseStudies`, `testimonials`, `posts`, `faqs`, `clients`, `campaigns`, `monthlyTrend`, `channelMix`, `contentItems`, `reports`, `invoices`, `threads`, `files`, `leads`, `activities`.
Selectors: `getClient(id)`, `clientCampaigns(id)`, `clientContent(id)`, `clientReports(id)`, `clientInvoices(id)`, `clientFiles(id)`, `clientThreads(id)`, `teamMember(id)`, `getCaseStudy(slug)`, `getService(slug)`, `getPost(slug)`, `getTestimonial(id)`.
`PORTAL_CLIENT_ID = "blue-mahoe"` — the client "logged in" to the portal. Build portal pages around this client's data.
Types in `@/lib/types`.

## Utils — `@/lib/utils`
`cn`, `usd(n)`, `jmd(n)`, `compact(n)`, `pct(n)`, `shortDate(d)`, `relTime(d)`, `initials(name)`.

## Dynamic routes
For `[slug]`/`[id]` pages export `generateStaticParams()` returning the ids/slugs from data, and read params via `const { slug } = await params;` (params is a Promise in Next 16). Call `notFound()` from `next/navigation` if missing.
