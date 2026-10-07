import type {
  ServiceCategory, Package, CaseStudy, Testimonial, Post, TeamMember, ProcessStep, FAQ, Stat,
  Client, Campaign, MetricPoint, ChannelStat, ContentItem, Report, Invoice, MessageThread,
  FileAsset, Lead, Activity,
} from "./types";

export const brand = {
  name: "Trella Marketing Consultant",
  short: "Trella",
  tagline: "Marketing that moves the needle.",
  promise: "Strategy, storytelling, and data — working together to grow your brand.",
  phone: "+1 (876) 555-8723",
  whatsapp: "18765558723",
  email: "hello@trellamarketing.com",
  bookingEmail: "book@trellamarketing.com",
  address: "Shop 7, Dominica Drive, New Kingston, Kingston 5, Jamaica",
  hours: "Mon–Fri 9:00am–5:30pm",
  socials: {
    instagram: "https://www.instagram.com/trellamarketingconsultant/",
    facebook: "https://facebook.com/trellamarketingconsultant",
    linkedin: "https://linkedin.com/company/trellamarketing",
    tiktok: "https://tiktok.com/@trellamarketing",
  },
};

export const heroStats: Stat[] = [
  { label: "Brands grown", value: "60+", sub: "across the Caribbean" },
  { label: "Avg. return on ad spend", value: "4.8x", sub: "client portfolio" },
  { label: "Content shipped / month", value: "320+", sub: "posts, reels & ads" },
  { label: "Client retention", value: "94%", sub: "year over year" },
];

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "brand-strategy",
    title: "Brand Strategy & Identity",
    tagline: "Get clear, get consistent, get remembered.",
    description:
      "We define who you are, who you serve, and why you win — then translate it into a visual identity and messaging system your whole team can run with.",
    icon: "Compass",
    deliverables: ["Brand positioning & messaging", "Logo & visual identity", "Tone of voice guide", "Competitor & market audit"],
    outcomes: ["A brand that stands out", "Consistent presence everywhere", "Higher perceived value"],
    priceFrom: 600,
    accent: "brand",
  },
  {
    slug: "social-media",
    title: "Social Media Management",
    tagline: "Show up daily — without burning out.",
    description:
      "Done-for-you content calendars, community management, and platform-native creative that keeps your audience engaged and growing month over month.",
    icon: "Share2",
    deliverables: ["Monthly content calendar", "Reels, posts & stories", "Community management", "Hashtag & growth strategy"],
    outcomes: ["Steady follower growth", "More saves, shares & DMs", "Always-on presence"],
    priceFrom: 850,
    accent: "accent",
  },
  {
    slug: "paid-advertising",
    title: "Paid Advertising",
    tagline: "Put money in, get customers out.",
    description:
      "Meta, Google, and TikTok ad campaigns built around your numbers — tight targeting, creative testing, and weekly optimisation toward real ROAS.",
    icon: "Target",
    deliverables: ["Campaign strategy & setup", "Creative & copy testing", "Audience & retargeting", "Weekly optimisation"],
    outcomes: ["Lower cost per lead", "Predictable pipeline", "Scalable spend"],
    priceFrom: 700,
    accent: "brand",
  },
  {
    slug: "content-creative",
    title: "Content & Creative",
    tagline: "Scroll-stopping work that sounds like you.",
    description:
      "Photo, video, graphic design, and copywriting produced on a repeatable system — so you always have fresh, on-brand assets ready to publish.",
    icon: "PenTool",
    deliverables: ["Photo & video shoots", "Graphic design", "Copywriting", "Short-form video editing"],
    outcomes: ["A full content library", "Higher engagement", "Faster publishing"],
    priceFrom: 550,
    accent: "accent",
  },
  {
    slug: "web-seo",
    title: "Website & SEO",
    tagline: "A home base that ranks and converts.",
    description:
      "Fast, mobile-first websites and search optimisation that turn visitors into enquiries — and get you found when customers are looking.",
    icon: "Globe",
    deliverables: ["Website design & build", "Landing pages", "Technical & local SEO", "Conversion tracking"],
    outcomes: ["More organic traffic", "Higher conversion rate", "Found on Google Maps"],
    priceFrom: 900,
    accent: "brand",
  },
  {
    slug: "analytics-growth",
    title: "Analytics & Growth",
    tagline: "Decisions backed by numbers, not vibes.",
    description:
      "Dashboards, monthly reporting, and growth consulting that connect every dollar to a result — so you always know what's working and what's next.",
    icon: "BarChart3",
    deliverables: ["Custom dashboards", "Monthly performance reports", "Funnel & attribution", "Growth roadmap"],
    outcomes: ["Total clarity on ROI", "Smarter budget allocation", "Compounding growth"],
    priceFrom: 500,
    accent: "accent",
  },
];

export const processSteps: ProcessStep[] = [
  { step: 1, title: "Discover", description: "We audit your brand, market, and metrics to find the real levers for growth.", icon: "Search" },
  { step: 2, title: "Strategise", description: "A clear, written game plan — channels, messages, budget, and targets.", icon: "Map" },
  { step: 3, title: "Create", description: "On-brand content and campaigns built to stop the scroll and drive action.", icon: "Sparkles" },
  { step: 4, title: "Launch", description: "We ship, manage the community, and keep your presence consistent.", icon: "Rocket" },
  { step: 5, title: "Optimise", description: "Weekly tuning and monthly reporting so results compound over time.", icon: "TrendingUp" },
];

