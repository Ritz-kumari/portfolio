export type Project = {
  id: string
  number: string
  category: 'Enterprise' | 'Personal'
  context: string
  title: string
  description: string
  problem: string
  metric: string
  metricLabel: string
  shortMetric: string
  tags: string[]
  details: string[]
  liveUrl?: string
}

export const projects: Project[] = [
  {
    id: 'tax',
    number: '01',
    category: 'Enterprise',
    context: 'Alvarez & Marsal',
    title: 'Enterprise Tax Platform',
    description: 'Making complex compliance feel simple. A secure, multi-tenant platform that connects data collection, validation, and jurisdiction-specific reporting.',
    problem: 'Tax teams needed to collect and validate client data, then turn it into reports that meet different jurisdictions’ requirements. Doing those steps separately made every reporting cycle slower.',
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
    problem: 'Analysts spent much of the day gathering and reconciling competitive data from different sources before they could compare results.',
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
    title: 'Storage App',
    description: 'A Google Drive-style app for uploading, organizing, and accessing documents in a private workspace.',
    problem: 'Documents get scattered across devices and folders, making them hard to find. A shared storage service also needs to keep each account’s files and metadata separate.',
    metric: 'One platform. Isolated accounts.',
    metricLabel: 'Per-user separation of files and metadata',
    shortMetric: 'Your files. Only your files.',
    tags: ['React', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Redis', 'Amazon S3', 'CloudFront', 'Authentication & authorization', 'RBAC', 'bcrypt', 'OAuth 2.0 / OIDC', 'Resend', 'Razorpay'],
    details: [
      'File management: Upload, open, download, rename, and delete files from a single browser workspace.',
      'Folder organization: Create nested folders, navigate directories, and rename or delete folders.',
      'Direct uploads: The Express API starts and confirms each upload, while the browser sends file data directly to Amazon S3 using a presigned URL.',
      'Private access: The server checks ownership before granting access to files or folders and uses signed URLs for viewing or downloading files.',
      'Authentication: Implemented email/password registration and login with bcrypt password hashing, email verification codes, and optional Google OAuth 2.0 / OpenID Connect sign-in.',
      'Session management: Stores expiring sessions in Redis; email/password login uses a signed, HTTP-only, Secure cookie. Supports single-session logout and sign-out from all sessions.',
      'Authorization: Protected file and directory APIs with authentication middleware and per-user ownership checks to restrict access to each account’s files and metadata. Role-based middleware gates administrative user-management operations.',
      'Storage architecture: MongoDB stores account data and file and folder metadata; S3 stores file contents; CloudFront is configured for signed file delivery.',
      'Administration and billing: Includes role-based account administration, storage plan selection, and a Razorpay subscription integration.',
    ],
  },
  {
    id: 'gym',
    number: '04',
    category: 'Personal',
    context: 'Independent project · UFit',
    title: 'GymDashboard',
    description: 'A dashboard for gym owners to manage members and for members to track workouts, nutrition, and progress.',
    problem: 'Gym owners often track memberships in spreadsheets while members log workouts and meals elsewhere. That makes it hard to keep member records current or see fitness progress over time.',
    metric: 'One dashboard, two roles',
    metricLabel: 'Separate workspaces for gym owners and members',
    shortMetric: 'Live on AWS',
    tags: ['React', 'Vite', 'Recharts', 'Python', 'FastAPI', 'PostgreSQL / Neon', 'SQLAlchemy', 'Alembic', 'Authentication & authorization', 'RBAC', 'JWT', 'bcrypt', 'Razorpay', 'Resend', 'Docker', 'AWS Lambda', 'API Gateway', 'ECR', 'Amazon S3', 'CloudFront'],
    details: [
      'Owner dashboard: Review member records and upcoming expirations, renew memberships, and manage which members have access to personal training.',
      'Member onboarding: Owners can create and revoke invite codes. The app includes email delivery through Resend; sending invites to other addresses requires a verified sender domain.',
      'Training plans: Owners can assign plans, and members can set fitness goals and generate a weekly workout plan. The optional AI generator validates the plan before saving it.',
      'Fitness tracking: Members log workouts and meals, mark sessions complete, and estimate calories burned from completed workouts.',
      'Progress tracking: Members record check-ins and body measurements and view changes over time.',
      'Authentication: Implemented owner and member registration and login with bcrypt password hashing and signed JWT bearer access tokens.',
      'Authorization and tenant isolation: Added role-based access control with separate owner/member API dependencies. Scope owner operations to their own gym and trainer access to members in that gym; restrict member records to the authenticated member. Validate account and role on protected API requests.',
      'Subscriptions and billing: Enforce gym subscription status for dashboard access and integrate Razorpay for paid plans, with a free-plan claim option.',
      'AWS deployment: CloudFront serves the React frontend from private S3 and sends API requests through API Gateway to a Dockerized FastAPI service on Lambda. Neon PostgreSQL stores the app data.',
    ],
    liveUrl: 'https://d2v72f3tw93ktp.cloudfront.net/',
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
    title: 'Frontend',
    description: 'Responsive interfaces, reusable components, and shared application state.',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML / CSS', 'Vite', 'Redux', 'Zustand'],
  },
  {
    title: 'Backend',
    description: 'REST API design, dependency injection, data validation, database modeling, background jobs, and automated testing.',
    items: ['Java', 'Spring Boot', 'JUnit', 'Python', 'FastAPI', 'Django', 'Node.js', 'Express', 'PostgreSQL / Neon', 'SQL Server', 'MongoDB', 'Celery', 'Redis', 'RBAC', 'OAuth / OIDC', 'JWT', 'Entra ID'],
  },
  {
    title: 'DevOps',
    description: 'Container builds, GitHub Actions CI/CD workflows, and application deployment on AWS and Azure, with cloud logging and monitoring.',
    items: ['Docker', 'GitHub Actions', 'Kubernetes', 'Nginx', 'Azure Container Apps', 'AWS Lambda', 'Amazon EC2', 'API Gateway', 'Amazon ECR', 'Amazon S3', 'CloudFront', 'Amazon CloudWatch Logs'],
  },
  {
    title: 'Generative AI',
    description: 'I work with language models, RAG pipelines, chatbots, and reusable agent skills. I’ve used LLMs to summarize business data and generate structured workout plans that the app validates before saving.',
    items: ['LLM integration', 'Prompt engineering', 'Retrieval-augmented generation (RAG)', 'Chatbot development', 'Reusable agent skills', 'Structured outputs', 'Response validation'],
  },
]
