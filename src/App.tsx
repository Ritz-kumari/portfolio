import { lazy, Suspense, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import {
  ArrowDown, ArrowDownToLine, ArrowUpRight, Braces, Check,
  ChevronRight, Cloud, Code2, Database, Dumbbell, Globe2, Layers3,
  MapPin, Menu, Minus, Pause, Phone, Play, Plus, ShieldCheck, Sparkles, X,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { projects, skills, experience } from './content'
import type { Project } from './content'
import './App.css'

const SystemsScene = lazy(() => import('./SystemsScene'))
const resumeUrl = `${import.meta.env.BASE_URL}Ritu_Kumari_SDE.docx`
const copyrightYear = new Date().getFullYear()
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
function subscribeMotionPreference(notify: () => void) {
  motionPreference.addEventListener('change', notify)
  return () => motionPreference.removeEventListener('change', notify)
}
function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeMotionPreference, () => motionPreference.matches, () => false)
}
const navigation = [
  { label: 'Work', id: 'work' },
  { label: 'Experience', id: 'experience' },
  { label: 'About', id: 'about' },
]

function Reveal({ children, className = '', delay = 0 }: {
  children: ReactNode; className?: string; delay?: number
}) {
  const reducedMotion = usePrefersReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function HeroVisual() {
  const reducedMotion = usePrefersReducedMotion()
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(true)
  const [tabVisible, setTabVisible] = useState(!document.hidden)
  const container = useRef<HTMLDivElement>(null)
  const animated = !paused && !reducedMotion && inView && tabVisible

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    if (container.current) observer.observe(container.current)
    const onVisibilityChange = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <div className="hero-visual" ref={container}>
      <div className="visual-grid" aria-hidden="true" />
      <div className="visual-topline">
        <span><span className="tiny-dot" /> THE SYSTEMS ORBIT</span>
        <span>FIG. 01</span>
      </div>
      <div className="scene-wrapper" aria-label="Interactive 3D sculpture representing connected systems">
        <Suspense fallback={<div className="scene-loading"><span className="loading-orbit" />Loading the third dimension...</div>}>
          <SystemsScene animated={animated} />
        </Suspense>
      </div>
      <div className="orbit-label orbit-label-frontend"><span className="label-dot orange" />frontend<span className="label-code">&lt;/&gt;</span></div>
      <div className="orbit-label orbit-label-backend"><span className="label-dot purple" />backend<Database size={13} /></div>
      <div className="orbit-label orbit-label-devops"><span className="label-dot green" />DevOps<Layers3 size={15} /></div>
      <div className="orbit-label orbit-label-ai"><span className="label-dot pink" />AI<Sparkles size={15} /></div>
      <div className="visual-bottomline">
        <span><span className="live-dot" /> {reducedMotion ? 'A quieter orbit. Same perspective.' : 'Move your cursor. Find a new perspective.'}</span>
        {!reducedMotion && (
          <button className="scene-control" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play 3D animation' : 'Pause 3D animation'} aria-pressed={paused}>
            {paused ? <Play size={13} /> : <Pause size={13} />}
          </button>
        )}
      </div>
    </div>
  )
}

