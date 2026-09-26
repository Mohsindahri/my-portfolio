import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowDownToLine,
  ArrowRight,
  BadgeCheck,
  Check,
  CodeXml,
  BrainCircuit,
  ExternalLink,
  GraduationCap,
  Code2,
  Github,
  Languages,
  Lightbulb,
  Linkedin,
  MapPin,
  Mail,
  Menu,
  Rocket,
  Send,
  Star,
  Target,
  UserRound,
  Wrench,
  X,
} from 'lucide-react'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Skills', to: '/skills' },
  { label: 'Contact', to: '/contact' },
  { label: 'Project', to: '/#projects' },
]

const technologies = [
  { name: 'Python', mark: '🐍', color: 'python' },
  { name: 'PyTorch', mark: '◔', color: 'pytorch' },
  { name: 'Transformers', mark: '🤗', color: 'hugging' },
  { name: 'L.Ms', mark: '♧', color: 'llms' },
  { name: 'NLP', mark: '▤', color: 'nlp' },
  { name: 'Machine Learning', mark: '⚙', color: 'machine' },
  { name: 'RAG', mark: '▱', color: 'rag' },
  { name: 'Hugging Face', mark: '🤗', color: 'hugging' },
  { name: 'Git', mark: '◆', color: 'git' },
  { name: '12.8', mark: '▤', color: 'database' },
]

const projects = [
  {
    number: '01',
    title: 'Plain Language Generation',
    description: 'Research evaluating small open-source language models for text simplification. The related manuscript is in preparation / under submission.',
    tags: ['NLP', 'Text Simplification', 'LLM Evaluation'],
    preview: 'language',
  },
  {
    number: '02',
    title: 'Sycophancy Evaluation',
    description: 'Empirical research into language-model behavior, sycophancy, and response evaluation.',
    tags: ['AI Safety', 'LLMs', 'Evaluation'],
    preview: 'assistant',
  },
  {
    number: '03',
    title: 'Kaggle Competitions',
    description: 'AI and machine-learning learning and competition activities; nine Kaggle badges earned.',
    tags: ['AI / ML', 'Kaggle', 'Learning'],
    preview: 'evaluation',
  },
]

const programmingSkills = [
  { name: 'Python', mark: '🐍' },
  { name: 'SQL', mark: '▤' },
  { name: 'Dart', mark: '🔹' },
]

const aiFrameworks = [
  { name: 'PyTorch', mark: '🔥' },
  { name: 'Scikit-learn', mark: '🟠' },
  { name: 'Hugging Face', mark: '🤗' },
  { name: 'LoRA / PEFT', mark: '⚙️' },
  { name: 'CUDA', mark: '🟩' },
  { name: 'Generative AI', mark: '✨' },
]

const platforms = [
  { name: 'Jupyter Notebook', mark: '📙' },
  { name: 'Google Colab', mark: '🟠' },
  { name: 'Git & GitHub', mark: '🐙' },
  { name: 'Kaggle', mark: '🔵' },
  { name: 'LaTeX', mark: '📄' },
  { name: 'Hugging Face', mark: '🤗' },
]

const coreSkills = [
  'Machine Learning', 'Deep Learning', 'NLP', 'LLMs', 'Generative AI',
  'Computer Vision', 'Text Simplification', 'LoRA / PEFT', 'Sycophancy Evaluation',
]

const additionalSkills = ['HTML & CSS', 'Flutter', 'Pandas & NumPy', 'Data Preprocessing']

const education = [
  {
    period: '2022 — 2026',
    course: 'B.S. in Artificial Intelligence',
    school: 'Quaid-e-Awam University of Engineering, Science & Technology Nawabshah (QUEST)',
  },
  {
    period: '2021 — 2022',
    course: 'Higher Secondary Education · Pre-Engineering',
    school: 'Government Higher Secondary School, Bucheri · 770/1100 (70.32%)',
  },
]

const highlights = [
  'Google AI Essentials Certified',
  'Generative AI Capstone (Kaggle)',
  'Nine Kaggle AI/ML learning badges',
  'CoreTech Internship (Flutter App Dev)',
  'QSAI — AI Events Leadership',
  'HTML & CSS (Professional Training)',
]

