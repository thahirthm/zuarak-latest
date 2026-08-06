// Single source of content for the ZUARAK site.
// Everything below is editable without touching component code (CMS-ready).

import workNke from "@/assets/pr3.png";
import workRoyal from "@/assets/pr1.jpg";
import workTaj from "@/assets/pr2.jpg";
import workEclat from "@/assets/pr4.png";
import workTaekwondo from "@/assets/pr5.png";
import workEclatCrm from "@/assets/Pr6.png";
import blogAi from "@/assets/blog-ai.jpg";
import blogCloud from "@/assets/blog-cloud.jpg";
import blogDesign from "@/assets/blog-design.jpg";

export const company = {
  name: "ZUARAK",
  email: "info@zuarak.com",
  phone: "+91 8714419511",
  addressLines: ["Opposite Brand Factory", "Nadakkavu", "Kozhikode", "Kerala, India"],
  hours: ["Monday – Friday · 9:30 — 18:30", "Saturday · 10:00 — 15:00", "Sunday · Closed"],
  mapQuery: "Nadakkavu,+Kozhikode,+Kerala,+India",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/zuarak" },
    { label: "Instagram", href: "https://www.instagram.com/zuarak_?igsh=eTdmeTczaXF0OHd6&utm_source=qr" },
    // { label: "GitHub", href: "https://github.com" },
  ],
};

export const stats = [
  { value: 180, suffix: "+", label: "Projects Delivered" },
  { value: 120, suffix: "+", label: "Happy Clients" },
  { value: 14, suffix: "", label: "Countries Served" },
  { value: 9, suffix: "+", label: "Years of Experience" },
];

export const clients = [
  "NKE FLOOR",
  "ROYAL SPICE",
  "TAJ STAMFORD",
  "NORTHWIND",
  "ATLAS LABS",
  "MERIDIAN",
  "KAVI GROUP",
  "ORBIT HEALTH",
];

export type Service = {
  slug: string;
  title: string;
  description: string;
  overview: string[];
  deliverables: string[];
  stack: string[];
};

