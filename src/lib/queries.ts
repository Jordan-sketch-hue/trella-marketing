"use server";
import { db } from "./db";
import {
  clients, campaigns, contentItems, reports, invoices,
  messageThreads, chatMessages, fileAssets, leads, activities,
  metricPoints, contactSubmissions, bookingRequests,
} from "./schema";
import { eq, desc, and } from "drizzle-orm";
import type {
  Client, Campaign, ContentItem, Report, Invoice,
  MessageThread, ChatMessage, FileAsset, Lead, Activity, MetricPoint,
} from "./types";

// ── Clients ──────────────────────────────────────────────────────────────────

export async function getClients(): Promise<Client[]> {
  const rows = await db.select().from(clients).orderBy(desc(clients.createdAt));
  return rows as unknown as Client[];
}

export async function getClient(id: string): Promise<Client | null> {
  const [row] = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
  return (row as unknown as Client) ?? null;
}

export async function createClient(data: Omit<Client, "createdAt">): Promise<Client> {
  const [row] = await db.insert(clients).values(data as any).returning();
  return row as unknown as Client;
}

export async function updateClient(id: string, data: Partial<Client>): Promise<void> {
  await db.update(clients).set(data as any).where(eq(clients.id, id));
}

// ── Campaigns ─────────────────────────────────────────────────────────────────

export async function getCampaigns(clientId?: string): Promise<Campaign[]> {
  const rows = clientId
    ? await db.select().from(campaigns).where(eq(campaigns.clientId, clientId)).orderBy(desc(campaigns.createdAt))
    : await db.select().from(campaigns).orderBy(desc(campaigns.createdAt));
  return rows as unknown as Campaign[];
}

export async function createCampaign(data: Omit<Campaign, "createdAt">): Promise<Campaign> {
  const [row] = await db.insert(campaigns).values(data as any).returning();
  return row as unknown as Campaign;
}

// ── Content ───────────────────────────────────────────────────────────────────

export async function getContentItems(clientId?: string): Promise<ContentItem[]> {
  const rows = clientId
    ? await db.select().from(contentItems).where(eq(contentItems.clientId, clientId)).orderBy(desc(contentItems.createdAt))
    : await db.select().from(contentItems).orderBy(desc(contentItems.createdAt));
  return rows as unknown as ContentItem[];
}

export async function createContentItem(data: Omit<ContentItem, "createdAt">): Promise<ContentItem> {
  const [row] = await db.insert(contentItems).values(data as any).returning();
  return row as unknown as ContentItem;
}

export async function updateContentItem(id: string, data: Partial<ContentItem>): Promise<void> {
  await db.update(contentItems).set(data as any).where(eq(contentItems.id, id));
}

// ── Reports ───────────────────────────────────────────────────────────────────

export async function getReports(clientId?: string): Promise<Report[]> {
  const rows = clientId
    ? await db.select().from(reports).where(eq(reports.clientId, clientId)).orderBy(desc(reports.createdAt))
    : await db.select().from(reports).orderBy(desc(reports.createdAt));
  return rows as unknown as Report[];
}

// ── Invoices ──────────────────────────────────────────────────────────────────

export async function getInvoices(clientId?: string): Promise<Invoice[]> {
  const rows = clientId
    ? await db.select().from(invoices).where(eq(invoices.clientId, clientId)).orderBy(desc(invoices.createdAt))
    : await db.select().from(invoices).orderBy(desc(invoices.createdAt));
  return rows as unknown as Invoice[];
}

export async function createInvoice(data: Omit<Invoice, "createdAt">): Promise<Invoice> {
  const [row] = await db.insert(invoices).values(data as any).returning();
  return row as unknown as Invoice;
}

export async function updateInvoice(id: string, data: Partial<Invoice>): Promise<void> {
  await db.update(invoices).set(data as any).where(eq(invoices.id, id));
}