const goals = [
  'Complete my BS(AI) with a strong GPA (> 2.5)',
  'Pursue a Master’s in AI/Robotics (preferably in Spain or France)',
  'Work on a novel, publishable research project',
  'Compete in Kaggle competitions',
  'Build a strong GitHub portfolio',
  'Contribute to real-world AI solutions',
  'Achieve financial independence and travel the world',
]

function ParticleField({ count = 20 }) {
  const prefersReducedMotion = useReducedMotion()
  const particles = useMemo(
    () => Array.from({ length: count }, (_, index) => ({
      left: `${(index * 47 + 9) % 100}%`,
      top: `${(index * 61 + 14) % 100}%`,
      duration: 4 + (index % 5) * 0.7,
      delay: (index % 7) * 0.28,
      size: index % 6 === 0 ? 4 : 3,
    })),
    [count],
  )

  return (
    <div className="particle-field" aria-hidden="true">
      {particles.map((particle, index) => (
        <motion.span
          className="particle"
          key={index}
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
          initial={{ opacity: 0.08 }}
          animate={prefersReducedMotion ? { opacity: 0.22 } : { opacity: [0.12, 0.7, 0.12], y: [0, -12, 0], scale: [0.75, 1.2, 0.75] }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: prefersReducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function MagneticLink({ href, className, children, title, download }) {
  const prefersReducedMotion = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 260, damping: 20, mass: 0.35 })
  const y = useSpring(rawY, { stiffness: 260, damping: 20, mass: 0.35 })

  function handlePointerMove(event) {
    if (prefersReducedMotion || event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    rawX.set((event.clientX - bounds.left - bounds.width / 2) * 0.1)
    rawY.set((event.clientY - bounds.top - bounds.height / 2) * 0.1)
  }

  function resetPosition() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.a
      className={className}
      href={href}
      title={title}
      download={download}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
    >
      {children}
    </motion.a>
  )
}

function handleCardTilt(event) {
  if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const card = event.currentTarget
  const bounds = card.getBoundingClientRect()
  const rotateX = ((bounds.top + bounds.height / 2 - event.clientY) / bounds.height) * 5
  const rotateY = ((event.clientX - bounds.left - bounds.width / 2) / bounds.width) * 7
  card.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`)
  card.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`)
}

function resetCardTilt(event) {
  event.currentTarget.style.setProperty('--tilt-x', '0deg')
  event.currentTarget.style.setProperty('--tilt-y', '0deg')
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="site-header" id="top">
      <div className="header-inner mx-auto flex w-full items-center justify-between px-5 sm:px-8">
        <Link className="wordmark" to="/" aria-label="Mohsin Raza, home">
          <span>MOHSIN</span> RAZA
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`top-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {navigation.map((item) => {
            const isCurrent = item.label === 'Project'
              ? location.pathname === '/' && location.hash === '#projects'
              : location.pathname === item.to && location.hash !== '#projects'

            return <NavLink
              key={item.label}
              className={`nav-pill ${isCurrent ? 'is-active' : ''}`}
              to={item.to}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              {isCurrent && <motion.span className="nav-underline" layoutId="nav-underline" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
            </NavLink>
          })}
        </nav>
      </div>
    </header>
  )
}

function SectionHeading({ eyebrow, children, className = '' }) {
  return (
    <div className={`section-heading ${className}`}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2>{children}</h2>
    </div>
  )
}

function Reveal({ children, className = '', delay = 0 }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      data-reveal
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.48, delay: prefersReducedMotion ? 0 : delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function PageHero({ eyebrow, title, accent, description, image, imageAlt, className = '' }) {
  return (
    <section className={`page-hero ${className}`}>
      <div className="page-hero-copy">
        <p className="hero-kicker"><span>{eyebrow}</span></p>
        <h1 className="page-hero-title">{title} <span>{accent}</span></h1>
        {description && <p className="page-hero-description">{description}</p>}
      </div>
      {image && <img className="page-hero-art" src={image} alt={imageAlt} loading="eager" decoding="async" />}
    </section>
  )
}

function DetailCard({ icon: Icon, title, children, className = '' }) {
  return (
    <section className={`detail-card ${className}`}>
      <h2 className="detail-card-heading"><Icon size={27} aria-hidden="true" /><span>{title}</span></h2>
      {children}
    </section>
  )
}

function AboutPage() {
  const personalDetails = [
    { label: 'Name', value: 'Mohsin Raza', icon: UserRound },
    { label: 'Department', value: 'AI', icon: BrainCircuit },
    { label: 'University', value: 'QUEST, Nawabshah', icon: GraduationCap },
    { label: 'Graduation Date', value: '07/30/2026', icon: BadgeCheck },
    { label: 'Location', value: 'Nawabshah, Pakistan', icon: MapPin },
    { label: 'Languages', value: 'English (professional), Urdu (fluent), Sindhi (native)', icon: Languages },
  ]

  return (
    <main className="content-page about-page">
      <PageHero
        eyebrow="ABOUT ME"
        title="Hi, I’m"
        accent="Mohsin Raza"
        description="Artificial Intelligence Graduate　|　AI/ML Researcher　|　Lifelong Learner"
        image="/assets/about-ai-chip.jpg"
        imageAlt="Red AI processor and circuit artwork from Mohsin’s original portfolio design"
        className="about-page-hero"
      />
      <Reveal className="about-intro">
        <p>
          I’m Mohsin Raza, an Artificial Intelligence graduate from QUEST, Nawabshah. My work and research interests include Artificial Intelligence, Machine Learning, Natural Language Processing, generative AI, and language-model evaluation. I enjoy exploring emerging technology and building practical, intelligent solutions.
        </p>
        <div className="about-actions">
          <a className="outline-button" href="/Mohsin-Raza-CV.pdf" download="Mohsin-Raza-CV.pdf"><ArrowDownToLine size={19} /><span>Download CV</span></a>
          <Link className="outline-button" to="/contact"><Mail size={19} /><span>Contact Me</span></Link>
        </div>
      </Reveal>
      <div className="about-card-grid">
        <Reveal><DetailCard icon={UserRound} title="Personal Details">
          <dl className="personal-details">
            {personalDetails.map(({ label, value, icon: Icon }) => (
              <div className="personal-detail" key={label}>
                <Icon size={17} aria-hidden="true" />
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </DetailCard></Reveal>
        <Reveal delay={0.06}><DetailCard icon={GraduationCap} title="Education">
          <ol className="education-list">
            {education.map(({ period, course, school }) => (
              <li className="education-item" key={period}>
                <span className="education-period">{period}</span>
                <strong>{course}</strong>
                <p>{school}</p>
              </li>
            ))}
          </ol>
        </DetailCard></Reveal>
        <Reveal delay={0.12}><DetailCard icon={Star} title="Key Highlights">
          <ul className="check-list highlight-list">
            {highlights.map((highlight) => <li key={highlight}><Check size={16} aria-hidden="true" /><span>{highlight}</span></li>)}
          </ul>
        </DetailCard></Reveal>
      </div>
      <blockquote className="about-quote"><span aria-hidden="true" /><p>I don’t just want to be a developer,<br />I want to build <strong>things that matter.</strong></p><span aria-hidden="true" /></blockquote>
      <div className="about-lower-grid">
        <Reveal><DetailCard icon={Target} title="My Philosophy" className="philosophy-card">
          <p className="philosophy-motto">Learn <span>→</span> Build <span>→</span> <strong>Create Impact</strong></p>
          <p className="philosophy-copy">I believe in continuous learning, real-world application, and using technology to solve meaningful problems. AI is not just a field for me — it’s a way to make a difference.</p>
          <div className="value-list">
            <div><Lightbulb size={25} aria-hidden="true" /><strong>Problem Solver</strong><span>Finds solutions,<br />not excuses</span></div>
            <div><BrainCircuit size={25} /><strong>Curious</strong><span>Always wants<br />to learn more</span></div>
            <div><BadgeCheck size={25} /><strong>Committed</strong><span>Grows through<br />discipline</span></div>
            <div><Rocket size={25} /><strong>Future Builder</strong><span>Focused on long-term<br />impact</span></div>
          </div>
        </DetailCard></Reveal>
        <Reveal delay={0.08}><DetailCard icon={Rocket} title="My Goals">
          <ul className="check-list goals-list">
            {goals.map((goal) => <li key={goal}><Check size={16} aria-hidden="true" /><span>{goal}</span></li>)}
          </ul>
        </DetailCard></Reveal>
      </div>
    </main>
  )
}

function SkillCard({ mark, name, index }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="skill-card"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.34, delay: prefersReducedMotion ? 0 : index % 4 * 0.045 }}
    >
      <span className="skill-mark" aria-hidden="true">{mark}</span>
      <span>{name}</span>
    </motion.div>
  )
}

function SkillGroup({ icon: Icon, title, items, compact = false }) {
  return (
    <Reveal className={`skill-group ${compact ? 'skill-group-compact' : ''}`}>
      <div className="skill-group-heading"><span className="skill-group-icon"><Icon size={23} aria-hidden="true" /></span><h2>{title}</h2><span className="skill-heading-rule" /></div>
      <div className={`skill-card-grid ${compact ? 'skill-card-grid-compact' : ''}`}>
        {items.map((item, index) => typeof item === 'string'
          ? <SkillCard key={item} mark="✦" name={item} index={index} />
          : <SkillCard key={item.name} mark={item.mark} name={item.name} index={index} />)}
      </div>
    </Reveal>
  )
}

function SkillsPage() {
  return (
    <main className="content-page skills-page">
      <PageHero
        eyebrow="MY SKILLS"
        title="Tools We Build"
        accent="Intelligent Systems"
        description="I work with modern technologies across AI, ML, NLP and development to turn ideas into real-world solutions."
        image="/assets/skills-ai-graphic.jpg"
        imageAlt="Original red artificial-intelligence chip and circuit illustration"
        className="skills-page-hero"
      />
      <div className="skills-groups">
        <SkillGroup icon={CodeXml} title="Programming Languages" items={programmingSkills} compact />
        <SkillGroup icon={BrainCircuit} title="ML / AI Frameworks & Libraries" items={aiFrameworks} />
        <SkillGroup icon={Wrench} title="Tools & Platforms" items={platforms} />
        <SkillGroup icon={Code2} title="Core Skills" items={coreSkills} compact />
        <SkillGroup icon={Star} title="Other Skills" items={additionalSkills} compact />
      </div>
    </main>
  )
}

const contactDetails = [
  { title: 'Email', value: 'mohsinraza2403@gmail.com', detail: '(Will reply as soon as possible)', href: 'mailto:mohsinraza2403@gmail.com', icon: Mail },
  { title: 'LinkedIn', value: 'linkedin.com/in/mohsindahri', detail: '(Let’s connect)', href: 'https://www.linkedin.com/in/mohsindahri', icon: Linkedin },
  { title: 'GitHub', value: 'github.com/Mohsindahri', detail: '(Check out my work)', href: 'https://github.com/Mohsindahri', icon: Github },
  { title: 'Location', value: 'Nawabshah, Pakistan', detail: '(Open to remote & on-site)', href: 'https://maps.google.com/?q=Nawabshah%2C+Pakistan', icon: MapPin },
]

function ContactCard({ contact }) {
  const Icon = contact.icon

  return (
    <Reveal>
      <a className="contact-card" href={contact.href} target={contact.href.startsWith('https://') ? '_blank' : undefined} rel={contact.href.startsWith('https://') ? 'noreferrer' : undefined}>
        <span className="contact-card-icon"><Icon size={27} aria-hidden="true" /></span>
        <span className="contact-card-copy"><strong>{contact.title}</strong><span>{contact.value}</span><small>{contact.detail}</small></span>
        {contact.title !== 'Location' && <ExternalLink className="contact-card-external" size={15} aria-hidden="true" />}
      </a>
    </Reveal>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const subject = formData.get('subject')
    const message = formData.get('message')
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`
    setStatus('Your email app should open with your message ready. This website does not send or store messages.')
    window.location.href = `mailto:mohsinraza2403@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <Reveal>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-grid">
          <label className="form-field" htmlFor="contact-name"><span>Name <b>*</b></span><input autoComplete="name" id="contact-name" name="name" placeholder="Your name" maxLength={100} required /></label>
          <label className="form-field" htmlFor="contact-email"><span>Email <b>*</b></span><input autoComplete="email" id="contact-email" name="email" type="email" placeholder="Your email" maxLength={254} required /></label>
        </div>
        <label className="form-field" htmlFor="contact-subject"><span>Subject <b>*</b></span>
          <select id="contact-subject" name="subject" required defaultValue="">
            <option value="" disabled>Select a subject</option>
            <option value="Project collaboration">Project collaboration</option>
            <option value="Career opportunity">Career opportunity</option>
            <option value="Say hello">Say hello</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label className="form-field" htmlFor="contact-message"><span>Message <b>*</b></span><textarea id="contact-message" name="message" placeholder="Your message…" minLength={10} maxLength={5000} rows={5} required /></label>
        <button className="contact-submit" type="submit"><Send size={19} /><span>Send Message</span></button>
        <p className="form-privacy">Your message is prepared in your email app; it is not sent or saved by this website.</p>
        {status && <p className="form-status" role="status">{status}</p>}
      </form>
    </Reveal>
  )
}

function ContactPage() {
  return (
    <main className="content-page contact-page">
      <PageHero
        eyebrow="GET IN TOUCH"
        title="Let’s Work"
        accent="Together"
        description="Have a project in mind, a collaboration opportunity, or just want to say hello? I’d love to hear from you. Feel free to reach out through any of the channels below or send me a message."
        image="/assets/contact-handshake.jpg"
        imageAlt="Red line-art handshake illustration from Mohsin’s original Contact design"
        className="contact-page-hero"
      />
      <div className="contact-cards-grid">
        {contactDetails.map((contact) => <ContactCard key={contact.title} contact={contact} />)}
      </div>
      <section className="contact-form-section" aria-labelledby="contact-form-heading">
        <div className="contact-form-heading"><div className="contact-heading-icon"><Send size={26} aria-hidden="true" /></div><h2 id="contact-form-heading">Send a Message</h2><span /></div>
        <p className="contact-form-intro">Fill out the form below and I’ll get back to you soon.</p>
        <ContactForm />
      </section>
    </main>
  )
}

function TechStrip() {
  return (
    <section className="tech-section" id="skills" aria-labelledby="tech-heading" data-reveal>
      <div className="tech-heading-wrap">
        <div className="tech-heading-icon"><Code2 size={28} strokeWidth={2.8} /></div>
        <h2 id="tech-heading">Technologies <span>I Work With</span></h2>
      </div>
      <p className="tech-subtitle"><em>Tools and technologies I use to build intelligent systems, work with LLMs and explore AI solutions.</em></p>
      <div className="tech-track" aria-label="AI and development technologies">
        {technologies.map((technology) => (
          <motion.div className="tech-card" key={technology.name} data-reveal whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 360, damping: 24 }}>
            <span className={`tech-mark ${technology.color}`} aria-hidden="true">{technology.mark}</span>
            <span>{technology.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function ProjectPreview({ kind }) {
  if (kind === 'assistant') {
    return (
      <div className="preview-window assistant-preview" aria-hidden="true">
        <div className="preview-toolbar"><i /><i /><i /><span>PROJECT / OVERVIEW</span><b>•••</b></div>
        <div className="preview-sidebar"><span /><span /><span /><span /><span /></div>
        <div className="preview-chat">
          <small>PROJECT PREVIEW</small>
          <div className="chat-question">A project highlight…</div>
          <div className="chat-response"><span /> Project overview and details will be added here.</div>
          <div className="chat-input">More details… <ArrowRight size={11} /></div>
        </div>
      </div>
    )
  }

  if (kind === 'evaluation') {
    return (
      <div className="preview-window evaluation-preview" aria-hidden="true">
        <div className="preview-toolbar"><i /><i /><i /><span>PROJECT / SNAPSHOT</span><b>•••</b></div>
        <div className="evaluation-content">
          <div className="evaluation-labels"><span>AREA 01</span><span>AREA 02</span><span>AREA 03</span></div>
          <div className="chart-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="chart-footer"><span>Project overview</span><strong>Details</strong></div>
        </div>
      </div>
    )
  }

  return (
    <div className="preview-window language-preview" aria-hidden="true">
      <div className="preview-toolbar"><i /><i /><i /><span>PROJECT / OVERVIEW</span><b>•••</b></div>
      <div className="language-content">
        <div className="language-sidebar"><span /><span /><span /><span /></div>
        <div className="language-body">
          <small>PROJECT OVERVIEW</small>
          <div className="text-line long" /><div className="text-line" /><div className="text-line short" />
          <div className="language-result"><span>PROJECT DETAILS</span><i /><i /><i /></div>
        </div>
      </div>
    </div>
  )
}

function Projects() {
  return (
    <section className="projects-section" id="projects" data-reveal>
      <SectionHeading eyebrow="Selected work">Things I’ve <span>Built</span></SectionHeading>
      <p className="section-subtitle">A closer look at <em>my work.</em></p>
      <div className="project-grid">
        {projects.map((project) => (
          <article
            className="project-card"
            key={project.number}
            data-reveal
            onPointerMove={handleCardTilt}
            onPointerLeave={resetCardTilt}
          >
            <ProjectPreview kind={project.preview} />
            <div className="project-copy">
              <span className="project-number">{project.number}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-bottom">
                <div className="project-tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <Link className="project-link" to="/contact" aria-label={`Ask about project ${project.number}`}>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function FocusBanner() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="focus-banner" id="about" data-reveal>
      <div className="focus-copy">
        <span className="focus-overline">WORKING WITH LLMs</span>
        <h2>From Language Models<br />to <span>Real-World Intelligence.</span></h2>
        <p>I explore, experiment and build with Large Language Models to create intelligent systems that can understand, reason and solve real-world problems.</p>
      </div>
      <div className="focus-visual" aria-hidden="true">
        <div className="focus-orbit orbit-one" /><div className="focus-orbit orbit-two" />
        <span className="orbit-node node-prompt">Prompting</span>
        <span className="orbit-node node-reason">Reasoning</span>
        <span className="orbit-node node-finetune">Fine-tuning</span>
        <span className="orbit-node node-rag">RAG</span>
        <span className="orbit-node node-inference">Inference</span>
        <motion.span
          className="orbit-core"
          animate={prefersReducedMotion ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >LLM</motion.span>
        <BrainCircuit className="brain-glow" size={92} strokeWidth={1.1} />
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-grid">
        <div className="footer-profile">
          <Link className="wordmark footer-wordmark" to="/"><span>MOHSIN</span> RAZA</Link>
          <p className="footer-role">AI/ML Enthusiast <b>•</b> Developer <b>•</b> Researcher</p>
          <p className="footer-bio">Building intelligent solutions, exploring language models, and working towards a future in AI, Robotics and beyond.</p>
          <div className="social-links">
            <a href="https://github.com/Mohsindahri" aria-label="GitHub" target="_blank" rel="noreferrer"><Github size={19} /></a>
            <a href="https://linkedin.com/in/mohsindahri" aria-label="LinkedIn" target="_blank" rel="noreferrer" className="linkedin-mark">in</a>
          </div>
          <div className="footer-facts"><span>⌖ &nbsp;Nawabshah, Pakistan</span><span>♙ &nbsp;QUEST — BS(AI)</span><span>▦ &nbsp;Graduation: 07/30/2026</span></div>
        </div>
        <div className="footer-column">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link><Link to="/about">About</Link><Link to="/#projects">Projects</Link><Link to="/about">Research</Link><Link to="/skills">Skills</Link><Link to="/about">Experience</Link><Link to="/contact">Contact</Link>
        </div>
        <div className="footer-column footer-project-links">
          <h3>Projects</h3>
          <Link to="/#projects">Plain Language Generation</Link><Link to="/#projects">Sycophancy Evaluation</Link><Link to="/#projects">Kaggle Competitions</Link><Link to="/#projects">More Projects <ArrowRight size={14} /></Link>
        </div>
        <div className="footer-column">
          <h3>Resources</h3>
          <a href="https://github.com/Mohsindahri" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.kaggle.com/" target="_blank" rel="noreferrer">Kaggle</a><a href="https://grow.google/" target="_blank" rel="noreferrer">Google Certifications</a><a href="https://linkedin.com/in/mohsindahri" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
        <div className="footer-column connect-column">
          <h3>Let’s Connect</h3>
          <p>Got a project, opportunity, or just want to talk? Feel free to reach out!</p>
          <a className="email-link" href="mailto:mohsinraza2403@gmail.com"><Mail size={16} /> mohsinraza2403@gmail.com</a>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 Mohsin Raza. All rights reserved.</span><a href="#top">Back to top</a></div>
    </footer>
  )
}

function HomePage() {
  const pageRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const responsiveAnimations = gsap.matchMedia(pageRef.current)

    responsiveAnimations.add(
      {
        reduced: '(prefers-reduced-motion: reduce)',
        desktop: '(min-width: 761px)',
      },
      (context) => {
        const { reduced, desktop } = context.conditions
        const revealItems = gsap.utils.toArray('[data-reveal]', pageRef.current)

        if (reduced) {
          gsap.set(revealItems, { autoAlpha: 1, y: 0 })
          return
        }

        revealItems.forEach((item) => {
          gsap.fromTo(
            item,
            { autoAlpha: 0, y: 26 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.68,
              ease: 'power2.out',
              scrollTrigger: { trigger: item, start: 'top 88%', once: true },
            },
          )
        })

        if (desktop) {
          gsap.to('.hero-art', {
            yPercent: 9,
            ease: 'none',
            scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 0.7 },
          })
          gsap.to('.focus-visual', {
            yPercent: -7,
            ease: 'none',
            scrollTrigger: { trigger: '.focus-banner', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
          })
        }
      },
    )

    return () => responsiveAnimations.revert()
  }, [])

  return (
    <main className="home-page" ref={pageRef}>
      <section className="hero-section" id="home" aria-labelledby="home-heading">
        <ParticleField count={18} />
        <motion.div
          className="hero-art"
          aria-hidden="true"
          initial={prefersReducedMotion ? false : { opacity: 0, x: 30, scale: 1.025 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="hero-copy">
          <motion.p
            className="hero-kicker"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14 }}
          >
            <span>AI</span><b>/</b> LLM <b>/</b> RESEARCH
          </motion.p>
          <motion.h1
            className="hero-title"
            id="home-heading"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.72, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            Building Intelligent<br />Systems with <span>LLMs &amp; AI.</span>
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.47 }}
          >
            I explore language models, artificial intelligence,<br className="desktop-break" /> and the technology shaping tomorrow.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.62 }}
          >
            <MagneticLink className="outline-button" href="/Mohsin-Raza-CV.pdf" download="Mohsin-Raza-CV.pdf" title="Download Mohsin Raza’s CV as a PDF">
              <ArrowDownToLine size={20} /> <span>Download CV</span>
            </MagneticLink>
            <MagneticLink className="outline-button" href="#contact">
              <Mail size={20} /> <span>Contact Me</span>
            </MagneticLink>
          </motion.div>
        </div>
      </section>
      <TechStrip />
      <Projects />
      <FocusBanner />
    </main>
  )
}

function ScrollToRouteTarget() {
  const { pathname, hash } = useLocation()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (hash) {
      const timer = window.setTimeout(() => {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
      }, 320)
      return () => window.clearTimeout(timer)
    }

    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }, [pathname, hash, prefersReducedMotion])

  return null
}

function RoutedPortfolio() {
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="portfolio-shell">
      <ScrollToRouteTarget />
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          className="route-view"
          key={location.pathname}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: 'easeOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <RoutedPortfolio />
    </BrowserRouter>
  )
}

export default App