export const packages: Package[] = [
  {
    id: "launchpad",
    name: "Launchpad",
    audience: "Solo founders & new brands finding their feet.",
    priceMonthly: 850,
    setup: 350,
    blurb: "Get a consistent, professional presence on the platforms that matter most.",
    features: [
      "1 platform managed (IG or FB)",
      "12 posts + 8 stories / month",
      "Monthly content calendar",
      "Community management",
      "Monthly performance snapshot",
      "Client portal access",
    ],
  },
  {
    id: "momentum",
    name: "Momentum",
    audience: "Growing businesses ready to scale demand.",
    priceMonthly: 1950,
    setup: 500,
    blurb: "A full content engine plus paid ads to turn attention into pipeline.",
    features: [
      "2 platforms managed",
      "20 posts + reels + stories / month",
      "Paid ads management (up to $1.5k spend)",
      "1 photo/video shoot / month",
      "Email newsletter (2 / month)",
      "Bi-weekly reporting + strategy call",
    ],
    popular: true,
  },
  {
    id: "authority",
    name: "Authority",
    audience: "Established brands going for market leadership.",
    priceMonthly: 3800,
    setup: 0,
    blurb: "An embedded marketing department — strategy, creative, ads, and analytics.",
    features: [
      "3+ platforms + website & SEO",
      "Unlimited content within scope",
      "Full-funnel paid media",
      "2 shoots / month + creative direction",
      "Custom analytics dashboard",
      "Weekly strategy + dedicated manager",
    ],
  },
];

export const team: TeamMember[] = [
  { id: "tanya", name: "Tanya Reid", role: "Founder & Lead Strategist", initials: "TR", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&q=80",
    bio: "15 years building Caribbean brands. Tanya pairs sharp positioning with a relentless focus on the numbers.",
    focus: ["Brand strategy", "Growth", "Client partnership"] },
  { id: "amalia", name: "Amalia Brown", role: "Social Media Lead", initials: "AB", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&q=80",
    bio: "Lives in the trends. Amalia turns brands into communities people actually want to follow.",
    focus: ["Social strategy", "Community", "Trends"] },
  { id: "devon", name: "Devon Clarke", role: "Paid Media Manager", initials: "DC", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&q=80",
    bio: "Spreadsheet whisperer. Devon makes ad budgets work harder with relentless testing.",
    focus: ["Meta & Google ads", "Optimisation", "Attribution"] },
  { id: "keisha", name: "Keisha Powell", role: "Content & Creative Director", initials: "KP", photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop&q=80",
    bio: "Director's eye, marketer's brain. Keisha leads shoots and design that look the part and perform.",
    focus: ["Creative direction", "Video", "Design"] },
  { id: "marcus", name: "Marcus Lewis", role: "Web & Analytics", initials: "ML", photo: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=300&h=300&fit=crop&q=80",
    bio: "Builds the websites and the dashboards behind them so every click is accounted for.",
    focus: ["Web build", "SEO", "Analytics"] },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "blue-mahoe-bistro",
    client: "Blue Mahoe Bistro",
    industry: "Restaurant",
    title: "From quiet weeknights to a 6-week waitlist",
    summary: "A social-first content engine and local paid ads filled tables midweek and built a reservation waitlist.",
    cover: "#16019a",
    cover_img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop&q=80",
    services: ["Social Media Management", "Paid Advertising", "Content & Creative"],
    duration: "8 months",
    results: [
      { label: "Reservations / week", value: "+212%", delta: "up" },
      { label: "Instagram followers", value: "9.4K", delta: "+6.1K" },
      { label: "Cost per reservation", value: "$1.90", delta: "down" },
    ],
    challenge: "Great food, empty weeknights, and a feed that hadn't been touched in months. The owners were posting at random with no plan and no results.",
    approach: [
      "Rebuilt the content pillars around the chef, the dishes, and the vibe.",
      "Filmed a monthly batch of reels and behind-the-scenes content.",
      "Ran always-on local awareness + reservation ads within a 5km radius.",
      "Introduced a midweek offer promoted only to engaged followers.",
    ],
    outcome: "Within two months weeknight covers doubled. By month eight the bistro was running a reservation waitlist and opened a second service.",
    testimonial: "t-blue-mahoe",
  },
  {
    slug: "caribbean-coast-realty",
    client: "Caribbean Coast Realty",
    industry: "Real Estate",
    title: "Turning listings into a lead machine",
    summary: "A new website, listing funnels, and lead ads delivered a steady pipeline of qualified buyers.",
    cover: "#0a2a6b",
    cover_img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop&q=80",
    services: ["Website & SEO", "Paid Advertising", "Analytics & Growth"],
    duration: "10 months",
    results: [
      { label: "Qualified leads / month", value: "x4", delta: "up" },
      { label: "Cost per lead", value: "-58%", delta: "down" },
      { label: "Organic traffic", value: "+170%", delta: "up" },
    ],
    challenge: "Listings lived on a slow site nobody could find, and leads came only from word of mouth.",
    approach: [
      "Built a fast, search-optimised listings website with enquiry tracking.",
      "Created neighbourhood landing pages targeting buyer searches.",
      "Launched lead-gen ads with instant-response automation.",
      "Set up a dashboard tying every lead back to source.",
    ],
    outcome: "Qualified enquiries quadrupled and the team finally knew which channels drove closings.",
    testimonial: "t-coast",
  },
  {
    slug: "irie-threads",
    client: "Irie Threads",
    industry: "Fashion & Retail",
    title: "A drop strategy that sells out in 48 hours",
    summary: "We turned a boutique into a hype brand with a content + email + paid drop playbook.",
    cover: "#ed1c24",
    cover_img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=500&fit=crop&q=80",
    services: ["Content & Creative", "Email & CRM", "Paid Advertising"],
    duration: "6 months",
    results: [
      { label: "Drop sell-through", value: "100%", delta: "in 48h" },
      { label: "Email revenue share", value: "31%", delta: "up" },
      { label: "Return customers", value: "+44%", delta: "up" },
    ],
    challenge: "Beautiful product, inconsistent sales, and an email list that was never used.",
    approach: [
      "Designed a recurring 'drop' calendar with teaser content.",
      "Built automated email flows for launches and abandoned carts.",
      "Shot lookbook content optimised for reels and ads.",
      "Retargeted engaged shoppers in the 72 hours around each drop.",
    ],
    outcome: "Drops now sell out predictably and email became the single most profitable channel.",
    testimonial: "t-irie",
  },
  {
    slug: "fityard-kingston",
    client: "FitYard Kingston",
    industry: "Fitness",
    title: "Filling classes with a referral-fuelled funnel",
    summary: "A challenge campaign plus member content cut acquisition cost and kept classes full.",
    cover: "#1f0a6b",
    cover_img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop&q=80",
    services: ["Social Media Management", "Paid Advertising"],
    duration: "5 months",
    results: [
      { label: "New members / month", value: "+86%", delta: "up" },
      { label: "Cost per trial", value: "$4.20", delta: "down" },
      { label: "Class attendance", value: "92%", delta: "up" },
    ],
    challenge: "A packed schedule of half-empty classes and ad spend with nothing to show for it.",
    approach: [
      "Launched a 21-day challenge as the lead magnet.",
      "Used member transformation content as social proof.",
      "Built a simple trial-to-membership ad funnel.",
    ],
    outcome: "The challenge funnel became an evergreen acquisition channel the gym runs every quarter.",
    testimonial: "t-fityard",
  },
  {
    slug: "paylink-jamaica",
    client: "PayLink Jamaica",
    industry: "Fintech",
    title: "Building trust for a new payments brand",
    summary: "Positioning, education content, and LinkedIn presence established PayLink as a credible name.",
    cover: "#08013f",
    services: ["Brand Strategy & Identity", "Content & Creative", "Analytics & Growth"],
    duration: "12 months",
    results: [
      { label: "Merchant sign-ups", value: "+3.1K", delta: "up" },
      { label: "Brand search volume", value: "x7", delta: "up" },
      { label: "Demo requests", value: "+128%", delta: "up" },
    ],
    challenge: "A new fintech in a trust-sensitive category with zero brand recognition.",
    approach: [
      "Defined positioning around security and simplicity.",
      "Produced explainer content and customer stories.",
      "Built a thought-leadership presence for the founders.",
    ],
    outcome: "PayLink went from unknown to a recognised name with a steady inbound merchant pipeline.",
    testimonial: "t-paylink",
  },
  {
    slug: "dunns-river-tours",
    client: "Dunn's River Tours",
    industry: "Tourism",
    title: "Direct bookings that beat the OTAs",
    summary: "A booking-optimised site and seasonal campaigns shifted revenue away from commission platforms.",
    cover: "#0a4d5c",
    cover_img: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&h=500&fit=crop&q=80",
    services: ["Website & SEO", "Paid Advertising", "Email & CRM"],
    duration: "9 months",
    results: [
      { label: "Direct bookings", value: "+147%", delta: "up" },
      { label: "OTA commission saved", value: "$38K", delta: "down" },
      { label: "Repeat guests", value: "+29%", delta: "up" },
    ],
    challenge: "Heavy reliance on online travel agencies eating 20%+ in commissions.",
    approach: [
      "Rebuilt the site around direct booking with seasonal offers.",
      "Ran geo-targeted campaigns to inbound travellers.",
      "Captured guest emails for re-marketing and reviews.",
    ],
    outcome: "Direct bookings more than doubled, clawing back margin from the OTAs.",
    testimonial: "t-dunns",
  },
];

