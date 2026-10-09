export type Project = {
  id: string
  number: string
  category: 'Enterprise' | 'Personal'
  context: string
  title: string
  description: string
  metric: string
  metricLabel: string
  shortMetric: string
  tags: string[]
  details: string[]
}

export const projects: Project[] = [
  {
    id: 'tax',
    number: '01',
    category: 'Enterprise',
    context: 'Alvarez & Marsal',
    title: 'Enterprise Tax Platform',
    description: 'Making complex compliance feel simple. A secure, multi-tenant platform that connects data collection, validation, and jurisdiction-specific reporting.',
    metric: '3–4 days → under 1 hour',
    metricLabel: 'Tax team turnaround across 10+ live enterprise clients',
    shortMetric: 'Days of work. Under an hour.',
    tags: ['FastAPI', 'React', 'Celery + Redis', 'SQL Server', 'Zustand', 'Entra ID'],
    details: [
      'Architected an asynchronous collect → validate → promote → export pipeline with per-tenant isolation. Live across 10+ enterprise clients, with 50+ more onboarding.',
      'Designed a centralized, scope-aware RBAC engine with a three-tier role model spanning client, jurisdiction, and tax-type permissions.',
      'Unified Entra ID SSO, RS256 JWTs, and bcrypt-hashed API keys in a single FastAPI authentication service, with silent token refresh and cross-tab session synchronization.',
      'Built composable authentication and permission guards backed by a shared Zustand store, replacing scattered access-control logic.',
      'Created a configuration-driven FATCA/CRS export engine supporting 6+ countries, plus a blob-backed rule engine so compliance updates do not require a code release.',
    ],
  },
  {
    id: 'insights',
    number: '02',
    category: 'Enterprise',
    context: 'Alvarez & Marsal',
    title: 'Business Intelligence & Automation',
    description: 'From scattered data to clear decisions. An end-to-end pipeline for competitive insights, automated analytics, and AI-powered business summaries.',
    metric: 'A full day → under 2 hours',
    metricLabel: 'Manual collection effort reduced; around 45 minutes for smaller volumes',
    shortMetric: 'Less manual effort. More insight.',
    tags: ['Python', 'Selenium', 'ETL pipelines', 'LLM integration', 'Third-party APIs'],
    details: [
      'Engineered a data automation pipeline connecting Selenium-based scraping, third-party APIs, and social analytics platforms across multiple brands.',
      'Collected competitive KPIs, sales trends, and brand performance data, reducing a full day of manual work to under two hours.',
      'Built scalable ETL pipelines to clean, standardize, and transform multi-source datasets into structured analytical formats.',
      'Integrated LLM-powered workflows to generate business insights, comparative summaries, and KPI dashboards, removing manual analysis from the collection-to-insight cycle.',
    ],
  },
  {
    id: 'cloud',
    number: '03',
    category: 'Personal',
    context: 'Independent project',
    title: 'Cloud Storage Platform',
    description: 'A familiar idea with a security-first foundation. A full-stack, Google Drive-style storage app built around private spaces and granular access.',
    metric: 'One platform. Isolated accounts.',
    metricLabel: 'Per-user separation of files and metadata',
    shortMetric: 'Your files. Only your files.',
    tags: ['React', 'Node.js', 'Express.js', 'OAuth 2.0', 'RBAC'],
    details: [
      'Built a full-stack, multi-tenant cloud storage application from scratch using React, Node.js, and Express.js.',
      'Enforced strict per-user isolation to prevent cross-account access to files and metadata.',
      'Implemented Google OAuth 2.0 / OpenID Connect alongside a custom authentication layer for flexible sign-in.',
      'Designed RBAC and resource-level access checks layered on a secure authentication and authorization pipeline.',
      'Prioritized scoped access, session handling, and tenant-level data segregation. Currently optimizing performance before cloud deployment.',
    ],
  },
]

export const experience = [
  {
    company: 'Alvarez & Marsal',
    title: 'Associate',
    date: 'MAR 2025 — PRESENT',
    location: 'Gurugram, India',
    description: 'Building enterprise platforms where secure architecture meets real business impact.',
    highlights: [
      'Architected multi-tenant FATCA/CRS reporting for 10+ live clients; cut turnaround from 3–4 days to under an hour.',
      'Designed centralized RBAC and unified SSO, JWT, and API-key authentication.',
      'Automated data collection and AI-driven insights; reduced a full day of manual work to under two hours.',
    ],
    tags: ['React', 'FastAPI', 'Celery', 'Redis', 'SQL Server'],
  },
  {
    company: 'Tata Consultancy Services',
    title: 'Full Stack Developer',
    date: 'AUG 2022 — MAR 2025',
    location: 'R&I Labs, Bengaluru',
    description: 'Modernizing legacy systems and building faster, more scalable experiences at Research & Innovation Labs.',
    highlights: [
      'Led migration from legacy PHP to React and Django, reducing technical debt by 30%.',
      'Optimized REST APIs, lazy loading, and server-side rendering: 20% faster API responses and 35% faster page loads.',
      'Partnered with UI/UX and backend teams, using Python, NumPy, and Pandas for data-informed design decisions.',
    ],
    tags: ['React', 'Django', 'REST APIs', 'Python', 'SSR'],
  },
  {
    company: 'The first chapter',
    title: 'Java Developer Intern',
    date: 'JAN 2022 — JUL 2022',
    location: 'Engineering internship',
    description: 'Developing a foundation in reliable releases, automated testing, and backend performance.',
    highlights: [
      'Enhanced automated testing with JUnit, reducing deployment failures by 40%.',
      'Optimized backend queries, cutting API latency by 25%.',
    ],
    tags: ['Java', 'JUnit', 'Query optimization'],
  },
]

export const skills = [
  {
    title: 'Interfaces & experiences',
    items: ['React', 'Next.js', 'JavaScript', 'HTML5 / CSS3', 'Redux', 'Zustand', 'Responsive UI'],
  },
  {
    title: 'APIs & data systems',
    items: ['Python', 'FastAPI', 'Django', 'Node.js', 'Express', 'SQL Server', 'PostgreSQL', 'MongoDB', 'Celery / Redis'],
  },
  {
    title: 'Cloud & delivery',
    items: ['AWS', 'Azure Container Apps', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Nginx'],
  },
  {
    title: 'Security & architecture',
    items: ['Multi-tenancy', 'RBAC', 'OAuth / OIDC', 'JWT / RS256', 'Entra ID SSO', 'System design', 'Event-driven systems'],
  },
]
