// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH.
// To point this site at the real domain, change SITE_URL below (or set
// NEXT_PUBLIC_SITE_URL in Vercel). Canonical tags, sitemap, robots.txt,
// OG/Twitter images and JSON-LD all derive from it.
// ─────────────────────────────────────────────────────────────────────────────
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yash-sharma.vercel.app'
).replace(/\/$/, '')

export const person: {
  name: string
  role: string
  location: string
  email: string
  linkedin: string
  github: string
  portrait: string | null
  portraitAlt: string
  resumeHref: string | null
} = {
  name: 'Yash Sharma',
  role: 'Backend & Systems Engineer',
  location: 'Pune, Maharashtra, India',
  email: 'yashsharma.karate@gmail.com',
  linkedin: 'https://www.linkedin.com/in/yashsh21/',
  github: 'https://github.com/HyderYash',

  // Served from public/yash.jpg. Set back to null to fall back to the monogram
  // tile — the hero handles both without breaking.
  portrait: '/yash.jpg',
  portraitAlt: 'Yash Sharma, backend and systems engineer based in Pune, India',

  // RÉSUMÉ — null so no dead link ships. To enable: copy the PDF into public/
  // and set this to '/yash-sharma-resume.pdf'.
  // Note: that PDF contains a phone number this page deliberately omits.
  resumeHref: '/yash-sharma-resume.pdf',
}

export const meta = {
  title: 'Yash Sharma — Backend & Systems Engineer',
  // 155 chars.
  description:
    'Backend and systems engineer building real-time, high-throughput services in Node.js, TypeScript, Redis and AWS. Founder of Refactyl. Based in Pune, India.',
  keywords: [
    'Yash Sharma',
    'backend engineer',
    'systems engineer',
    'Node.js developer',
    'TypeScript developer',
    'distributed systems',
    'Refactyl',
    'Pune developer',
  ],
} as const

export const intro = {
  headline: 'I build backends that survive real load.',
  body: `Backend and systems engineer working in Node.js, TypeScript, Redis and AWS. The problems
    I like are the ones where correctness and throughput fight each other. Real-time event
    pipelines. Caching you can trust. Migrations that fail loudly instead of quietly. I run
    Refactyl, and I am studying B.Tech in Artificial Intelligence.`,
} as const

export type SkillGroup = { label: string; items: string[] }

export const skills: SkillGroup[] = [
  { label: 'Languages', items: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'Java', 'SQL'] },
  {
    label: 'Backend',
    items: [
      'Node.js',
      'Express',
      'Fastify',
      'REST APIs',
      'GraphQL',
      'WebSockets',
      'Microservices',
      'Event-Driven Architecture',
    ],
  },
  { label: 'Databases & Caching', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Prisma'] },
  { label: 'Frontend', items: ['React.js', 'Next.js', 'Tailwind CSS'] },
  {
    label: 'Cloud & DevOps',
    items: ['AWS (EC2, S3, RDS, Lambda)', 'Docker', 'Vercel', 'CI/CD', 'Jest', 'System Design'],
  },
]

export type Role = {
  slug: string
  company: string
  title: string
  period: string
  summary: string
  contributions: string[]
  stack?: string[]
  href?: string
}