export const testimonials: Testimonial[] = [
  { id: "t-blue-mahoe", name: "Andre Campbell", role: "Owner", company: "Blue Mahoe Bistro", rating: 5,
    quote: "Trella turned our Instagram into our busiest host. We went from chasing customers to managing a waitlist." },
  { id: "t-coast", name: "Sophia Bennett", role: "Principal", company: "Caribbean Coast Realty", rating: 5,
    quote: "For the first time I know exactly where every lead comes from — and there are a lot more of them." },
  { id: "t-irie", name: "Renee Walters", role: "Founder", company: "Irie Threads", rating: 5,
    quote: "Our drops sell out now. The email and content system they built basically prints money." },
  { id: "t-fityard", name: "Dwayne Foster", role: "Co-owner", company: "FitYard Kingston", rating: 5,
    quote: "Classes are full and our cost per new member is the lowest it's ever been. These guys get results." },
  { id: "t-paylink", name: "Marsha Lyn", role: "Head of Growth", company: "PayLink Jamaica", rating: 5,
    quote: "They built our brand voice from scratch and made a young fintech feel trustworthy and established." },
  { id: "t-dunns", name: "Karl Service", role: "Director", company: "Dunn's River Tours", rating: 5,
    quote: "Direct bookings doubled and we're finally not handing over a fifth of every sale to the platforms." },
];