export const services: Service[] = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    description: "Bespoke platforms engineered around your operations, not a template.",
    overview: [
      "We build software shaped by how your business actually runs — the exceptions, the approvals, the edge cases a generic product will never model.",
      "Engagements start with a short discovery, move into a working prototype within weeks, and ship in weekly increments you can review, test and use.",
    ],
    deliverables: [
      "Technical discovery and architecture blueprint",
      "Interactive prototype before full build",
      "Modular, documented and tested codebase",
      "CI/CD pipeline and staging environment",
      "Handover documentation and team training",
    ],
    stack: ["Python", "Django", "FastAPI", "React", "PostgreSQL", "Docker"],
  },
  {
    slug: "website-development",
    title: "Website Development",
    description: "Editorial, fast, conversion-driven marketing sites.",
    overview: [
      "A marketing site is a performance asset. We design and engineer sites that load instantly, rank well and turn attention into qualified enquiries.",
      "Every page is server-rendered, structured for search engines and built on a content layer your team can edit without a developer.",
    ],
    deliverables: [
      "Design system and page templates",
      "Server-rendered, Core Web Vitals optimised build",
      "On-page SEO, schema and sitemap",
      "Editable content structure",
      "Analytics and conversion tracking",
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Node.js"],
  },
  {
    slug: "web-applications",
    title: "Web Applications",
    description: "Complex dashboards, portals and SaaS products at scale.",
    overview: [
      "Multi-tenant SaaS, internal portals, operational dashboards — interfaces that carry real workloads without becoming slow or confusing.",
      "We treat state, permissions and data volume as design problems, not afterthoughts, so the product still feels fast at year three.",
    ],
    deliverables: [
      "Role-based access and permission model",
      "Realtime dashboards and reporting",
      "Scalable API and data layer",
      "Automated test coverage",
      "Observability and alerting",
    ],
    stack: ["React", "Next.js", "FastAPI", "PostgreSQL", "Redis", "AWS"],
  },
  {
    slug: "mobile-applications",
    title: "Mobile Applications",
    description: "Native-grade iOS and Android products with Flutter.",
    overview: [
      "One codebase, two stores, no compromise on feel. We build mobile products with native gestures, offline behaviour and real device performance budgets.",
      "We handle the unglamorous parts too: store submission, versioning, crash reporting and staged rollouts.",
    ],
    deliverables: [
      "iOS and Android builds from one codebase",
      "Offline-first data sync",
      "Push notifications and deep links",
      "App Store and Play Store submission",
      "Crash analytics and release management",
    ],
    stack: ["Flutter", "Node.js", "PostgreSQL", "Firebase"],
  },
  {
    slug: "ui-ux-design",
    title: "UI UX Design",
    description: "Interface systems designed with craft and measurable clarity.",
    overview: [
      "Design at ZUARAK is a system, not a set of screens: type scale, spacing, motion and states defined once and reused everywhere.",
      "We validate with prototypes and real users before engineering begins, so the build stage is execution rather than debate.",
    ],
    deliverables: [
      "UX research and user flows",
      "Wireframes and clickable prototypes",
      "High-fidelity UI and design system",
      "Motion and interaction specification",
      "Accessibility review (WCAG AA)",
    ],
    stack: ["Figma", "Framer", "Tailwind CSS"],
  },
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    description: "LLM agents, RAG search and predictive automation.",
    overview: [
      "We build AI features that survive contact with production: evaluated, guard-railed, cost-capped and observable on every call.",
      "If a task cannot be scored on a fixed dataset, we say so before you spend a budget on it.",
    ],
    deliverables: [
      "Use-case scoping and feasibility study",
      "RAG pipeline and vector search",
      "Agent workflows with tool calling",
      "Evaluation harness and regression tests",
      "Cost, latency and quality monitoring",
    ],
    stack: ["OpenAI", "Python", "FastAPI", "PostgreSQL", "Redis"],
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    description: "Resilient AWS, Azure and container infrastructure.",
    overview: [
      "Infrastructure that is boring in the best way — reproducible, monitored and priced predictably as traffic grows.",
      "We migrate live systems with zero downtime and leave you with infrastructure defined in code, not in someone's memory.",
    ],
    deliverables: [
      "Infrastructure as code",
      "Containerised deployments and autoscaling",
      "Zero-downtime migration plan",
      "Backup, failover and disaster recovery",
      "Cost optimisation review",
    ],
    stack: ["AWS", "Azure", "Docker", "DigitalOcean"],
  },
  {
    slug: "business-automation",
    title: "Business Automation",
    description: "Workflow engines that remove manual, repetitive work.",
    overview: [
      "We map the work your team repeats every week and replace it with rules, integrations and scheduled jobs that never forget a step.",
      "Automation is introduced incrementally, with a human in the loop until the numbers prove it can be trusted alone.",
    ],
    deliverables: [
      "Process mapping and automation audit",
      "Workflow and approval engine",
      "Third-party system integrations",
      "Scheduled jobs and alerting",
      "Time-saved reporting",
    ],
    stack: ["Python", "Node.js", "PostgreSQL", "Redis"],
  },
  {
    slug: "erp-development",
    title: "ERP Development",
    description: "Operations, inventory and finance under one system.",
    overview: [
      "Custom ERP for companies whose operations do not fit an off-the-shelf suite — built module by module, starting with the one that hurts most.",
      "Existing spreadsheets and legacy databases are migrated cleanly, with reconciliation you can verify.",
    ],
    deliverables: [
      "Inventory, purchase and sales modules",
      "Finance and reporting layer",
      "Role-based multi-branch access",
      "Legacy data migration",
      "Staff onboarding and training",
    ],
    stack: ["Django", "React", "PostgreSQL", "Docker"],
  },
  {
    slug: "crm-development",
    title: "CRM Development",
    description: "Pipelines, retention and customer intelligence.",
    overview: [
      "A CRM shaped around your sales motion, not a vendor's — pipelines, scoring and follow-ups that your team will actually keep updated.",
      "We connect telephony, email and marketing sources so the customer record is complete without manual entry.",
    ],
    deliverables: [
      "Pipeline and lifecycle modelling",
      "Lead capture and scoring",
      "Email, calls and WhatsApp integration",
      "Dashboards and forecast reporting",
      "Data import and deduplication",
    ],
    stack: ["React", "FastAPI", "PostgreSQL", "Redis"],
  },
  {
    slug: "api-development",
    title: "API Development",
    description: "Documented, versioned and secure service layers.",
    overview: [
      "APIs designed for the people who consume them: predictable contracts, honest errors, and documentation kept in sync with the code.",
      "Security, rate limiting and versioning are built in from the first endpoint rather than retrofitted after launch.",
    ],
    deliverables: [
      "REST or GraphQL API design",
      "OpenAPI documentation",
      "Authentication, scopes and rate limiting",
      "Versioning and deprecation policy",
      "Integration and load testing",
    ],
    stack: ["FastAPI", "Node.js", "PostgreSQL", "Redis"],
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    description: "Legacy modernisation with zero-drama migration.",
    overview: [
      "Old systems rarely fail loudly — they just slow everything around them. We modernise them without pausing the business that depends on them.",
      "Work runs strangler-pattern style: new capability is built alongside the legacy system and traffic moves across in controlled stages.",
    ],
    deliverables: [
      "Legacy system audit and risk map",
      "Phased modernisation roadmap",
      "Data migration with reconciliation",
      "Parallel-run and cutover plan",
      "Team enablement after launch",
    ],
    stack: ["Python", "React", "PostgreSQL", "AWS", "Docker"],
  },
  {
    slug: "maintenance-and-support",
    title: "Maintenance & Support",
    description: "SLA-backed monitoring, patching and iteration.",
    overview: [
      "Launch is the beginning. We keep systems patched, monitored and improving, with a named team that answers when something matters.",
      "Monthly reporting shows uptime, performance and everything shipped, so support never feels like a black box.",
    ],
    deliverables: [
      "Defined SLA and response windows",
      "Uptime and performance monitoring",
      "Security patching and dependency updates",
      "Monthly improvement sprints",
      "Transparent reporting",
    ],
    stack: ["Docker", "AWS", "GitHub", "PostgreSQL"],
  },
];

