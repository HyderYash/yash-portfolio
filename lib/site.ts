// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH.
// To point this site at the real domain, change SITE_URL below (or set
// NEXT_PUBLIC_SITE_URL in Vercel). Canonical tags, sitemap, robots.txt,
// OG/Twitter images and JSON-LD all derive from it.
// ─────────────────────────────────────────────────────────────────────────────
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yash.webnaut.in'
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
  role: 'Full-Stack Software Engineer',
  location: 'Pune, Maharashtra, India',
  email: 'yashsharma.karate@gmail.com',
  linkedin: 'https://www.linkedin.com/in/yashsh21/',
  github: 'https://github.com/HyderYash',

  // Served from public/yash.jpg. Set back to null to fall back to the monogram
  // tile — the hero handles both without breaking.
  portrait: '/yash.jpg',
  portraitAlt: 'Yash Sharma, full-stack software engineer based in Pune, India',

  // RÉSUMÉ — null so no dead link ships. To enable: copy the PDF into public/
  // and set this to '/yash-sharma-resume.pdf'.
  // Note: that PDF contains a phone number this page deliberately omits.
  resumeHref: '/yash-sharma-resume.pdf',
}

export const meta = {
  title: 'Yash Sharma — Full-Stack Software Engineer',
  description:
    'Full-stack software engineer building React and Next.js products, Node.js APIs, and developer tooling. Founder of Refactyl. Based in Pune, India.',
  keywords: [
    'Yash Sharma',
    'full-stack software engineer',
    'React developer',
    'Next.js developer',
    'Node.js developer',
    'TypeScript developer',
    'PostgreSQL',
    'Refactyl',
    'Pune developer',
  ],
} as const

export const intro = {
  headline: 'I build useful software, end to end.',
  body: `I build product interfaces, APIs, and data workflows with TypeScript, React, Next.js,
    Node.js, and PostgreSQL. My work spans learning platforms, AI products, and developer
    tooling. I am building Refactyl, an in-development workspace for application-stack
    migration with explicit review and verification steps, while studying B.Tech in Artificial Intelligence.`,
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
      'An in-development workspace for migrating applications across languages and frameworks while preserving what they do.',
    contributions: [
      'Building a workflow to inspect source applications, plan a migration, and review generated changes before adoption.',
      'Designing explicit verification steps that surface test results, errors, and remaining uncertainty alongside the proposed code.',
    ],
    stack: ['TypeScript', 'Next.js', 'Node.js'],
    href: 'https://www.refactyl.com/',
  },
  {
    slug: 'mighty-champions',
    company: 'Mighty Champions',
    title: 'Founding Engineer',
    period: 'Jun 2025 — Present',
    summary:
      'Founding engineer for a preventive mental health education organization, working across program sites and its fellowship platform.',
    contributions: [
      'Built web experiences for its audience programs and the fellowship application and enrollment flows.',
      'Developed learner progression features and administrative dashboards for program operations.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    href: 'https://www.mightychampions.org/',
  },
  {
    slug: 'voxa',
    company: 'Voxa',
    title: 'Fractional Tech Lead',
    period: 'Mar 2026 — Jun 2026',
    summary:
      'Technical lead for an AI-powered multilingual speaking coach, working with a team of 8 engineering interns.',
    contributions: [
      'Set technical direction and coordinated implementation across the engineering team.',
      'Worked on product features and the AI voice-feedback pipeline, including code review and release practices.',
    ],
    href: 'https://voxa.club/',
  },
  {
    slug: 'freelance',
    company: 'Self-Employed',
    title: 'Independent Software Engineer',
    period: 'Mar 2021 — Dec 2025',
    summary:
      'Built web products and backend services across independent client engagements.',
    contributions: [
      'Built React interfaces and Node.js/TypeScript APIs that connect product workflows to persisted data.',
      'Worked across requirements, implementation, testing, and deployment for client-facing features.',
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
    href: 'https://www.lutbuilder.ai',
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
    href: 'https://stillcollab.com/',
  },
]

export const education = {
  degree: 'B.Tech, Artificial Intelligence',
  school: 'Ajeenkya D Y Patil University, Pune',
  period: 'Aug 2025 — May 2029',
} as const

export const professionalDevelopment = [
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
    title: 'Web products',
    body: 'React and Next.js interfaces connected to real application workflows, from enrollment to learner progress.',
    tags: ['React', 'Next.js', 'TypeScript'],
  },
  {
    icon: 'server',
    title: 'APIs & services',
    body: 'Node.js and TypeScript services that connect product features to data, integrations, and administrative tools.',
    tags: ['Node.js', 'TypeScript', 'PostgreSQL', 'REST APIs'],
  },
  {
    icon: 'workflow',
    title: 'Migration tooling',
    body: 'Building Refactyl to make application-stack changes reviewable, with explicit checks and visible uncertainty.',
    tags: ['Refactyl', 'TypeScript', 'Verification'],
  },
]

export const focusAreas = [
  { title: 'Web', label: 'Product interfaces', note: 'React · Next.js' },
  { title: 'APIs', label: 'Backend workflows', note: 'Node.js · TypeScript' },
  { title: 'AI', label: 'Developer tooling', note: 'Refactyl · in development' },
  { title: 'Delivery', label: 'Engineering practice', note: 'Testing · CI/CD' },
]

export const toolbelt = [
  'TypeScript', 'JavaScript', 'Python', 'Java', 'Node.js', 'Express', 'Fastify',
  'GraphQL', 'WebSockets', 'Redis', 'PostgreSQL', 'MongoDB', 'MySQL', 'Prisma',
  'Docker', 'AWS EC2', 'AWS Lambda', 'AWS S3', 'CI/CD', 'Jest', 'Next.js', 'React',
]
