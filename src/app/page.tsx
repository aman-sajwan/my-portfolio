"use client"
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Linkedin, Menu, X, ArrowUpRight, ExternalLink, Palette } from 'lucide-react';

type ThemeName = 'midnight' | 'parchment' | 'forest' | 'dusk';

interface Theme {
  bg: string;
  surface: string;
  text: string;
  muted: string;
  subtle: string;
  border: string;
  accent: string;
  accentDark: string;
  tag: string;
  tagText: string;
  navBg: string;
  dot: string;
}

const themes: Record<ThemeName, Theme> = {
  midnight: {
    bg: '#020617',
    surface: '#0f172a',
    text: '#f1f5f9',
    muted: '#94a3b8',
    subtle: '#334155',
    border: '#1e293b',
    accent: '#60a5fa',
    accentDark: '#2563eb',
    tag: '#1e293b',
    tagText: '#94a3b8',
    navBg: 'rgba(2,6,23,0.94)',
    dot: '#60a5fa',
  },
  parchment: {
    bg: '#fdfbf7',
    surface: '#f7f3ec',
    text: '#1c1917',
    muted: '#78716c',
    subtle: '#d6d3d1',
    border: '#e7e5e4',
    accent: '#b45309',
    accentDark: '#92400e',
    tag: '#fef3c7',
    tagText: '#78716c',
    navBg: 'rgba(253,251,247,0.94)',
    dot: '#d97706',
  },
  forest: {
    bg: '#081a10',
    surface: '#0d2618',
    text: '#ecfdf5',
    muted: '#6ee7b7',
    subtle: '#064e3b',
    border: '#134e35',
    accent: '#34d399',
    accentDark: '#059669',
    tag: '#0d3320',
    tagText: '#6ee7b7',
    navBg: 'rgba(8,26,16,0.94)',
    dot: '#34d399',
  },
  dusk: {
    bg: '#0d0b16',
    surface: '#171330',
    text: '#f5f3ff',
    muted: '#a78bfa',
    subtle: '#2e1d6b',
    border: '#231e4a',
    accent: '#a78bfa',
    accentDark: '#6d28d9',
    tag: '#1e1a3e',
    tagText: '#a78bfa',
    navBg: 'rgba(13,11,22,0.94)',
    dot: '#a78bfa',
  },
};

const themeOptions: { key: ThemeName; color: string; label: string }[] = [
  { key: 'midnight', color: '#2563eb', label: 'Midnight' },
  { key: 'parchment', color: '#d97706', label: 'Parchment' },
  { key: 'forest', color: '#10b981', label: 'Forest' },
  { key: 'dusk', color: '#7c3aed', label: 'Dusk' },
];