export const posts: Post[] = [
  {
    slug: "content-pillars-that-actually-work",
    title: "The 4 content pillars every small brand should be posting",
    excerpt: "Stop posting randomly. A simple pillar system keeps your feed consistent and your audience engaged.",
    category: "Social Media",
    author: "Amalia Brown",
    date: "2026-05-18",
    readMins: 6,
    cover: "#16019a",
    tags: ["Social", "Content", "Strategy"],
    body: [
      "Most small businesses post when they remember to — a photo here, a promo there. The result is a feed that feels random and an audience that never knows what to expect.",
      "Content pillars fix this. A pillar is a recurring theme you post about consistently. Four is the sweet spot: enough variety to stay interesting, few enough to stay focused.",
      "Start with these: Educate (teach something useful), Showcase (your product or work), Connect (the people and story behind the brand), and Convert (offers and calls to action). Aim for a rough 40/30/20/10 split.",
      "The magic isn't any single post — it's the consistency. When you show up with the same themes every week, your audience learns what you stand for, and the algorithm rewards the regularity.",
    ],
  },
  {
    slug: "roas-explained",
    title: "ROAS explained: the only ad metric most owners need",
    excerpt: "Return on ad spend tells you if your ads make money. Here's how to read it without an MBA.",
    category: "Paid Ads",
    author: "Devon Clarke",
    date: "2026-05-09",
    readMins: 5,
    cover: "#ed1c24",
    tags: ["Paid Ads", "Analytics"],
    body: [
      "ROAS — return on ad spend — is simply revenue divided by ad spend. Spend $100, make $400, and your ROAS is 4x.",
      "It's the fastest gut-check for whether a campaign is working. But context matters: a 2x ROAS can be great for a high-margin service and terrible for a low-margin product.",
      "Know your break-even ROAS first. If your margins mean you need 2.5x just to break even, then a 3x campaign is profitable and a 2x campaign is quietly losing money.",
      "Track it weekly, not daily — ad platforms need data to optimise, and daily swings will drive you mad.",
    ],
  },
  {
    slug: "brand-before-tactics",
    title: "Why brand comes before tactics (every time)",
    excerpt: "Running ads without a clear brand is like pouring water into a leaky bucket. Fix the bucket first.",
    category: "Brand",
    author: "Tanya Reid",
    date: "2026-04-27",
    readMins: 7,
    cover: "#08013f",
    tags: ["Brand", "Strategy"],
    body: [
      "Everyone wants the tactic — the viral reel, the winning ad, the growth hack. But tactics amplify whatever they point at. Point them at a confused brand and you just confuse people faster.",
      "Brand is the answer to three questions: who are you for, what do you stand for, and why should anyone choose you? Get those clear and every tactic gets easier.",
      "We always start engagements with positioning. It's not glamorous, but it's the multiplier that makes the social, the ads, and the content all pull in the same direction.",
    ],
  },
  {
    slug: "email-is-not-dead",
    title: "Email isn't dead — it's your most profitable channel",
    excerpt: "Social platforms rent you an audience. Email is the one you own. Here's how to use it.",
    category: "Email",
    author: "Keisha Powell",
    date: "2026-04-14",
    readMins: 6,
    cover: "#1f0a6b",
    tags: ["Email", "CRM", "Retention"],
    body: [
      "On social media, you're renting access to your audience — the algorithm decides who sees you. Email is the audience you actually own.",
      "Three automated flows do most of the work: a welcome series, an abandoned-cart series, and a post-purchase series. Set them up once and they earn quietly forever.",
      "For our retail clients, email regularly drives 25–35% of revenue from a list a fraction the size of their social following.",
    ],
  },
  {
    slug: "local-seo-checklist",
    title: "The local SEO checklist for Jamaican businesses",
    excerpt: "Want to show up on Google Maps when customers search nearby? Start with these fundamentals.",
    category: "SEO",
    author: "Marcus Lewis",
    date: "2026-03-30",
    readMins: 8,
    cover: "#0a4d5c",
    tags: ["SEO", "Local", "Web"],
    body: [
      "When someone searches 'restaurant near me' or 'plumber in Kingston', Google leans heavily on local signals. Getting these right is the highest-ROI SEO work most local businesses can do.",
      "Claim and complete your Google Business Profile — accurate hours, categories, photos, and a steady stream of reviews.",
      "Make sure your name, address, and phone number are identical everywhere online. Inconsistency confuses Google and costs you ranking.",
      "Build a few location-specific pages on your site and earn reviews consistently. Local SEO rewards momentum.",
    ],
  },
  {
    slug: "measuring-what-matters",
    title: "Vanity metrics vs. metrics that matter",
    excerpt: "Followers feel good. Revenue pays bills. Here's how to tell the difference and report on what counts.",
    category: "Analytics",
    author: "Tanya Reid",
    date: "2026-03-12",
    readMins: 5,
    cover: "#2e1fe0",
    tags: ["Analytics", "Strategy"],
    body: [
      "Likes and followers are easy to celebrate and easy to fake. They're a starting point, not a destination.",
      "Tie every activity to a business outcome: leads, bookings, sales, revenue. If a metric doesn't ladder up to one of those, it's a vanity metric.",
      "Our monthly reports always lead with outcomes, then show the engagement metrics that explain them. That order keeps everyone focused on what actually matters.",
    ],
  },
];

export const faqs: FAQ[] = [
  { q: "Do I have to sign a long contract?", a: "No. We work on rolling monthly agreements with a 30-day notice period. We'd rather earn your business every month than lock you in." },
  { q: "What's the difference between you and hiring in-house?", a: "You get a full team — strategist, social lead, paid media manager, creative, and analytics — for less than the cost of one mid-level hire, with no recruitment or training overhead." },
  { q: "How quickly will I see results?", a: "Foundational work (brand, setup, content systems) lands in the first 30 days. Paid campaigns usually show early signal within 2–4 weeks, with meaningful momentum by month three." },
  { q: "Do you work with businesses outside Jamaica?", a: "Yes. We're based in Kingston and work with brands across the Caribbean and the diaspora. Everything is managed through your client portal." },
  { q: "Who owns the content and accounts?", a: "You do — always. We work inside your accounts and hand over every asset we create. Nothing is held hostage." },
  { q: "Is ad spend included in your fees?", a: "No. Our management fee is separate from the money you put toward ads, which goes directly to the platforms. We help you set a budget that fits your goals." },
  { q: "Can I start with just one service?", a: "Absolutely. Many clients start with social or a website and expand once they see the results. Our packages are a starting point, not a cage." },
  { q: "How do we communicate?", a: "Through your client portal for approvals, files, and reports, plus a regular strategy call. You'll always have a dedicated account manager." },
];

// ----------------- CRM / PORTAL DATA -----------------