export const process = [
  { step: "01", title: "Discover", copy: "Workshops to map goals, users and constraints." },
  { step: "02", title: "Research", copy: "Market, competitor and technical feasibility study." },
  { step: "03", title: "Design", copy: "Systems, prototypes and high-fidelity interfaces." },
  { step: "04", title: "Develop", copy: "Modular architecture built in weekly increments." },
  { step: "05", title: "Test", copy: "Automated, manual, performance and security passes." },
  { step: "06", title: "Deploy", copy: "Zero-downtime release with observability in place." },
  { step: "07", title: "Support", copy: "Continuous improvement, monitoring and scaling." },
];

export const technologies = [
  "Python",
  "Django",
  "FastAPI",
  "React",
  "Next.js",
  "Flutter",
  "Node.js",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Docker",
  "AWS",
  "Azure",
  "DigitalOcean",
  "OpenAI",
  "GitHub",
  "Tailwind CSS",
];

export const whyUs = [
  { title: "Premium UI", copy: "Interfaces that look designed, not assembled." },
  { title: "Fast Development", copy: "Shipping cadence measured in days, not quarters." },
  { title: "Scalable Systems", copy: "Architecture that survives 100× growth." },
  { title: "SEO Friendly", copy: "Server-rendered, structured and indexable by default." },
  { title: "Enterprise Security", copy: "Least-privilege access, audits and encryption." },
  { title: "Modern Technologies", copy: "A stack chosen for longevity, not for hype." },
  { title: "Dedicated Support", copy: "A named team that answers, always." },
  { title: "Reliable Team", copy: "Senior engineers, no hand-offs to juniors." },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  url: string;
  image: string;
  summary: string;
  description: string[];
  tech: string[];
  services: string[];
};