function ProjectPreview({ project }: { project: Project }) {
  if (project.id === 'tax') {
    return (
      <div className="project-preview tax-preview" aria-hidden="true">
        <div className="preview-overline"><ShieldCheck size={15} /> BUILT FOR COMPLEXITY</div>
        <div className="tax-window">
          <div className="window-bar"><span className="window-dots"><i /><i /><i /></span><span>enterprise / compliance</span><ShieldCheck size={12} /></div>
          <div className="tax-dashboard">
            <div className="mini-sidebar"><span className="mini-logo"><Layers3 size={16} /></span><i /><i /><i /><i /></div>
            <div className="mini-content">
              <div className="mini-heading">Compliance, connected.<span>All systems in sync <i /></span></div>
              <div className="mini-stat-row">
                <div><span>Live clients</span><strong>10<span>+</span></strong></div>
                <div><span>Jurisdictions</span><strong>6<span>+</span></strong></div>
                <div><span>Turnaround</span><strong>&lt;1<span>hr</span></strong></div>
              </div>
              <div className="pipeline-label">ONE PIPELINE. EVERY JURISDICTION.</div>
              <div className="pipeline">{['Collect', 'Validate', 'Promote', 'Export'].map((step, index) => <span key={step}><span className="pipeline-icon">{index === 3 ? <ArrowUpRight size={12} /> : <Check size={12} />}</span>{step}{index !== 3 && <ChevronRight className="pipeline-arrow" size={12} />}</span>)}</div>
              <div className="mini-table"><span>FATCA / CRS reporting</span><span className="mini-pill">Ready to export</span></div>
            </div>
          </div>
        </div>
        <div className="preview-caption"><span>Secure by design.</span><span>Scalable by nature. <ArrowUpRight size={14} /></span></div>
      </div>
    )
  }
  if (project.id === 'fpi') {
    return (
      <div className="project-preview fpi-preview" aria-hidden="true">
        <div className="preview-overline"><Layers3 size={15} /> FOREIGN PORTFOLIO INVESTOR TAXATION</div>
        <div className="fpi-window">
          <div className="fpi-window-bar">
            <span>INVESTOR OPERATIONS</span>
            <span><i className="fpi-status-dot" /> WORKFLOWS CONNECTED</span>
          </div>
          <div className="fpi-workflow-grid">
            <div><span>01</span><strong>Tax</strong><small>Compute &amp; report</small></div>
            <div><span>02</span><strong>Transactions</strong><small>Investments &amp; income</small></div>
            <div><span>03</span><strong>Corporate actions</strong><small>Review &amp; process</small></div>
          </div>
          <div className="fpi-lower">
            <span className="fpi-pill"><ShieldCheck size={13} /> Approvals &amp; audit</span>
            <span className="fpi-shared-core">SHARED JAVA CORE</span>
          </div>
        </div>
        <div className="preview-caption"><span>Six services.</span><span>One connected platform. <ArrowUpRight size={14} /></span></div>
      </div>
    )
  }
  if (project.id === 'insights') {
    return (
      <div className="project-preview insights-preview" aria-hidden="true">
        <div className="preview-overline"><Sparkles size={15} /> FROM DATA TO DECISIONS</div>
        <div className="insights-window">
          <div className="chart-header"><span>Competitive intelligence<strong>Less busywork.<br />More breakthroughs.</strong></span><span className="ai-chip"><Sparkles size={11} /> AI-powered</span></div>
          <div className="chart-bars">{[32, 45, 39, 60, 51, 68, 58, 83, 72, 94, 85, 100].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}</div>
          <div className="chart-baseline"><span>Collect</span><span>Transform</span><span>Discover <ArrowUpRight size={12} /></span></div>
          <div className="insight-note"><span className="insight-icon"><Sparkles size={14} /></span><span>Manual effort, reimagined.<strong>A full day of work. Now under 2 hours.</strong></span></div>
        </div>
      </div>
    )
  }
  if (project.id === 'gym') {
    return (
      <div className="project-preview gym-preview" aria-hidden="true">
        <div className="preview-overline"><Dumbbell size={16} /> GYM MANAGEMENT & FITNESS TRACKING</div>
        <div className="gym-window">
          <strong>UFit</strong>
          <p>Run your gym. Track your progress.</p>
          <div className="gym-window-roles">
            <div><b>Gym owners</b><span>Members & memberships</span></div>
            <div><b>Members</b><span>Workouts & nutrition</span></div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="project-preview cloud-preview" aria-hidden="true">
      <div className="preview-overline"><Cloud size={16} /> YOUR SPACE. YOUR RULES.</div>
      <div className="storage-window">
        <div className="storage-header"><span className="storage-brand"><Cloud size={19} />Storage App<span>Personal project</span></span><span className="storage-avatar">RK</span></div>
        <div className="storage-title">A little more room<br />for your big ideas.</div>
        <div className="folder-row">{['Work', 'Ideas', 'Personal'].map((folder, index) => <div key={folder} className={`folder folder-${index}`}><span className="folder-tab" /><span className="folder-front"><span>{folder}</span><span>{['12', '08', '24'][index]} files</span></span></div>)}</div>
        <div className="storage-footer"><ShieldCheck size={13} /><span>Private by default. Isolated by design.</span><span className="storage-status">RBAC</span></div>
      </div>
    </div>
  )
}

function ProjectLiveLink({ url }: { url: string }) {
  return <a className="project-live-link" href={url}>Live app <ArrowUpRight size={17} aria-hidden="true" /></a>
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const element = dialog.current
    const opener = document.activeElement
    element?.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      element?.close()
      document.body.style.overflow = previousOverflow
      if (opener instanceof HTMLElement && opener.isConnected) {
        opener.focus({ preventScroll: true })
      }
    }
  }, [])

  return (
    <dialog ref={dialog} className="project-dialog" aria-labelledby="dialog-title" onClose={(event) => {
      if (!event.currentTarget.open) onClose()
    }} onCancel={(event) => {
      event.preventDefault()
      onClose()
    }} onKeyDown={(event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }} onClick={(event) => {
      if (event.target === event.currentTarget) {
        const rect = event.currentTarget.getBoundingClientRect()
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose()
      }
    }}>
      <header className="dialog-header">
        <span className="eyebrow">{project.category} / {project.context}</span>
        <button className="icon-button" onClick={onClose} aria-label="Close project details" autoFocus><X size={20} /></button>
      </header>
      <div className="dialog-content">
        <h2 id="dialog-title">{project.title}</h2>
        <p className="dialog-intro">{project.description}</p>
        {project.liveUrl && <ProjectLiveLink url={project.liveUrl} />}
        <section className="dialog-section">
          <h3>Problem it solves</h3>
          <p>{project.problem}</p>
        </section>
        <section className="dialog-section">
          <h3>What I built</h3>
          <ul className="case-study-points">{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
        </section>
        <section className="dialog-section">
          <h3>Tech stack</h3>
          <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </section>
        {project.category === 'Enterprise' && (
          <section className="dialog-section">
            <h3>Impact</h3>
            <p><strong>{project.metric}</strong><br />{project.metricLabel}</p>
          </section>
        )}
      </div>
    </dialog>
  )
}