export const clients: Client[] = [
  { id: "blue-mahoe", name: "Blue Mahoe Bistro", contactName: "Andre Campbell", email: "andre@bluemahoe.jm", phone: "+1 (876) 555-0142", industry: "Restaurant", plan: "Momentum", since: "2025-09-01", status: "Active", mrr: 1950, owner: "amalia", tags: ["Social", "Ads", "Content"], health: 92, retainerHours: 40, hoursUsed: 28, accent: "#16019a" },
  { id: "coast-realty", name: "Caribbean Coast Realty", contactName: "Sophia Bennett", email: "sophia@coastrealty.jm", phone: "+1 (876) 555-0188", industry: "Real Estate", plan: "Authority", since: "2025-06-15", status: "Active", mrr: 3800, owner: "marcus", tags: ["Web", "Ads", "SEO"], health: 88, retainerHours: 80, hoursUsed: 61, accent: "#0a2a6b" },
  { id: "irie-threads", name: "Irie Threads", contactName: "Renee Walters", email: "renee@iriethreads.com", phone: "+1 (876) 555-0119", industry: "Fashion & Retail", plan: "Momentum", since: "2025-11-20", status: "Active", mrr: 1950, owner: "keisha", tags: ["Content", "Email", "Ads"], health: 95, retainerHours: 40, hoursUsed: 33, accent: "#ed1c24" },
  { id: "fityard", name: "FitYard Kingston", contactName: "Dwayne Foster", email: "dwayne@fityard.jm", phone: "+1 (876) 555-0173", industry: "Fitness", plan: "Launchpad", since: "2026-01-10", status: "Active", mrr: 850, owner: "amalia", tags: ["Social", "Ads"], health: 79, retainerHours: 20, hoursUsed: 17, accent: "#1f0a6b" },
  { id: "paylink", name: "PayLink Jamaica", contactName: "Marsha Lyn", email: "marsha@paylink.jm", phone: "+1 (876) 555-0204", industry: "Fintech", plan: "Authority", since: "2025-03-01", status: "Active", mrr: 3800, owner: "tanya", tags: ["Brand", "Content", "Analytics"], health: 90, retainerHours: 80, hoursUsed: 70, accent: "#08013f" },
  { id: "dunns-river", name: "Dunn's River Tours", contactName: "Karl Service", email: "karl@dunnsrivertours.com", phone: "+1 (876) 555-0166", industry: "Tourism", plan: "Momentum", since: "2025-08-05", status: "Active", mrr: 1950, owner: "devon", tags: ["Web", "Ads", "Email"], health: 84, retainerHours: 40, hoursUsed: 22, accent: "#0a4d5c" },
  { id: "sunbeam-solar", name: "Sunbeam Solar JA", contactName: "Patrick Hines", email: "patrick@sunbeamsolar.jm", phone: "+1 (876) 555-0150", industry: "Home & Energy", plan: "Momentum", since: "2026-04-22", status: "Onboarding", mrr: 1950, owner: "devon", tags: ["Ads", "Web"], health: 70, retainerHours: 40, hoursUsed: 6, accent: "#b8860b" },
  { id: "harbour-dental", name: "Harbour View Dental", contactName: "Dr. Lisa Chong", email: "lisa@harbourdental.jm", phone: "+1 (876) 555-0137", industry: "Healthcare", plan: "Launchpad", since: "2025-12-01", status: "Paused", mrr: 0, owner: "amalia", tags: ["Social"], health: 58, retainerHours: 20, hoursUsed: 0, accent: "#0a6b5c" },
];

export const campaigns: Campaign[] = [
  { id: "cmp-1", clientId: "blue-mahoe", name: "Midweek Tables Push", objective: "Reservations", channels: ["Instagram", "Facebook"], status: "Active", start: "2026-05-01", end: "2026-06-30", budget: 1500, spend: 980, impressions: 142000, clicks: 5400, conversions: 312, roas: 5.4, progress: 64 },
  { id: "cmp-2", clientId: "blue-mahoe", name: "Sunday Brunch Launch", objective: "Awareness", channels: ["Instagram", "TikTok"], status: "Planning", start: "2026-06-10", end: "2026-07-10", budget: 900, spend: 0, impressions: 0, clicks: 0, conversions: 0, roas: 0, progress: 8 },
  { id: "cmp-3", clientId: "coast-realty", name: "Ocho Rios Listings", objective: "Lead Gen", channels: ["Google", "Facebook"], status: "Active", start: "2026-04-15", end: "2026-07-15", budget: 6000, spend: 4120, impressions: 388000, clicks: 12900, conversions: 214, roas: 6.8, progress: 71 },
  { id: "cmp-4", clientId: "irie-threads", name: "Summer Drop 03", objective: "Sales", channels: ["Instagram", "Email"], status: "Active", start: "2026-05-20", end: "2026-06-05", budget: 2200, spend: 1340, impressions: 96000, clicks: 7100, conversions: 540, roas: 7.9, progress: 55 },
  { id: "cmp-5", clientId: "fityard", name: "21-Day Challenge", objective: "Trials", channels: ["Instagram", "Facebook"], status: "Active", start: "2026-05-05", end: "2026-06-05", budget: 1200, spend: 870, impressions: 78000, clicks: 4300, conversions: 186, roas: 4.1, progress: 78 },
  { id: "cmp-6", clientId: "paylink", name: "Merchant Trust Series", objective: "Demo Requests", channels: ["LinkedIn", "Google"], status: "Active", start: "2026-03-01", end: "2026-08-31", budget: 9000, spend: 5600, impressions: 512000, clicks: 9800, conversions: 410, roas: 3.6, progress: 62 },
  { id: "cmp-7", clientId: "dunns-river", name: "Summer Direct Bookings", objective: "Bookings", channels: ["Google", "Facebook", "Email"], status: "Active", start: "2026-05-01", end: "2026-08-15", budget: 4500, spend: 1980, impressions: 233000, clicks: 8800, conversions: 268, roas: 6.1, progress: 44 },
  { id: "cmp-8", clientId: "irie-threads", name: "Spring Clearance", objective: "Sales", channels: ["Instagram", "Facebook"], status: "Completed", start: "2026-03-15", end: "2026-04-15", budget: 1800, spend: 1800, impressions: 154000, clicks: 9600, conversions: 720, roas: 6.5, progress: 100 },
  { id: "cmp-9", clientId: "sunbeam-solar", name: "Cut Your Light Bill", objective: "Lead Gen", channels: ["Facebook", "Google"], status: "Planning", start: "2026-06-01", end: "2026-09-01", budget: 5000, spend: 0, impressions: 0, clicks: 0, conversions: 0, roas: 0, progress: 12 },
  { id: "cmp-10", clientId: "dunns-river", name: "Repeat Guest Re-engage", objective: "Retention", channels: ["Email"], status: "Paused", start: "2026-04-01", end: "2026-06-01", budget: 600, spend: 240, impressions: 18000, clicks: 1900, conversions: 96, roas: 8.2, progress: 40 },
];