export const projects: Project[] = [
  {
    slug: "nke-floor",
    title: "NKE Floor",
    category: "Industrial Flooring Website",
    year: "2025",
    url: "https://landing.nkefloor.com/",
    image: workNke,
    summary:
      "A high-contrast industrial landing experience built to convert specification enquiries from contractors and facility owners.",
    description: [
      "NKE Floor needed a digital presence as durable as their epoxy systems. We designed a dark, engineered layout where material texture carries the brand and every scroll reveals a proof point.",
      "The build focuses on speed and lead quality: server-rendered pages, compressed modern imagery and an enquiry flow that qualifies projects before a call is ever booked.",
    ],
    tech: ["Next.js", "Tailwind CSS", "Node.js", "PostgreSQL"],
    services: ["UI UX Design", "Website Development", "SEO"],
  },
  {
    slug: "royal-spice",
    title: "Royal Spice",
    category: "Restaurant Website",
    year: "2025",
    url: "https://royalspicect.com/",
    image: workRoyal,
    summary:
      "An appetite-first restaurant site with menu management, reservations and a photography-led storytelling flow.",
    description: [
      "Royal Spice wanted the warmth of the dining room online. We built a dark, cinematic layout that lets food photography lead while keeping menus and reservations one tap away.",
      "A lightweight content layer lets the team update dishes, prices and seasonal offers themselves, with no developer in the loop.",
    ],
    tech: ["React", "Node.js", "MySQL", "Tailwind CSS"],
    services: ["Website Development", "UI UX Design", "Maintenance & Support"],
  },
  {
    slug: "taj-stamford",
    title: "Taj Stamford",
    category: "Luxury Hospitality Website",
    year: "2026",
    url: "https://tajstamford.com/",
    image: workTaj,
    summary:
      "A luxury hospitality platform with room discovery, availability search and an elegant booking journey.",
    description: [
      "For Taj Stamford we designed a restrained, editorial interface where typography and imagery carry the sense of luxury and the booking path stays effortless.",
      "Availability search, rate presentation and enquiry handling were engineered for speed on mobile, where the majority of bookings begin.",
    ],
    tech: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "AWS"],
    services: ["Digital Transformation", "Web Applications", "UI UX Design"],
  },
  {
    slug: "eclat-mobile-app",
    title: "Eclat International Mobile App",
    category: "Mobile Application",
    year: "2026",
    url: "#",
    image: workEclat,
    summary:
      "A sleek, premium mobile application designed for seamless native-like user experiences on the go.",
    description: [
      "Eclat Mobile App redefines how users interact with services on mobile devices. We focused on a clean, gesture-driven interface that minimizes friction.",
      "The app is built on modern cross-platform technologies to ensure rapid feature delivery without compromising on performance.",
    ],
    tech: ["React Native", "Firebase", "Node.js", "TypeScript"],
    services: ["Mobile Applications", "UI UX Design", "Custom Software Development"],
  },
  {
    slug: "master-taekwondo-crm",
    title: "Master Taekwondo CRM",
    category: "Custom CRM & Management",
    year: "2026",
    url: "#",
    image: workTaekwondo,
    summary:
      "A comprehensive management system built specifically to handle memberships, scheduling, and billing for martial arts academies.",
    description: [
      "Master Taekwondo required a unified platform to manage hundreds of students, recurring billing, and complex class schedules.",
      "We built a robust, scalable CRM that automated their administrative overhead, giving instructors more time on the mat and less time in spreadsheets."
    ],
    tech: ["React", "Node.js", "PostgreSQL", "Stripe API"],
    services: ["Custom Software Development", "UI UX Design"],
  },
  {
    slug: "eclat-crm",
    title: "Eclat CRM",
    category: "Enterprise Software",
    year: "2026",
    url: "#",
    image: workEclatCrm,
    summary:
      "An enterprise-grade internal CRM tool designed to streamline operations, sales pipelines, and customer relationship management.",
    description: [
      "Off-the-shelf CRM solutions were too bloated and rigid for Eclat's specific operational workflows.",
      "We engineered a custom internal tool tailored perfectly to their sales funnel, featuring real-time dashboards, automated follow-ups, and seamless integrations with their existing tech stack."
    ],
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    services: ["Custom Software Development", "Web Applications"],
  }
];

