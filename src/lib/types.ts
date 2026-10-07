// ----- Marketing site content -----
export type ServiceCategory = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string; // lucide-react icon name
  deliverables: string[];
  outcomes: string[];
  priceFrom: number; // USD / month
  accent: "brand" | "accent";
};

export type Package = {
  id: string;
  name: string;
  audience: string;
  priceMonthly: number; // USD
  setup?: number;
  blurb: string;
  features: string[];
  popular?: boolean;
};

export type CaseResult = { label: string; value: string; delta?: string };

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  title: string;
  summary: string;
  cover: string;
  services: string[];
  duration: string;
  results: CaseResult[];
  challenge: string;
  approach: string[];
  outcome: string;
  testimonial?: string; // testimonial id
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readMins: number;
  cover: string;
  tags: string[];
  body: string[];
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  focus: string[];
  initials?: string;
};

export type ProcessStep = { step: number; title: string; description: string; icon: string };
export type FAQ = { q: string; a: string };
export type Stat = { label: string; value: string; sub?: string };

// ----- Shared enums -----
export type Channel =
  | "Instagram" | "Facebook" | "TikTok" | "Google" | "Email" | "LinkedIn" | "YouTube" | "Website";
export type CampaignStatus = "Planning" | "Active" | "Paused" | "Completed";
export type ContentType = "Reel" | "Post" | "Story" | "Carousel" | "Blog" | "Email" | "Ad" | "Video";
export type ContentStatus =
  | "Idea" | "Drafting" | "In Review" | "Approved" | "Scheduled" | "Published" | "Needs Changes";
export type LeadStage = "New" | "Contacted" | "Qualified" | "Proposal" | "Won" | "Lost";
export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue";
export type ClientStatus = "Active" | "Onboarding" | "Paused";

// ----- Portal / CRM domain -----
export type Client = {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  plan: string;
  since: string;
  status: ClientStatus;
  mrr: number; // USD
  owner: string; // team id
  tags: string[];
  health: number; // 0-100
  retainerHours: number;
  hoursUsed: number;
  accent: string; // hex for avatar tile
};

export type Campaign = {
  id: string;
  clientId: string;
  name: string;
  objective: string;
  channels: Channel[];
  status: CampaignStatus;
  start: string;
  end: string;
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roas: number;
  progress: number; // 0-100
};

export type MetricPoint = {
  label: string;
  reach: number;
  engagement: number;
  leads: number;
  spend: number;
  revenue: number;
};

export type ChannelStat = { channel: Channel; value: number; change: number };

export type ContentItem = {
  id: string;
  clientId: string;
  title: string;
  channel: Channel;
  type: ContentType;
  status: ContentStatus;
  scheduledFor: string;
  author: string;
  caption: string;
  accent: string;
};

export type Report = {
  id: string;
  clientId: string;
  title: string;
  period: string;
  type: "Monthly" | "Campaign" | "Quarterly";
  date: string;
  summary: string;
  kpis: { label: string; value: string; delta: string }[];
};

export type Invoice = {
  id: string;
  clientId: string;
  number: string;
  amount: number;
  status: InvoiceStatus;
  issued: string;
  due: string;
  items: { desc: string; qty: number; rate: number }[];
};

export type ChatMessage = { from: string; role: "client" | "team"; text: string; at: string };
export type MessageThread = {
  id: string;
  clientId: string;
  subject: string;
  unread: number;
  messages: ChatMessage[];
};

export type FileAsset = {
  id: string;
  clientId: string;
  name: string;
  kind: "Image" | "Video" | "Doc" | "PDF" | "Brand";
  size: string;
  updatedAt: string;
  by: string;
};

export type Lead = {
  id: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  source: string;
  stage: LeadStage;
  value: number; // potential MRR USD
  owner: string;
  createdAt: string;
  note: string;
};

export type Activity = {
  id: string;
  type: "content" | "campaign" | "invoice" | "lead" | "message" | "report";
  text: string;
  at: string;
  who: string;
  clientId?: string;
};