/** Agency-wide monthly trend (last 12 months) */
export const monthlyTrend: MetricPoint[] = [
  { label: "Jun", reach: 980000, engagement: 64000, leads: 410, spend: 18200, revenue: 86000 },
  { label: "Jul", reach: 1040000, engagement: 71000, leads: 448, spend: 19500, revenue: 92500 },
  { label: "Aug", reach: 1120000, engagement: 78000, leads: 502, spend: 21000, revenue: 101000 },
  { label: "Sep", reach: 1210000, engagement: 84000, leads: 536, spend: 22800, revenue: 109500 },
  { label: "Oct", reach: 1185000, engagement: 81000, leads: 521, spend: 22100, revenue: 106000 },
  { label: "Nov", reach: 1320000, engagement: 96000, leads: 604, spend: 25400, revenue: 124000 },
  { label: "Dec", reach: 1480000, engagement: 112000, leads: 712, spend: 29800, revenue: 151000 },
  { label: "Jan", reach: 1390000, engagement: 102000, leads: 648, spend: 26900, revenue: 133000 },
  { label: "Feb", reach: 1445000, engagement: 108000, leads: 690, spend: 27600, revenue: 140000 },
  { label: "Mar", reach: 1560000, engagement: 121000, leads: 748, spend: 30200, revenue: 158000 },
  { label: "Apr", reach: 1610000, engagement: 128000, leads: 792, spend: 31500, revenue: 167000 },
  { label: "May", reach: 1735000, engagement: 139000, leads: 861, spend: 33800, revenue: 182000 },
];

export const channelMix: ChannelStat[] = [
  { channel: "Instagram", value: 38, change: 4.2 },
  { channel: "Facebook", value: 24, change: -1.1 },
  { channel: "Google", value: 16, change: 2.8 },
  { channel: "TikTok", value: 11, change: 6.5 },
  { channel: "Email", value: 7, change: 1.4 },
  { channel: "LinkedIn", value: 4, change: 0.9 },
];

export const contentItems: ContentItem[] = [
  { id: "ct-1", clientId: "blue-mahoe", title: "Chef's special — Jerk Snapper reel", channel: "Instagram", type: "Reel", status: "In Review", scheduledFor: "2026-05-31", author: "Keisha Powell", caption: "Fresh off the grill 🔥 Our jerk snapper is back this weekend. Tag who you're bringing.", accent: "#16019a" },
  { id: "ct-2", clientId: "blue-mahoe", title: "Sunday Brunch teaser carousel", channel: "Instagram", type: "Carousel", status: "Approved", scheduledFor: "2026-06-02", author: "Amalia Brown", caption: "Brunch is coming. Bottomless sorrel mimosas and a view. Save the date.", accent: "#16019a" },
  { id: "ct-3", clientId: "blue-mahoe", title: "Behind the pass — kitchen story", channel: "Instagram", type: "Story", status: "Scheduled", scheduledFor: "2026-05-30", author: "Amalia Brown", caption: "A morning in the Blue Mahoe kitchen.", accent: "#16019a" },
  { id: "ct-4", clientId: "irie-threads", title: "Summer Drop 03 — lookbook reel", channel: "TikTok", type: "Reel", status: "Needs Changes", scheduledFor: "2026-06-01", author: "Keisha Powell", caption: "Drop 03 lands Friday. Set your alarms ⏰", accent: "#ed1c24" },
  { id: "ct-5", clientId: "irie-threads", title: "Drop 03 launch email", channel: "Email", type: "Email", status: "Drafting", scheduledFor: "2026-06-06", author: "Keisha Powell", caption: "IT'S HERE — Summer Drop 03 is live.", accent: "#ed1c24" },
  { id: "ct-6", clientId: "coast-realty", title: "New listing — Ocho Rios villa tour", channel: "YouTube", type: "Video", status: "Published", scheduledFor: "2026-05-22", author: "Marcus Lewis", caption: "Inside a $48M ocean-view villa in Ocho Rios.", accent: "#0a2a6b" },
  { id: "ct-7", clientId: "coast-realty", title: "Neighbourhood spotlight blog", channel: "Website", type: "Blog", status: "Approved", scheduledFor: "2026-05-29", author: "Marcus Lewis", caption: "Living in Ocho Rios: a buyer's guide.", accent: "#0a2a6b" },
  { id: "ct-8", clientId: "fityard", title: "Member transformation post", channel: "Instagram", type: "Post", status: "Scheduled", scheduledFor: "2026-05-31", author: "Amalia Brown", caption: "8 weeks. One decision. Meet Tamara 💪", accent: "#1f0a6b" },
  { id: "ct-9", clientId: "paylink", title: "How PayLink keeps you secure — explainer", channel: "LinkedIn", type: "Video", status: "In Review", scheduledFor: "2026-06-03", author: "Tanya Reid", caption: "Security you can see. Here's how PayLink protects every transaction.", accent: "#08013f" },
  { id: "ct-10", clientId: "dunns-river", title: "Summer offer — IG ad creative", channel: "Instagram", type: "Ad", status: "Approved", scheduledFor: "2026-05-30", author: "Devon Clarke", caption: "Book direct and save 15% this summer. Limited spots.", accent: "#0a4d5c" },
  { id: "ct-11", clientId: "irie-threads", title: "Customer styling UGC repost", channel: "Instagram", type: "Story", status: "Published", scheduledFor: "2026-05-24", author: "Amalia Brown", caption: "You styled it better 😍 #IrieThreads", accent: "#ed1c24" },
  { id: "ct-12", clientId: "blue-mahoe", title: "Weekend hours reminder", channel: "Facebook", type: "Post", status: "Idea", scheduledFor: "2026-06-07", author: "Amalia Brown", caption: "Open late this weekend — walk-ins welcome.", accent: "#16019a" },
];

