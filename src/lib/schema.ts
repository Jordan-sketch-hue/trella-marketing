import {
  pgTable, text, integer, numeric, boolean, timestamp, jsonb, pgEnum,
} from "drizzle-orm/pg-core";

// ── Enums ────────────────────────────────────────────────────────────────────

export const channelEnum = pgEnum("channel", [
  "Instagram", "Facebook", "TikTok", "Google", "Email", "LinkedIn", "YouTube", "Website",
]);
export const campaignStatusEnum = pgEnum("campaign_status", [
  "Planning", "Active", "Paused", "Completed",
]);
export const contentTypeEnum = pgEnum("content_type", [
  "Reel", "Post", "Story", "Carousel", "Blog", "Email", "Ad", "Video",
]);
export const contentStatusEnum = pgEnum("content_status", [
  "Idea", "Drafting", "In Review", "Approved", "Scheduled", "Published", "Needs Changes",
]);
export const leadStageEnum = pgEnum("lead_stage", [
  "New", "Contacted", "Qualified", "Proposal", "Won", "Lost",
]);
export const invoiceStatusEnum = pgEnum("invoice_status", [
  "Draft", "Sent", "Paid", "Overdue",
]);
export const clientStatusEnum = pgEnum("client_status", [
  "Active", "Onboarding", "Paused",
]);

// ── Tables ───────────────────────────────────────────────────────────────────

export const clients = pgTable("clients", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  industry: text("industry").notNull().default(""),
  plan: text("plan").notNull().default("Starter"),
  since: text("since").notNull(),
  status: clientStatusEnum("status").notNull().default("Active"),
  mrr: integer("mrr").notNull().default(0),
  owner: text("owner").notNull().default(""),
  tags: text("tags").array().notNull().default([]),
  health: integer("health").notNull().default(100),
  retainerHours: integer("retainer_hours").notNull().default(0),
  hoursUsed: integer("hours_used").notNull().default(0),
  accent: text("accent").notNull().default("#6366f1"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const campaigns = pgTable("campaigns", {
  id: text("id").primaryKey(),
  clientId: text("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  objective: text("objective").notNull().default(""),
  channels: text("channels").array().notNull().default([]),
  status: campaignStatusEnum("status").notNull().default("Planning"),
  start: text("start").notNull(),
  end: text("end").notNull(),
  budget: integer("budget").notNull().default(0),
  spend: integer("spend").notNull().default(0),
  impressions: integer("impressions").notNull().default(0),
  clicks: integer("clicks").notNull().default(0),
  conversions: integer("conversions").notNull().default(0),
  roas: numeric("roas", { precision: 5, scale: 2 }).notNull().default("0"),
  progress: integer("progress").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contentItems = pgTable("content_items", {
  id: text("id").primaryKey(),
  clientId: text("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  channel: text("channel").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull().default("Idea"),
  scheduledFor: text("scheduled_for").notNull().default(""),
  author: text("author").notNull().default(""),
  caption: text("caption").notNull().default(""),
  accent: text("accent").notNull().default("#6366f1"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reports = pgTable("reports", {
  id: text("id").primaryKey(),
  clientId: text("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  period: text("period").notNull(),
  type: text("type").notNull().default("Monthly"),
  date: text("date").notNull(),
  summary: text("summary").notNull().default(""),
  kpis: jsonb("kpis").notNull().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const invoices = pgTable("invoices", {
  id: text("id").primaryKey(),
  clientId: text("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  number: text("number").notNull(),
  amount: integer("amount").notNull().default(0),
  status: invoiceStatusEnum("status").notNull().default("Draft"),
  issued: text("issued").notNull(),
  due: text("due").notNull(),
  items: jsonb("items").notNull().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const messageThreads = pgTable("message_threads", {
  id: text("id").primaryKey(),
  clientId: text("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  subject: text("subject").notNull(),
  unread: integer("unread").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: text("id").primaryKey(),
  threadId: text("thread_id").notNull().references(() => messageThreads.id, { onDelete: "cascade" }),
  from: text("from").notNull(),
  role: text("role").notNull().default("client"),
  text: text("text").notNull(),
  at: text("at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const fileAssets = pgTable("file_assets", {
  id: text("id").primaryKey(),
  clientId: text("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  kind: text("kind").notNull().default("Doc"),
  size: text("size").notNull().default(""),
  updatedAt: text("updated_at").notNull(),
  by: text("by").notNull().default(""),
  createdAt: timestamp("created_at").defaultNow(),
});

export const leads = pgTable("leads", {
  id: text("id").primaryKey(),
  company: text("company").notNull(),
  contact: text("contact").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  source: text("source").notNull().default("Website"),
  stage: leadStageEnum("stage").notNull().default("New"),
  value: integer("value").notNull().default(0),
  owner: text("owner").notNull().default(""),
  createdAt: text("created_at").notNull(),
  note: text("note").notNull().default(""),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const activities = pgTable("activities", {
  id: text("id").primaryKey(),
  type: text("type").notNull(),
  text: text("text").notNull(),
  at: text("at").notNull(),
  who: text("who").notNull().default(""),
  clientId: text("client_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ── Public-facing forms ───────────────────────────────────────────────────────

export const contactSubmissions = pgTable("contact_submissions", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  company: text("company").notNull().default(""),
  service: text("service").notNull().default(""),
  message: text("message").notNull().default(""),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookingRequests = pgTable("booking_requests", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  company: text("company").notNull().default(""),
  service: text("service").notNull().default(""),
  budget: text("budget").notNull().default(""),
  goals: text("goals").notNull().default(""),
  preferredDate: text("preferred_date").notNull().default(""),
  createdAt: timestamp("created_at").defaultNow(),
});

// ── Metric snapshots (time series for charts) ─────────────────────────────────

export const metricPoints = pgTable("metric_points", {
  id: text("id").primaryKey(),
  clientId: text("client_id").references(() => clients.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  reach: integer("reach").notNull().default(0),
  engagement: integer("engagement").notNull().default(0),
  leads_count: integer("leads_count").notNull().default(0),
  spend: integer("spend").notNull().default(0),
  revenue: integer("revenue").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});
