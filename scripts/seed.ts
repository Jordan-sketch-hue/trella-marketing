/**
 * scripts/seed.ts
 * Seed the Neon DB with mock data from src/lib/data.ts
 * Run with: tsx scripts/seed.ts
 */
import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/lib/schema";
import {
  clients as clientsData,
  campaigns as campaignsData,
  contentItems as contentItemsData,
  reports as reportsData,
  invoices as invoicesData,
  threads as threadsData,
  files as filesData,
  leads as leadsData,
  activities as activitiesData,
  monthlyTrend,
} from "../src/lib/data";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  console.log("🌱 Seeding database…");

  // Clients
  console.log("  → clients");
  for (const c of clientsData) {
    await db.insert(schema.clients).values({
      id: c.id,
      name: c.name,
      contactName: c.contactName,
      email: c.email,
      phone: c.phone,
      industry: c.industry,
      plan: c.plan,
      since: c.since,
      status: c.status as any,
      mrr: c.mrr,
      owner: c.owner,
      tags: c.tags,
      health: c.health,
      retainerHours: c.retainerHours,
      hoursUsed: c.hoursUsed,
      accent: c.accent,
    }).onConflictDoNothing();
  }

  // Campaigns
  console.log("  → campaigns");
  for (const c of campaignsData) {
    await db.insert(schema.campaigns).values({
      id: c.id,
      clientId: c.clientId,
      name: c.name,
      objective: c.objective,
      channels: c.channels,
      status: c.status as any,
      start: c.start,
      end: c.end,
      budget: c.budget,
      spend: c.spend,
      impressions: c.impressions,
      clicks: c.clicks,
      conversions: c.conversions,
      roas: String(c.roas),
      progress: c.progress,
    }).onConflictDoNothing();
  }

  // Content items
  console.log("  → content items");
  for (const c of contentItemsData) {
    await db.insert(schema.contentItems).values({
      id: c.id,
      clientId: c.clientId,
      title: c.title,
      channel: c.channel,
      type: c.type,
      status: c.status,
      scheduledFor: c.scheduledFor,
      author: c.author,
      caption: c.caption,
      accent: c.accent,
    }).onConflictDoNothing();
  }

  // Reports
  console.log("  → reports");
  for (const r of reportsData) {
    await db.insert(schema.reports).values({
      id: r.id,
      clientId: r.clientId,
      title: r.title,
      period: r.period,
      type: r.type,
      date: r.date,
      summary: r.summary,
      kpis: r.kpis as any,
    }).onConflictDoNothing();
  }

  // Invoices
  console.log("  → invoices");
  for (const inv of invoicesData) {
    await db.insert(schema.invoices).values({
      id: inv.id,
      clientId: inv.clientId,
      number: inv.number,
      amount: inv.amount,
      status: inv.status as any,
      issued: inv.issued,
      due: inv.due,
      items: inv.items as any,
    }).onConflictDoNothing();
  }

  // Message threads + messages
  console.log("  → message threads & messages");
  for (const t of threadsData) {
    await db.insert(schema.messageThreads).values({
      id: t.id,
      clientId: t.clientId,
      subject: t.subject,
      unread: t.unread,
    }).onConflictDoNothing();

    for (let i = 0; i < t.messages.length; i++) {
      const m = t.messages[i];
      await db.insert(schema.chatMessages).values({
        id: `${t.id}-msg-${i}`,
        threadId: t.id,
        from: m.from,
        role: m.role,
        text: m.text,
        at: m.at,
      }).onConflictDoNothing();
    }
  }

  // File assets
  console.log("  → file assets");
  for (const f of filesData) {
    await db.insert(schema.fileAssets).values({
      id: f.id,
      clientId: f.clientId,
      name: f.name,
      kind: f.kind,
      size: f.size,
      updatedAt: f.updatedAt,
      by: f.by,
    }).onConflictDoNothing();
  }

  // Leads
  console.log("  → leads");
  for (const l of leadsData) {
    await db.insert(schema.leads).values({
      id: l.id,
      company: l.company,
      contact: l.contact,
      email: l.email,
      phone: l.phone,
      source: l.source,
      stage: l.stage as any,
      value: l.value,
      owner: l.owner,
      createdAt: l.createdAt,
      note: l.note,
    }).onConflictDoNothing();
  }

  // Activities
  console.log("  → activities");
  for (const a of activitiesData) {
    await db.insert(schema.activities).values({
      id: a.id,
      type: a.type,
      text: a.text,
      at: a.at,
      who: a.who,
      clientId: a.clientId ?? null,
    }).onConflictDoNothing();
  }

  // Monthly trend (agency-wide metric points, no clientId)
  console.log("  → metric points (monthly trend)");
  for (let i = 0; i < monthlyTrend.length; i++) {
    const m = monthlyTrend[i];
    await db.insert(schema.metricPoints).values({
      id: `trend-${i}-${m.label}`,
      clientId: null,
      label: m.label,
      reach: m.reach,
      engagement: m.engagement,
      leads_count: m.leads,
      spend: m.spend,
      revenue: m.revenue,
    }).onConflictDoNothing();
  }

  console.log("✅ Seed complete.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