export const testimonials = [
  {
    quote:
      "ZUARAK rebuilt our platform in ten weeks. It is faster, cleaner and finally looks like the company we are becoming.",
    name: "Adithya Menon",
    role: "Managing Director",
    company: "NKE Floor",
    rating: 5,
  },
  {
    quote:
      "They understood hospitality before they wrote a line of code. Online reservations are up 62% since launch.",
    name: "Sara Iqbal",
    role: "Operations Head",
    company: "Taj Stamford",
    rating: 5,
  },
  {
    quote:
      "The most disciplined engineering partner we have worked with. Weekly demos, zero surprises, exceptional craft.",
    name: "Daniel Fernandes",
    role: "Founder",
    company: "Royal Spice",
    rating: 5,
  },
];

export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readingTime: string;
  excerpt: string;
  image: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "ai-agents-in-production",
    title: "Shipping AI agents that actually reach production",
    category: "Artificial Intelligence",
    date: "2026-06-18",
    readingTime: "7 min read",
    excerpt:
      "Most AI pilots die in the demo stage. The difference between a prototype and a product is evaluation, guardrails and boring infrastructure.",
    image: blogAi,
    body: [
      "Every organisation now has an AI prototype. Very few have an AI product. The gap is rarely the model — it is everything around it: retrieval quality, evaluation harnesses, cost ceilings and a rollback plan.",
      "We start every AI engagement with a measurable task definition. If success cannot be scored automatically on a fixed dataset, the feature is not ready to be built.",
      "From there the work looks like ordinary software engineering: versioned prompts, deterministic tests, structured outputs validated at the boundary, and observability on every call so regressions surface before customers find them.",
    ],
  },
  {
    slug: "cloud-cost-architecture",
    title: "Architecting for cost, not just for scale",
    category: "Cloud Solutions",
    date: "2026-05-02",
    readingTime: "6 min read",
    excerpt:
      "Scalability is easy to buy and expensive to keep. A short guide to designing systems whose bill grows slower than their traffic.",
    image: blogCloud,
    body: [
      "Cloud spend is an architecture decision made months earlier. Instance sizing is the symptom; data movement and idle capacity are the cause.",
      "We push aggressively towards managed primitives, edge caching and request-level observability, so every rupee of infrastructure maps to a user-facing outcome.",
      "The result is boring in the best way: predictable bills, clear headroom and no emergency migrations during a growth spike.",
    ],
  },
  {
    slug: "design-systems-that-last",
    title: "Design systems that survive their second year",
    category: "UI UX Design",
    date: "2026-03-27",
    readingTime: "5 min read",
    excerpt:
      "A design system is not a component library. It is a set of decisions strong enough to say no to future exceptions.",
    image: blogDesign,
    body: [
      "Teams usually ship a component library, call it a design system and watch it erode within a year as exceptions accumulate.",
      "Durable systems encode intent: tokens for colour, type and motion, plus documented rules about when a new variant is allowed to exist.",
      "The discipline pays off in velocity. Once decisions live in tokens, redesigns become configuration rather than reconstruction.",
    ],
  },
];

export const faqs = [
  {
    q: "How long does a typical project take?",
    a: "A marketing site takes 3–5 weeks. A web or mobile application typically runs 8–16 weeks depending on scope, with usable increments delivered every week.",
  },
  {
    q: "How do you price engagements?",
    a: "Fixed-scope projects are quoted after a paid discovery phase. Longer partnerships run on a monthly dedicated-team model with a clear roadmap.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. We currently serve clients across 14 countries and work with overlapping hours in EMEA, UK and US time zones.",
  },
  {
    q: "Who owns the code and design files?",
    a: "You do. Complete ownership of source code, repositories, design files and infrastructure transfers to you on final delivery.",
  },
  {
    q: "Can you take over an existing codebase?",
    a: "Frequently. We start with a technical audit, stabilise the critical paths, then modernise incrementally without freezing your roadmap.",
  },
  {
    q: "What happens after launch?",
    a: "We offer SLA-backed maintenance covering monitoring, security patching, performance budgets and continuous feature work.",
  },
];