// ── Messages ──────────────────────────────────────────────────────────────────

export async function getThreads(clientId?: string): Promise<MessageThread[]> {
  const rows = clientId
    ? await db.select().from(messageThreads).where(eq(messageThreads.clientId, clientId)).orderBy(desc(messageThreads.updatedAt))
    : await db.select().from(messageThreads).orderBy(desc(messageThreads.updatedAt));
  return rows as unknown as MessageThread[];
}

export async function getMessages(threadId: string): Promise<ChatMessage[]> {
  const rows = await db.select().from(chatMessages).where(eq(chatMessages.threadId, threadId)).orderBy(chatMessages.createdAt);
  return rows as unknown as ChatMessage[];
}

export async function sendMessage(data: Omit<ChatMessage, "createdAt">): Promise<ChatMessage> {
  const [row] = await db.insert(chatMessages).values(data as any).returning();
  await db.update(messageThreads).set({ updatedAt: new Date() } as any).where(eq(messageThreads.id, data.threadId));
  return row as unknown as ChatMessage;
}

// ── Files ──────────────────────────────────────────────────────────────────────

export async function getFiles(clientId?: string): Promise<FileAsset[]> {
  const rows = clientId
    ? await db.select().from(fileAssets).where(eq(fileAssets.clientId, clientId)).orderBy(desc(fileAssets.createdAt))
    : await db.select().from(fileAssets).orderBy(desc(fileAssets.createdAt));
  return rows as unknown as FileAsset[];
}

// ── Leads ─────────────────────────────────────────────────────────────────────

export async function getLeads(): Promise<Lead[]> {
  const rows = await db.select().from(leads).orderBy(desc(leads.updatedAt));
  return rows as unknown as Lead[];
}

export async function createLead(data: Omit<Lead, "updatedAt">): Promise<Lead> {
  const [row] = await db.insert(leads).values(data as any).returning();
  return row as unknown as Lead;
}

export async function updateLead(id: string, data: Partial<Lead>): Promise<void> {
  await db.update(leads).set({ ...data, updatedAt: new Date() } as any).where(eq(leads.id, id));
}

// ── Activities ────────────────────────────────────────────────────────────────

export async function getActivities(clientId?: string): Promise<Activity[]> {
  const rows = clientId
    ? await db.select().from(activities).where(eq(activities.clientId, clientId)).orderBy(desc(activities.createdAt))
    : await db.select().from(activities).orderBy(desc(activities.createdAt)).limit(50);
  return rows as unknown as Activity[];
}

export async function logActivity(data: Omit<Activity, "createdAt">): Promise<void> {
  await db.insert(activities).values(data as any);
}

// ── Metrics ───────────────────────────────────────────────────────────────────

export async function getMetricPoints(clientId?: string): Promise<MetricPoint[]> {
  const rows = clientId
    ? await db.select().from(metricPoints).where(eq(metricPoints.clientId, clientId)).orderBy(metricPoints.createdAt)
    : await db.select().from(metricPoints).orderBy(metricPoints.createdAt);
  return rows as unknown as MetricPoint[];
}

// ── Forms ─────────────────────────────────────────────────────────────────────

export async function saveContactSubmission(data: {
  id: string; name: string; email: string; phone?: string;
  company?: string; service?: string; message?: string;
}) {
  await db.insert(contactSubmissions).values({
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone ?? "",
    company: data.company ?? "",
    service: data.service ?? "",
    message: data.message ?? "",
  });
}

export async function saveBookingRequest(data: {
  id: string; name: string; email: string; phone?: string;
  company?: string; service?: string; budget?: string;
  goals?: string; preferredDate?: string;
}) {
  await db.insert(bookingRequests).values({
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone ?? "",
    company: data.company ?? "",
    service: data.service ?? "",
    budget: data.budget ?? "",
    goals: data.goals ?? "",
    preferredDate: data.preferredDate ?? "",
  });
}