export const reports: Report[] = [
  { id: "rp-1", clientId: "blue-mahoe", title: "April Performance Report", period: "April 2026", type: "Monthly", date: "2026-05-03", summary: "Reservations up 38% MoM driven by the midweek campaign and consistent reel output.", kpis: [{ label: "Reach", value: "214K", delta: "+22%" }, { label: "Reservations", value: "486", delta: "+38%" }, { label: "Cost / reservation", value: "$1.90", delta: "-14%" }] },
  { id: "rp-2", clientId: "blue-mahoe", title: "Q1 Strategy Review", period: "Q1 2026", type: "Quarterly", date: "2026-04-08", summary: "Strong quarter. Recommend expanding to TikTok and launching brunch service.", kpis: [{ label: "Followers", value: "+4.1K", delta: "+78%" }, { label: "Avg. ROAS", value: "5.1x", delta: "+0.6" }] },
  { id: "rp-3", clientId: "irie-threads", title: "April Performance Report", period: "April 2026", type: "Monthly", date: "2026-05-04", summary: "Email drove 31% of revenue. Spring Clearance hit 6.5x ROAS.", kpis: [{ label: "Revenue", value: "$42K", delta: "+19%" }, { label: "Email share", value: "31%", delta: "+5pp" }, { label: "ROAS", value: "6.5x", delta: "+0.4" }] },
  { id: "rp-4", clientId: "coast-realty", title: "Ocho Rios Campaign Report", period: "Apr 15 – May 15", type: "Campaign", date: "2026-05-16", summary: "214 qualified leads at a 58% lower cost per lead than the prior quarter.", kpis: [{ label: "Leads", value: "214", delta: "+x4" }, { label: "Cost / lead", value: "$19", delta: "-58%" }] },
  { id: "rp-5", clientId: "paylink", title: "April Performance Report", period: "April 2026", type: "Monthly", date: "2026-05-05", summary: "Brand search up 7x since launch. Demo requests climbing steadily.", kpis: [{ label: "Demo requests", value: "128", delta: "+128%" }, { label: "Brand search", value: "x7", delta: "up" }] },
  { id: "rp-6", clientId: "dunns-river", title: "April Performance Report", period: "April 2026", type: "Monthly", date: "2026-05-06", summary: "Direct bookings continue to climb as OTA dependence falls.", kpis: [{ label: "Direct bookings", value: "+147%", delta: "up" }, { label: "Commission saved", value: "$38K", delta: "up" }] },
];

export const invoices: Invoice[] = [
  { id: "inv-1", clientId: "blue-mahoe", number: "TM-2026-041", amount: 1950, status: "Paid", issued: "2026-05-01", due: "2026-05-15", items: [{ desc: "Momentum retainer — May", qty: 1, rate: 1950 }] },
  { id: "inv-2", clientId: "blue-mahoe", number: "TM-2026-052", amount: 1950, status: "Sent", issued: "2026-06-01", due: "2026-06-15", items: [{ desc: "Momentum retainer — June", qty: 1, rate: 1950 }] },
  { id: "inv-3", clientId: "coast-realty", number: "TM-2026-039", amount: 3800, status: "Paid", issued: "2026-05-01", due: "2026-05-15", items: [{ desc: "Authority retainer — May", qty: 1, rate: 3800 }] },
  { id: "inv-4", clientId: "irie-threads", number: "TM-2026-044", amount: 2450, status: "Overdue", issued: "2026-05-01", due: "2026-05-15", items: [{ desc: "Momentum retainer — May", qty: 1, rate: 1950 }, { desc: "Extra shoot — Drop 03", qty: 1, rate: 500 }] },
  { id: "inv-5", clientId: "paylink", number: "TM-2026-040", amount: 3800, status: "Paid", issued: "2026-05-01", due: "2026-05-15", items: [{ desc: "Authority retainer — May", qty: 1, rate: 3800 }] },
  { id: "inv-6", clientId: "dunns-river", number: "TM-2026-045", amount: 1950, status: "Sent", issued: "2026-05-01", due: "2026-05-15", items: [{ desc: "Momentum retainer — May", qty: 1, rate: 1950 }] },
  { id: "inv-7", clientId: "fityard", number: "TM-2026-046", amount: 850, status: "Paid", issued: "2026-05-01", due: "2026-05-15", items: [{ desc: "Launchpad retainer — May", qty: 1, rate: 850 }] },
  { id: "inv-8", clientId: "sunbeam-solar", number: "TM-2026-051", amount: 2450, status: "Draft", issued: "2026-05-22", due: "2026-06-05", items: [{ desc: "Onboarding + setup", qty: 1, rate: 500 }, { desc: "Momentum retainer — June", qty: 1, rate: 1950 }] },
];

export const threads: MessageThread[] = [
  { id: "th-1", clientId: "blue-mahoe", subject: "Sunday Brunch creative direction", unread: 2, messages: [
    { from: "Andre Campbell", role: "client", text: "Love the brunch teaser! Can we make the mimosa shot the cover?", at: "2026-05-28T14:10:00" },
    { from: "Amalia Brown", role: "team", text: "Great call — swapping it now. We'll have the updated carousel up for approval today.", at: "2026-05-28T14:32:00" },
    { from: "Amalia Brown", role: "team", text: "Updated version is in your Content tab ready for review 👌", at: "2026-05-28T16:05:00" },
  ] },
  { id: "th-2", clientId: "irie-threads", subject: "Drop 03 launch timing", unread: 0, messages: [
    { from: "Renee Walters", role: "client", text: "Are we still good for Friday 6pm on the drop?", at: "2026-05-27T09:00:00" },
    { from: "Keisha Powell", role: "team", text: "Yes — email scheduled, reels queued, ads ready to switch on at 5:45pm.", at: "2026-05-27T09:18:00" },
  ] },
  { id: "th-3", clientId: "coast-realty", subject: "May report walkthrough", unread: 1, messages: [
    { from: "Marcus Lewis", role: "team", text: "Your Ocho Rios campaign report is ready. Want to do the walkthrough Thursday?", at: "2026-05-26T11:20:00" },
  ] },
];