export const experience: Role[] = [
  {
    slug: 'refactyl',
    company: 'Refactyl',
    title: 'Founder & Software Engineer',
    period: 'Dec 2025 — Present',
    summary:
      'A developer tool that migrates and refactors production codebases onto modern frameworks. The output has to be a diff someone can actually read.',
    contributions: [
      'Engineered a deterministic migration engine (Express to Fastify) benchmarked at 3.1× throughput, 12k to 38.9k req/s.',
      'Gated every output behind the real compiler (tsc, @vue/compiler-sfc): a file ships only if the compiler accepts it, otherwise it is preserved and flagged rather than silently broken.',
    ],
    stack: ['Node.js', 'TypeScript', 'Docker', 'PostgreSQL', 'Redis', 'AWS'],
  },
  {
    slug: 'mighty-champions',
    company: 'Mighty Champions',
    title: 'Lead Web Engineer',
    period: 'Jan 2026 — Present',
    summary:
      'Sole engineer for a preventive mental health education nonprofit. The whole web surface is mine, including the tooling behind their fellowship.',
    contributions: [
      'Shipped 15+ production websites covering six audience programs: college, teens, women, men, 55+, physicians.',
      'Engineered the end-to-end admissions platform: marketing site, application flow, enrollment portal, and an authenticated internal dashboard.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
  },
  {
    slug: 'voxa',
    company: 'Voxa',
    title: 'Fractional Tech Lead',
    period: 'Mar 2026 — Jun 2026',
    summary:
      'Engineering lead for an AI powered multilingual speaking coach. I owned the architecture and the team building it.',
    contributions: [
      'Owned architecture and technical direction while managing a team of 8 engineering interns.',
      'Shipped core product features and the AI voice-feedback pipeline; introduced code review, CI/CD and a repeatable release process.',
    ],
  },
  {
    slug: 'freelance',
    company: 'Self-Employed',
    title: 'Independent Software Engineer',
    period: 'Mar 2021 — Dec 2025',
    summary:
      'Backend work for products that had to hold up under real concurrency, across a long run of client engagements.',
    contributions: [
      'Architected backend systems for 10k+ concurrent users at sub-100 ms real-time latency, and event engines processing 2M+ events/day with strong consistency guarantees.',
      'Cut API response times 40–60% with Redis caching and asynchronous pipelines.',
    ],
  },
]

export type Project = {
  slug: string
  name: string
  subtitle: string
  period: string
  summary: string
  stack: string[]
  href?: string
}

export const projects: Project[] = [
  {
    slug: 'lutbuilder',
    name: 'LUTBuilder.ai',
    subtitle: 'AI-powered LUT generation platform',
    period: 'Nov 2024 — Present',
    summary:
      'Full-stack AI platform for filmmakers. Real-time LUT previews, a creator dashboard, Stripe billing, and FFmpeg plus AWS Lambda handling the colour processing.',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'FFmpeg', 'AWS Lambda', 'Stripe', 'Vercel'],
    href: 'https://lutbuilder.ai',
  },
  {
    slug: 'stillcollab',
    name: 'StillCollab',
    subtitle: 'Creative workflow & client approval platform',
    period: 'Jan 2025 — Mar 2025',
    summary:
      'Client platform for photographers and creative teams. Portfolio hosting, proofing and sign-off, and approval for social content.',
    // Stack intentionally empty — not yet supplied. The card omits the row.
    stack: [],
    href: 'https://www.stillcollab.com',
  },
]

export const education = {
  degree: 'B.Tech, Artificial Intelligence',
  school: 'Ajeenkya D Y Patil University, Pune',
  period: 'Aug 2025 — May 2029',
} as const

export const certifications = [
  { issuer: 'AWS', name: 'Cloud Practitioner Essentials' },
  { issuer: 'AWS', name: 'Technical Essentials' },
  { issuer: 'AWS', name: 'Getting Started with DevOps on AWS' },
  { issuer: 'Postman', name: 'API Fundamentals — Student Expert' },
] as const

export const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#play', label: 'Play' },
  { href: '#contact', label: 'Contact' },
] as const

export type Capability = { icon: 'gauge' | 'server' | 'workflow'; title: string; body: string; tags: string[] }

export const capabilities: Capability[] = [
  {
    icon: 'gauge',
    title: 'Real-time systems',
    body: 'WebSocket and event driven services holding sub-100 ms under real concurrency. The consistency guarantees have to survive the load test, not just the demo.',
    tags: ['WebSockets', 'Event-driven', 'Redis'],
  },
  {
    icon: 'server',
    title: 'APIs & services',
    body: 'Node.js, Express and Fastify. I design the schema first and measure response times instead of guessing at them.',
    tags: ['Node.js', 'Fastify', 'PostgreSQL', 'GraphQL'],
  },
  {
    icon: 'workflow',
    title: 'Migrations & tooling',
    body: 'Deterministic codebase transformation with the real compiler as the gate. If it does not compile, it does not ship.',
    tags: ['TypeScript', 'Compilers', 'Docker'],
  },
]

/** Every figure here is drawn from shipped work — see the Experience section. */
export const stats = [
  { to: 3.1, decimals: 1, suffix: '×', label: 'throughput gain', note: 'Express → Fastify' },
  { to: 38.9, decimals: 1, suffix: 'k', label: 'req/s sustained', note: 'benchmarked' },
  { to: 2, decimals: 0, suffix: 'M+', label: 'events/day', note: 'event engines' },
  { to: 10, decimals: 0, suffix: 'k+', label: 'concurrent users', note: 'sub-100 ms' },
]

export const toolbelt = [
  'TypeScript', 'JavaScript', 'Python', 'Java', 'Node.js', 'Express', 'Fastify',
  'GraphQL', 'WebSockets', 'Redis', 'PostgreSQL', 'MongoDB', 'MySQL', 'Prisma',
  'Docker', 'AWS EC2', 'AWS Lambda', 'AWS S3', 'CI/CD', 'Jest', 'Next.js', 'React',
]