function App() {
  const reducedMotion = usePrefersReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [filter, setFilter] = useState('All work')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [expandedRole, setExpandedRole] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      }
    }, { rootMargin: '-15% 0px -65% 0px' })
    const sections = document.querySelectorAll('main > section[id]')
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const filteredProjects = projects.filter((project) => filter === 'All work' || project.category === filter)

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'never'}>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <a href="#home" className="wordmark" aria-label="Ritu Kumari, home"><span className="wordmark-name">Ritu<span className="wordmark-dot">.</span></span><span className="wordmark-suffix"><span>FULL STACK</span><span>DEVELOPER</span></span></a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => <a key={item.id} className={activeSection === item.id ? 'active' : ''} href={`#${item.id}`} aria-current={activeSection === item.id ? 'location' : undefined}>{item.label}</a>)}
          </nav>
          <a href="#contact" className="header-contact">Let’s talk <ArrowUpRight size={16} /></a>
          <button className="menu-toggle icon-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        <AnimatePresence>
          {menuOpen && <motion.nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            {[...navigation, { label: 'Contact', id: 'contact' }].map((item) => <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={18} /></a>)}
          </motion.nav>}
        </AnimatePresence>
      </header>

      <main id="main">
        <section className="hero section-container" id="home">
          <Reveal className="hero-copy">
            <div className="hero-eyebrow"><span className="status-dot" /> FULL STACK DEVELOPER <span className="eyebrow-divider" /> DELHI NCR, INDIA</div>
            <h1>Thoughtful<br />interfaces.<br /><span className="serif">Powerful</span> systems<span className="heading-dot">.</span></h1>
            <p className="hero-description">Hi, I’m <strong>Ritu Kumari.</strong> I turn complex problems into<br className="desktop-break" /> intuitive experiences and systems built to scale.</p>
            <div className="hero-actions">
              <a href="#work" className="button button-dark">Explore my work <ArrowDown size={17} /></a>
              <a href={resumeUrl} className="resume-link" download="Ritu_Kumari_Resume.docx">Download CV <ArrowDownToLine size={16} /></a>
            </div>
            <div className="hero-footnote"><span className="hand-drawn-star" aria-hidden="true">✳</span><span>From the first pixel to the last API call.<br /><strong>I build the whole picture.</strong></span></div>
          </Reveal>
          <Reveal className="hero-art" delay={0.12}><HeroVisual /></Reveal>
          <div className="hero-bottom"><span>CREATIVE THINKING. ENGINEERING PRECISION.</span><a href="#work">A little further down <ArrowDown size={13} /></a></div>
        </section>

        <section className="tech-overview section-container" id="tech-stack" aria-labelledby="tech-stack-title">
          <Reveal className="stack-heading">
            <div><span className="eyebrow">MY TOOLKIT</span><h2 id="tech-stack-title">What I work with</h2></div>
          </Reveal>
          <div className="skills-grid">
            {skills.map((group, index) => {
              const Icon = [Code2, Database, Layers3, Sparkles][index]
              return (
                <Reveal key={group.title} delay={index * 0.05} className="skill-card">
                  <h3><Icon size={20} aria-hidden="true" />{group.title}</h3>
                  <p>{group.description}</p>
                  <div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                </Reveal>
              )
            })}
          </div>
          <Reveal className="ai-note"><span className="ai-note-icon"><Sparkles size={18} /></span><span><strong>AI & Copilot workflows:</strong> LLM-powered business insights, validated workout plans, and reusable GitHub Copilot workflow skills. AI-assisted development with Copilot, Cursor, and Claude.</span></Reveal>
        </section>

        <section className="impact-strip section-container" aria-label="Career impact">
          <Reveal className="impact-intro"><span className="eyebrow">LESS TALK.</span><span>Real-world impact.</span></Reveal>
          {[['4+', 'Years of experience'], ['10+', 'Live enterprise clients'], ['6+', 'Supported jurisdictions'], ['< 1 hr', 'Tax reporting turnaround']].map(([value, label], index) => <Reveal className="impact-stat" key={label} delay={index * 0.04}><strong>{value}</strong><span>{label}</span></Reveal>)}
        </section>

        <section id="work" className="work-section section-container section-space">
          <Reveal className="section-heading">
            <div><span className="eyebrow"><span className="section-index">01 /</span> SELECTED WORK</span><h2>Complex challenges.<br /><span className="serif">Considered solutions.</span></h2></div>
            <p>A few things I’ve built.<br />And the difference they’ve made.</p>
          </Reveal>
          <div className="work-toolbar">
            <div className="work-filters" role="group" aria-label="Filter selected work">{['All work', 'Enterprise', 'Personal'].map((category) => <button key={category} className={filter === category ? 'selected' : ''} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}{category === 'All work' && <span>{String(projects.length).padStart(2, '0')}</span>}</button>)}</div>
            <span className="work-count" aria-live="polite">{String(filteredProjects.length).padStart(2, '0')} projects</span>
          </div>
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <Reveal key={project.id} className={`project-card ${['tax', 'fpi'].includes(project.id) ? 'project-featured' : ''}`}>
                <ProjectPreview project={project} />
                <div className="project-information">
                  <div className="project-meta"><span>{project.number} / {project.category.toUpperCase()}</span><span>{project.context}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-list">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <div className="project-card-bottom">
                    {project.liveUrl ? <ProjectLiveLink url={project.liveUrl} /> : <span className="project-result">{project.shortMetric}</span>}
                    <button className="project-open" onClick={() => setSelectedProject(project)} aria-label={`Project details: ${project.title}`}>Project details <ChevronRight size={17} aria-hidden="true" /></button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="work-note"><span className="tiny-dot" /> Enterprise visuals are conceptual. The engineering and impact are real.</p>
        </section>

        <section id="experience" className="experience-section section-space">
          <div className="section-container experience-layout">
            <Reveal className="experience-heading"><span className="eyebrow"><span className="section-index">02 /</span> THE JOURNEY</span><h2>Always building.<br /><span className="serif">Always evolving.</span></h2><p>From research labs to enterprise platforms.<br />Every chapter, a new level of impact.</p><div className="experience-stamp"><Braces size={26} /><span>4+ years of turning<br /><strong>“what if” into “it works.”</strong></span></div></Reveal>
            <div className="timeline">
              {experience.map((role, index) => (
                <Reveal key={role.company} delay={index * 0.06} className={`timeline-item ${expandedRole === index ? 'expanded' : ''}`}>
                  <div className="timeline-dot" />
                  <button className="role-toggle" aria-expanded={expandedRole === index} aria-controls={`role-details-${index}`} onClick={() => setExpandedRole(expandedRole === index ? -1 : index)}>
                    <span><span className="role-date">{role.date}{index === 0 && <span className="current-label">CURRENT</span>}</span><span className="role-company">{role.company}</span><span className="role-title">{role.title} <span>·</span> {role.location}</span></span>
                    <span className="role-expand">{expandedRole === index ? <Minus size={18} /> : <Plus size={18} />}</span>
                  </button>
                  <div id={`role-details-${index}`} className="role-details" hidden={expandedRole !== index}>
                    <p>{role.description}</p>
                    <ul>{role.highlights.map((highlight) => <li key={highlight}><ArrowUpRight size={14} /><span>{highlight}</span></li>)}</ul>
                    <div className="role-tags">{role.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about-section section-container section-space">
          <div className="about-top">
            <Reveal className="about-art"><div className="about-monogram" aria-hidden="true"><span>r</span><span>k</span><span className="monogram-star">✳</span><span className="monogram-caption">CURIOUS MIND.<br />BUILDER AT HEART.</span></div><div className="location-label"><MapPin size={14} /> Based in Delhi NCR, India <Globe2 size={14} /></div></Reveal>
            <Reveal className="about-copy"><span className="eyebrow"><span className="section-index">03 /</span> THE HUMAN BEHIND THE CODE</span><h2>A little curiosity.<br /><span className="serif">A lot of possibility.</span></h2><p>I’m Ritu, a full stack developer who enjoys connecting the dots between great interfaces and the systems that power them.</p><p>My sweet spot? Taking something complicated—multi-tenant architecture, secure access control, or a messy data pipeline—and making it feel effortless. I care about the details, but never lose sight of the bigger picture.</p><div className="about-principles"><span><Check size={14} /> Security-first thinking</span><span><Check size={14} /> End-to-end ownership</span><span><Check size={14} /> Built to scale</span></div><div className="education"><span className="education-icon"><Code2 size={20} /></span><span><strong>Indian Institute of Information Technology, Ranchi</strong><span>B.Tech · Electronics & Communication Engineering</span><small>2018 — 2022 · GPA 9.1 / 10 · Training & Placement Coordinator</small></span></div></Reveal>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="section-container">
            <Reveal className="contact-top"><span className="eyebrow"><span className="section-index">04 /</span> NEXT UP</span><span className="contact-location"><span className="live-dot" /> DELHI NCR, INDIA · OPEN TO CONVERSATIONS</span></Reveal>
            <Reveal className="contact-main"><div><h2>Have a big idea?<br /><span className="serif">Let’s make it real.</span><span className="contact-star" aria-hidden="true">✳</span></h2><p>Interesting challenges. Thoughtful teams. Ambitious projects.<br />I’d love to hear what you’re working on.</p></div><a className="contact-circle" href="mailto:rk6301471@gmail.com" aria-label="Email Ritu Kumari"><ArrowUpRight strokeWidth={1.2} /></a></Reveal>
            <Reveal className="contact-links">
              <a href="mailto:rk6301471@gmail.com" className="contact-email">rk6301471@gmail.com <ArrowUpRight size={23} /></a>
              <div>
                <a href="https://www.linkedin.com/in/kumari-ritz" target="_blank" rel="noopener noreferrer"><span className="linkedin-mark" aria-hidden="true">in</span>LinkedIn<ArrowUpRight size={14} /></a>
                <a href="https://github.com/Ritz-kumari?tab=repositories" target="_blank" rel="noopener noreferrer"><Code2 size={16} aria-hidden="true" />GitHub<ArrowUpRight size={14} aria-hidden="true" /></a>
                <a href={resumeUrl} download="Ritu_Kumari_Resume.docx"><ArrowDownToLine size={16} />Resume<ArrowUpRight size={14} /></a>
                <a href="tel:+916206815310"><Phone size={16} />Let’s connect<ArrowUpRight size={14} /></a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="site-footer section-container"><a className="footer-wordmark" href="#home">ritu<span>.</span></a><p>© {copyrightYear} Ritu Kumari. Built with intention.</p><a href="#home">Back to top <ArrowUpRight size={14} /></a></footer>
      {selectedProject && <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </MotionConfig>
  )
}

export default App