export const files: FileAsset[] = [
  { id: "fl-1", clientId: "blue-mahoe", name: "Brand Guidelines.pdf", kind: "Brand", size: "4.2 MB", updatedAt: "2026-02-10", by: "Tanya Reid" },
  { id: "fl-2", clientId: "blue-mahoe", name: "May Content Calendar.pdf", kind: "PDF", size: "1.1 MB", updatedAt: "2026-04-28", by: "Amalia Brown" },
  { id: "fl-3", clientId: "blue-mahoe", name: "Jerk Snapper Reel.mp4", kind: "Video", size: "82 MB", updatedAt: "2026-05-27", by: "Keisha Powell" },
  { id: "fl-4", clientId: "blue-mahoe", name: "Brunch Carousel.zip", kind: "Image", size: "18 MB", updatedAt: "2026-05-28", by: "Keisha Powell" },
  { id: "fl-5", clientId: "irie-threads", name: "Drop 03 Lookbook.zip", kind: "Image", size: "240 MB", updatedAt: "2026-05-25", by: "Keisha Powell" },
  { id: "fl-6", clientId: "coast-realty", name: "Ocho Rios Campaign Report.pdf", kind: "PDF", size: "2.4 MB", updatedAt: "2026-05-16", by: "Marcus Lewis" },
];

export const leads: Lead[] = [
  { id: "ld-1", company: "Kingston Coffee Co.", contact: "Nadine Powell", email: "nadine@kingstoncoffee.jm", phone: "+1 (876) 555-0301", source: "Instagram", stage: "Qualified", value: 1950, owner: "amalia", createdAt: "2026-05-20", note: "Wants social + content. Referred by Blue Mahoe." },
  { id: "ld-2", company: "Montego Bay Spa", contact: "Carla Reid", email: "carla@mobayspa.com", phone: "+1 (876) 555-0312", source: "Referral", stage: "Proposal", value: 1950, owner: "tanya", createdAt: "2026-05-18", note: "Proposal sent for Momentum. Decision expected this week." },
  { id: "ld-3", company: "Island Auto Parts", contact: "Trevor Mills", email: "trevor@islandauto.jm", phone: "+1 (876) 555-0323", source: "Google", stage: "New", value: 850, owner: "devon", createdAt: "2026-05-27", note: "Inbound from website. Needs ads + simple site." },
  { id: "ld-4", company: "Bloom Florals", contact: "Aisha Grant", email: "aisha@bloomflorals.jm", phone: "+1 (876) 555-0334", source: "Instagram", stage: "Contacted", value: 850, owner: "amalia", createdAt: "2026-05-25", note: "DM enquiry. Booked a discovery call for Monday." },
  { id: "ld-5", company: "Apex Accounting", contact: "Dwayne Bell", email: "dwayne@apexaccounting.jm", phone: "+1 (876) 555-0345", source: "LinkedIn", stage: "Qualified", value: 3800, owner: "tanya", createdAt: "2026-05-15", note: "B2B. Interested in brand + LinkedIn presence." },
  { id: "ld-6", company: "Negril Beach Rentals", contact: "Simone Clarke", email: "simone@negrilrentals.com", phone: "+1 (876) 555-0356", source: "Referral", stage: "Won", value: 1950, owner: "devon", createdAt: "2026-05-08", note: "Signed Momentum. Onboarding next week." },
  { id: "ld-7", company: "City Hardware", contact: "Garth Reid", email: "garth@cityhardware.jm", phone: "+1 (876) 555-0367", source: "Facebook", stage: "Lost", value: 850, owner: "amalia", createdAt: "2026-04-29", note: "Went with a freelancer on price." },
  { id: "ld-8", company: "Verde Juice Bar", contact: "Tasha Lloyd", email: "tasha@verdejuice.jm", phone: "+1 (876) 555-0378", source: "Instagram", stage: "New", value: 850, owner: "keisha", createdAt: "2026-05-28", note: "Loves our Blue Mahoe work. Wants similar." },
];

export const activities: Activity[] = [
  { id: "ac-1", type: "content", text: "approved the Sunday Brunch carousel", at: "2026-05-28T16:20:00", who: "Andre Campbell", clientId: "blue-mahoe" },
  { id: "ac-2", type: "campaign", text: "Summer Drop 03 hit 7.9x ROAS", at: "2026-05-28T12:00:00", who: "System", clientId: "irie-threads" },
  { id: "ac-3", type: "lead", text: "new lead from Instagram — Verde Juice Bar", at: "2026-05-28T09:40:00", who: "Keisha Powell" },
  { id: "ac-4", type: "invoice", text: "invoice TM-2026-044 is overdue", at: "2026-05-27T08:00:00", who: "System", clientId: "irie-threads" },
  { id: "ac-5", type: "report", text: "published the April report for Blue Mahoe", at: "2026-05-03T15:30:00", who: "Amalia Brown", clientId: "blue-mahoe" },
  { id: "ac-6", type: "message", text: "replied in 'Drop 03 launch timing'", at: "2026-05-27T09:18:00", who: "Keisha Powell", clientId: "irie-threads" },
  { id: "ac-7", type: "campaign", text: "launched Midweek Tables Push", at: "2026-05-01T10:00:00", who: "Devon Clarke", clientId: "blue-mahoe" },
];

// ----------------- SELECTORS -----------------
export const getClient = (id: string) => clients.find((c) => c.id === id);
export const clientCampaigns = (id: string) => campaigns.filter((c) => c.clientId === id);
export const clientContent = (id: string) => contentItems.filter((c) => c.clientId === id);
export const clientReports = (id: string) => reports.filter((r) => r.clientId === id);
export const clientInvoices = (id: string) => invoices.filter((i) => i.clientId === id);
export const clientFiles = (id: string) => files.filter((f) => f.clientId === id);
export const clientThreads = (id: string) => threads.filter((t) => t.clientId === id);
export const teamMember = (id: string) => team.find((t) => t.id === id);
export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
export const getService = (slug: string) => serviceCategories.find((s) => s.slug === slug);
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const getTestimonial = (id: string) => testimonials.find((t) => t.id === id);

/** The client currently "logged in" to the demo portal */
export const PORTAL_CLIENT_ID = "blue-mahoe";