export default function Portfolio() {
  const [activeTheme, setActiveTheme] = useState<ThemeName>('midnight');
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const t = themes[activeTheme];
  const roles = ['Full Stack Engineer', 'React.js Specialist', 'Next.js Developer', 'Frontend Architect'];
  const navLinks = ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          return r.top <= 120 && r.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const role = roles[currentRole];
    let i = 0;
    const timer = setInterval(() => {
      if (i <= role.length) {
        setTypedText(role.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setCurrentRole(p => (p + 1) % roles.length), 2400);
      }
    }, 75);
    return () => clearInterval(timer);
  }, [currentRole]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const skillGroups = [
    { label: 'Languages', skills: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'HTML5', 'CSS3', 'SQL'] },
    { label: 'Frontend', skills: ['React.js', 'Next.js', 'Redux', 'Redux Toolkit', 'Context API'] },
    { label: 'Backend', skills: ['Node.js', 'Django', 'RESTful APIs', 'GraphQL', 'Axios', 'Fetch API'] },
    { label: 'Databases', skills: ['PostgreSQL', 'MySQL', 'NoSQL', 'ORM Integration'] },
    { label: 'Styling', skills: ['Tailwind CSS', 'Material UI (MUI)', 'Bootstrap', 'Figma', 'Responsive Design'] },
    { label: 'DevOps & Tools', skills: ['AWS', 'Nginx', 'Git', 'GitHub', 'Postman', 'Chrome DevTools'] },
    { label: 'Practices', skills: ['Agile/Scrum', 'SEO Optimization', 'WCAG Accessibility', 'Code Review', 'Cross-Browser Compatibility'] },
  ];

  const experience = [
    {
      period: 'Apr 2024 – Nov 2025',
      role: 'Software Engineer',
      company: 'Vastedge',
      location: 'Delhi, India',
      achievements: [
        'Architected and built a fully custom SEO-optimized CMS with dynamic page generation, multi-template layouts, automated sitemap creation, and analytics integration using Next.js and TypeScript.',
        'Designed scalable, reusable React.js UI component libraries for enterprise ERP, PMT, CTMS, and CPQ platforms, improving development velocity across teams.',
        'Developed RESTful and GraphQL API integrations across frontend and backend (Node.js/Django); built automated backup workflows for NetSuite and Salesforce; contributed to Microsoft 365 integrations.',
        'Optimized high-traffic dashboards using React.memo, useCallback, useMemo, code splitting (React.lazy), and list virtualization, resulting in measurably faster load times.',
        'Configured and managed AWS deployments with Nginx reverse proxy, SSL termination, gzip compression, and static asset caching for production environments.',
      ],
      stack: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Python/Django', 'GraphQL', 'RESTful APIs', 'SQL', 'AWS', 'Nginx', 'Git'],
    },
    {
      period: 'Nov 2022 – Feb 2024',
      role: 'Full Stack Developer',
      company: 'PushIdeas INC',
      location: 'Punjab, India',
      achievements: [
        'Built end-to-end CRM features for Intermaan using React.js, Redux, and Material UI — including lead management, contact timelines, pipeline dashboards, and reporting widgets.',
        'Delivered a real-time live sports betting platform with secure JWT authentication and real-time data feeds; built a real estate listing platform with advanced search and dynamic property pages.',
        'Improved codebase maintainability through systematic refactoring and shared UI component patterns; collaborated directly with backend engineers for seamless RESTful API integration.',
      ],
      stack: ['React.js', 'Redux', 'Material UI', 'Node.js', 'RESTful APIs', 'JavaScript (ES6+)', 'Git'],
    },
  ];

  const projects = [
    {
      name: 'Vastedge.com',
      stack: 'Next.js · TypeScript · CMS · SEO · AWS',
      description: 'Corporate site and CMS with dynamic page builder, multi-template support, automated sitemap, metadata management, and analytics integration powering global marketing.',
      link: 'https://vastedge.com',
    },
    {
      name: 'OWB Cloud',
      stack: 'React.js · TypeScript · SQL · REST API · Nginx',
      description: 'Enterprise ERP caretaker platform with data validation dashboards, backup management, recovery status views, and role-based access control for multi-tenant clients.',
      link: null,
    },
    {
      name: 'Alaska – CPQ',
      stack: 'React.js · Next.js · TypeScript · CRM Integration',
      description: 'CPQ sales tool with multi-step product configurator, dynamic pricing UI, quote document preview, and bidirectional CRM data sync for the sales quoting workflow.',
      link: null,
    },
    {
      name: 'ERP-GD Dashboard',
      stack: 'React.js · TypeScript · Material UI · SQL',
      description: 'ERP dashboard with modular UI covering inventory, order management, procurement, and vendor workflows with real-time KPI reporting and data export.',
      link: null,
    },
  ];

  const s = {
    sectionLabel: {
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '3px',
      color: t.muted,
      textTransform: 'uppercase' as const,
      marginBottom: '10px',
    },
    sectionTitle: {
      fontSize: 'clamp(26px, 4vw, 38px)',
      fontWeight: 700,
      letterSpacing: '-0.5px',
      color: t.text,
      marginBottom: '32px',
    },
    tag: {
      fontSize: '12px',
      padding: '3px 10px',
      borderRadius: '4px',
      backgroundColor: t.tag,
      color: t.tagText,
      fontWeight: 500,
      display: 'inline-block',
    },
  };

  return (
    <div style={{ backgroundColor: t.bg, color: t.text, minHeight: '100vh', transition: 'background-color 0.35s, color 0.35s' }}>

      {/* ── Navigation ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: isScrolled ? t.navBg : 'transparent',
        backdropFilter: isScrolled ? 'blur(14px)' : 'none',
        borderBottom: isScrolled ? `1px solid ${t.border}` : 'none',
        transition: 'all 0.3s',
      }}>
        <div style={{ maxWidth: '920px', margin: '0 auto', padding: '0 24px', height: '62px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          <span style={{ fontWeight: 700, fontSize: '17px', letterSpacing: '-0.3px', color: t.text }}>
            Aman Sajwan
          </span>

          {/* Desktop links */}
          <div className="hidden md:flex" style={{ gap: '28px', alignItems: 'center' }}>
            {navLinks.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '13px', fontWeight: 500,
                  color: activeSection === link.toLowerCase() ? t.accent : t.muted,
                  borderBottom: activeSection === link.toLowerCase() ? `1px solid ${t.accent}` : '1px solid transparent',
                  paddingBottom: '2px', transition: 'color 0.2s',
                }}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Theme dots + hamburger */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {themeOptions.map(opt => (
              <button
                key={opt.key}
                onClick={() => setActiveTheme(opt.key)}
                title={opt.label}
                style={{
                  width: '18px', height: '18px', borderRadius: '50%',
                  backgroundColor: opt.color,
                  border: activeTheme === opt.key ? `3px solid ${t.text}` : '2px solid transparent',
                  cursor: 'pointer', transition: 'all 0.2s',
                  outline: activeTheme === opt.key ? `2px solid ${opt.color}` : 'none',
                  outlineOffset: '2px',
                  padding: 0,
                }}
              />
            ))}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.text, marginLeft: '6px' }}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div style={{ backgroundColor: t.navBg, borderTop: `1px solid ${t.border}`, padding: '8px 24px 16px' }}>
            {navLinks.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '11px 0', fontSize: '15px',
                  color: activeSection === link.toLowerCase() ? t.accent : t.muted,
                  borderBottom: `1px solid ${t.border}`,
                }}
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── Main ── */}
      <main style={{ maxWidth: '920px', margin: '0 auto', padding: '0 24px' }}>

        {/* Hero */}
        <section id="home" style={{ paddingTop: '130px', paddingBottom: '88px' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2.5px', color: t.muted, textTransform: 'uppercase', marginBottom: '24px' }}>
            Available for new opportunities
          </p>

          <h1 style={{ fontSize: 'clamp(52px, 9vw, 88px)', fontWeight: 800, letterSpacing: '-3px', lineHeight: 1.0, marginBottom: '20px', color: t.text }}>
            Aman Sajwan
          </h1>

          <div style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 400, color: t.accent, marginBottom: '28px', minHeight: '40px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {typedText}
            <span style={{ display: 'inline-block', width: '2px', height: '1em', backgroundColor: t.accent, animation: 'blink 1s steps(1) infinite', marginLeft: '1px' }} />
          </div>

          <p style={{ fontSize: '16px', lineHeight: 1.75, color: t.muted, maxWidth: '560px', marginBottom: '40px' }}>
            Full Stack Software Engineer with 3+ years of experience delivering scalable enterprise web applications.
            Specialized in React.js, Next.js, TypeScript, Node.js, and Django for global clients in healthcare, finance, and manufacturing.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '52px' }}>
            <a
              href="mailto:sajwanaman986@gmail.com"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '11px 22px', borderRadius: '6px',
                backgroundColor: t.accentDark, color: '#fff',
                fontWeight: 600, fontSize: '14px', textDecoration: 'none',
              }}
            >
              <Mail size={15} /> Get in Touch
            </a>
            <button
              onClick={() => scrollTo('projects')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '11px 22px', borderRadius: '6px',
                border: `1px solid ${t.border}`, backgroundColor: 'transparent',
                color: t.text, fontWeight: 600, fontSize: '14px', cursor: 'pointer',
              }}
            >
              View Projects <ArrowUpRight size={15} />
            </button>
          </div>

          {/* Quick stats row */}
          <div style={{ display: 'flex', gap: '0', borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
            {[
              { value: '3+', label: 'Years Experience' },
              { value: '4+', label: 'Enterprise Platforms' },
              { value: '7+', label: 'Tech Stack' },
            ].map((stat, i) => (
              <div key={i} style={{ flex: 1, padding: '20px 24px', borderRight: i < 2 ? `1px solid ${t.border}` : 'none' }}>
                <p style={{ fontSize: '28px', fontWeight: 800, color: t.accent, letterSpacing: '-1px', lineHeight: 1 }}>{stat.value}</p>
                <p style={{ fontSize: '12px', color: t.muted, marginTop: '4px' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Contact row */}
          <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', marginTop: '28px' }}>
            {[
              { icon: <Mail size={13} />, text: 'sajwanaman986@gmail.com', href: 'mailto:sajwanaman986@gmail.com' },
              { icon: <Phone size={13} />, text: '+91 8979829326', href: 'tel:+918979829326' },
              { icon: <MapPin size={13} />, text: 'Rishikesh, India', href: null },
              { icon: <Linkedin size={13} />, text: 'LinkedIn Profile', href: 'https://linkedin.com' },
            ].map((item, i) =>
              item.href ? (
                <a key={i} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: t.muted, fontSize: '13px', textDecoration: 'none' }}>
                  {item.icon} {item.text}
                </a>
              ) : (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: t.muted, fontSize: '13px' }}>
                  {item.icon} {item.text}
                </span>
              )
            )}
          </div>
        </section>

        {/* About */}
        <section id="about" style={{ paddingTop: '56px', paddingBottom: '72px', borderTop: `1px solid ${t.border}` }}>
          <p style={s.sectionLabel}>About</p>
          <h2 style={s.sectionTitle}>Professional Summary</h2>

          <p style={{ fontSize: '15px', lineHeight: 1.8, color: t.muted, maxWidth: '680px', marginBottom: '20px' }}>
            Full Stack Software Engineer with 3+ years of experience designing and delivering scalable web applications. Proficient in React.js, Next.js, TypeScript, Node.js, Django, and Python. Delivered enterprise platforms including CMS, ERP, CRM, CTMS, and CPQ solutions for global clients across healthcare, finance, and manufacturing.
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: t.muted, maxWidth: '680px', marginBottom: '40px' }}>
            Experienced in RESTful and GraphQL APIs, SQL/NoSQL databases, AWS deployments, and CI/CD workflows. Strong collaborator in Agile/Scrum teams with a track record of delivering production-ready applications.
          </p>

          <div style={{ paddingTop: '28px', borderTop: `1px solid ${t.border}` }}>
            <p style={s.sectionLabel}>Education</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: '16px', color: t.text }}>Bachelor of Computer Applications (BCA)</p>
                <p style={{ color: t.muted, fontSize: '14px', marginTop: '5px' }}>M.I.T Rishikesh, Uttarakhand</p>
              </div>
              <p style={{ color: t.muted, fontSize: '14px', flexShrink: 0 }}>2018 – 2021</p>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" style={{ paddingTop: '56px', paddingBottom: '72px', borderTop: `1px solid ${t.border}` }}>
          <p style={s.sectionLabel}>Experience</p>
          <h2 style={s.sectionTitle}>Work History</h2>

          <div style={{ position: 'relative' }}>
            {/* Timeline vertical line */}
            <div style={{ position: 'absolute', left: '7px', top: '12px', bottom: '32px', width: '1px', backgroundColor: t.border }} />

            {experience.map((exp, idx) => (
              <div key={idx} style={{ paddingLeft: '38px', paddingBottom: idx < experience.length - 1 ? '52px' : '0', position: 'relative' }}>
                {/* Dot */}
                <div style={{
                  position: 'absolute', left: '0', top: '10px',
                  width: '15px', height: '15px', borderRadius: '50%',
                  backgroundColor: t.dot, border: `3px solid ${t.bg}`,
                  boxShadow: `0 0 0 1px ${t.dot}`,
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '6px', marginBottom: '4px' }}>
                  <div>
                    <h3 style={{ fontSize: '19px', fontWeight: 700, color: t.text, margin: 0 }}>{exp.role}</h3>
                    <p style={{ fontSize: '15px', color: t.accent, fontWeight: 600, marginTop: '3px' }}>{exp.company}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '13px', color: t.muted }}>{exp.period}</p>
                    <p style={{ fontSize: '13px', color: t.muted, marginTop: '2px' }}>{exp.location}</p>
                  </div>
                </div>

                <ul style={{ margin: '18px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {exp.achievements.map((a, i) => (
                    <li key={i} style={{ fontSize: '14px', lineHeight: 1.7, color: t.muted, paddingLeft: '16px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, top: '10px', width: '6px', height: '1px', backgroundColor: t.subtle, display: 'block' }} />
                      {a}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '18px' }}>
                  {exp.stack.map((tech, i) => (
                    <span key={i} style={{ fontSize: '12px', padding: '3px 10px', borderRadius: '4px', backgroundColor: t.tag, color: t.tagText, fontWeight: 500 }}>{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" style={{ paddingTop: '56px', paddingBottom: '72px', borderTop: `1px solid ${t.border}` }}>
          <p style={s.sectionLabel}>Skills</p>
          <h2 style={s.sectionTitle}>Technical Skills</h2>

          {skillGroups.map((group, idx) => (
            <div key={idx} style={{
              display: 'flex', alignItems: 'flex-start', gap: '24px',
              padding: '15px 0',
              borderTop: `1px solid ${t.border}`,
              borderBottom: idx === skillGroups.length - 1 ? `1px solid ${t.border}` : 'none',
            }}>
              <span style={{ minWidth: '148px', fontSize: '13px', fontWeight: 600, color: t.text, paddingTop: '5px', flexShrink: 0 }}>
                {group.label}
              </span>
              <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', flex: 1 }}>
                {group.skills.map((skill, i) => (
                  <span key={i} style={{
                    fontSize: '13px', padding: '4px 11px', borderRadius: '4px',
                    backgroundColor: t.tag, color: t.tagText,
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section id="projects" style={{ paddingTop: '56px', paddingBottom: '72px', borderTop: `1px solid ${t.border}` }}>
          <p style={s.sectionLabel}>Projects</p>
          <h2 style={s.sectionTitle}>Key Projects</h2>

          {projects.map((proj, idx) => (
            <div key={idx} style={{ padding: '28px 0', borderTop: `1px solid ${t.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {proj.link ? (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '17px', fontWeight: 700, color: t.text, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      {proj.name}
                      <ExternalLink size={14} style={{ color: t.accent, flexShrink: 0 }} />
                    </a>
                  ) : (
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: t.text, margin: 0 }}>{proj.name}</h3>
                  )}
                  {!proj.link && (
                    <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', backgroundColor: t.tag, color: t.tagText, fontWeight: 500 }}>
                      Private
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '12px', color: t.muted, fontFamily: 'monospace', flexShrink: 0 }}>{proj.stack}</span>
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.75, color: t.muted, maxWidth: '660px', margin: 0 }}>{proj.description}</p>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${t.border}` }} />
        </section>

        {/* Contact */}
        <section id="contact" style={{ paddingTop: '56px', paddingBottom: '88px', borderTop: `1px solid ${t.border}` }}>
          <p style={s.sectionLabel}>Contact</p>
          <h2 style={s.sectionTitle}>Let's Connect</h2>

          <p style={{ fontSize: '15px', lineHeight: 1.75, color: t.muted, maxWidth: '480px', marginBottom: '36px' }}>
            Open to new roles, freelance projects, and technical conversations. Feel free to reach out through any of the channels below.
          </p>

          {[
            { icon: <Mail size={15} />, label: 'Email', value: 'sajwanaman986@gmail.com', href: 'mailto:sajwanaman986@gmail.com' },
            { icon: <Phone size={15} />, label: 'Phone', value: '+91 8979829326', href: 'tel:+918979829326' },
            { icon: <MapPin size={15} />, label: 'Location', value: 'Rishikesh, Uttarakhand, India', href: null },
            { icon: <Linkedin size={15} />, label: 'LinkedIn', value: 'Connect on LinkedIn', href: 'https://linkedin.com' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '15px 0', borderBottom: `1px solid ${t.border}` }}>
              <span style={{ color: t.accent, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: t.muted, minWidth: '74px', letterSpacing: '0.5px', textTransform: 'uppercase', flexShrink: 0 }}>{item.label}</span>
              {item.href ? (
                <a href={item.href} style={{ fontSize: '14px', color: t.text, textDecoration: 'none' }}>{item.value}</a>
              ) : (
                <span style={{ fontSize: '14px', color: t.text }}>{item.value}</span>
              )}
            </div>
          ))}
        </section>

      </main>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${t.border}`, padding: '28px 24px' }}>
        <div style={{ maxWidth: '920px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontSize: '13px', color: t.muted }}>
            © 2026 Aman Sajwan · Built with Next.js
          </p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {themeOptions.map(opt => (
              <button
                key={opt.key}
                onClick={() => setActiveTheme(opt.key)}
                title={opt.label}
                style={{
                  width: '16px', height: '16px', borderRadius: '50%',
                  backgroundColor: opt.color,
                  border: activeTheme === opt.key ? `2px solid ${t.text}` : '2px solid transparent',
                  cursor: 'pointer', transition: 'all 0.2s', padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </footer>

      {/* ── Floating Palette Button ── */}
      <div style={{ position: 'fixed', bottom: '28px', right: '28px', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>

        {/* Theme panel — slides up when open */}
        {isPaletteOpen && (
          <div style={{
            backgroundColor: t.navBg,
            border: `1px solid ${t.border}`,
            borderRadius: '14px',
            padding: '14px 16px',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: t.muted, textTransform: 'uppercase', marginBottom: '2px' }}>Theme</p>
            {themeOptions.map(opt => (
              <button
                key={opt.key}
                onClick={() => { setActiveTheme(opt.key); setIsPaletteOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '4px 0',
                }}
              >
                <span style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  backgroundColor: opt.color, flexShrink: 0,
                  border: activeTheme === opt.key ? `3px solid ${t.text}` : '2px solid transparent',
                  outline: activeTheme === opt.key ? `2px solid ${opt.color}` : 'none',
                  outlineOffset: '2px',
                  display: 'block',
                }} />
                <span style={{
                  fontSize: '13px', fontWeight: activeTheme === opt.key ? 700 : 400,
                  color: activeTheme === opt.key ? t.text : t.muted,
                  whiteSpace: 'nowrap',
                }}>
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Palette FAB */}
        <button
          onClick={() => setIsPaletteOpen(p => !p)}
          title="Switch theme"
          style={{
            width: '48px', height: '48px', borderRadius: '50%',
            backgroundColor: t.accentDark,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            color: '#fff',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Palette size={20} />
        </button>
      </div>

    </div>
  );
}
