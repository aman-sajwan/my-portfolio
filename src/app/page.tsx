"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Code,
  Briefcase,
  Award,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  ChevronRight,
  Terminal,
  Zap,
  Rocket,
  Star,
  Download,
  Send,
  ArrowRight,
  Sparkles,
  Database,
  Layout,
  Server,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Rotate3d,
  FileText,
  Boxes,
  Cpu,
  Cloud,
  Wrench,
  Flame,
  GraduationCap,
  Layers,
} from "lucide-react";

import {
  personalInfo,
  technicalSkills,
  experiences,
  keyProjects,
  skillClouds,
} from "../data/portfolioData";

import Navbar from "../components/Navbar";
import Card3DTilt from "../components/Card3DTilt";
import ResumeModal from "../components/ResumeModal";

// Dynamic imports with ssr: false for Three.js components to guarantee zero SSR hydration issues
const ThreeHeroScene = dynamic(() => import("../components/ThreeHeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[620px] rounded-3xl bg-slate-900/50 flex items-center justify-center border border-slate-800">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
        <span className="text-xs text-cyan-400 font-mono tracking-wider">
          Initializing 3D Universe...
        </span>
      </div>
    </div>
  ),
});

const ThreeSkillGlobe = dynamic(() => import("../components/ThreeSkillGlobe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] rounded-2xl bg-slate-900/50 flex items-center justify-center border border-slate-800">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
        <span className="text-xs text-cyan-400 font-mono">
          Loading 3D Skill Constellation...
        </span>
      </div>
    </div>
  ),
});

const ThreeAmbientBackground = dynamic(
  () => import("../components/ThreeAmbientBackground"),
  { ssr: false }
);

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [skillsView, setSkillsView] = useState<"matrix" | "3d">("3d");
  const [activeExpTab, setActiveExpTab] = useState(0);

  // Typewriter roles
  const roles = [
    "Full Stack Software Engineer",
    "Python & FastAPI Architect",
    "React & Next.js Specialist",
    "RAG & AI Solutions Builder",
    "Cloud & Microservices Engineer",
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const fullText = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 85;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedRole(fullText.substring(0, typedRole.length + 1));
        if (typedRole === fullText) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setTypedRole(fullText.substring(0, typedRole.length - 1));
        if (typedRole === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedRole, isDeleting, currentRoleIndex]);

  // Section observer for scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "skills", "projects", "contact"];
      const scrollPos = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({ name: "", email: "", message: "" });
    }, 4000);
  };

  const stats = [
    { label: "Experience", value: "3+ Years", icon: Briefcase, desc: "Designing scalable platforms" },
    { label: "Enterprise Platforms", value: "4+", icon: Boxes, desc: "CMS, ERP, CRM, CTMS & CPQ" },
    { label: "Key Tech Stack", value: "25+", icon: Code, desc: "Python, FastAPI, Next.js, Docker" },
    { label: "Client Satisfaction", value: "100%", icon: Star, desc: "Global production systems" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative selection:bg-cyan-500 selection:text-black">
      {/* 3D Ambient Canvas Background */}
      <ThreeAmbientBackground />

      {/* Decorative Radial Lighting Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[650px] h-[650px] bg-blue-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Navigation */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} activeSection={activeSection} />

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      <main className="relative z-10">
        {/* ========================================================= */}
        {/* 1. HERO SECTION WITH THREE.JS INTERACTIVE 3D SCENE        */}
        {/* ========================================================= */}
        <section
          id="home"
          className="min-h-screen pt-28 lg:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center"
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headline & Bio */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Status Pill */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md shadow-md shadow-cyan-500/10">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-cyan-300 tracking-wide">
                  Available for High-Impact Software Engineering Roles
                </span>
              </div>

              {/* Title & Name */}
              <div className="space-y-2">
                <h2 className="text-sm sm:text-base font-mono tracking-widest text-slate-400 uppercase">
                  Hello World, I'm
                </h2>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
                  {personalInfo.name}
                </h1>
                <div className="h-14 sm:h-16 flex items-center">
                  <span className="text-xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {typedRole}
                  </span>
                  <span className="w-1 h-7 sm:h-9 bg-cyan-400 ml-1 animate-pulse" />
                </div>
              </div>

              {/* Bio summary */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Full Stack Software Engineer with{" "}
                <span className="text-cyan-400 font-semibold">3+ years of experience</span>{" "}
                delivering enterprise platforms across healthcare, finance, and manufacturing.
                Specialized in <span className="text-white font-medium">FastAPI, Django, Python automation, React.js, Next.js, RAG AI,</span> and{" "}
                <span className="text-white font-medium">Docker/Azure cloud deployments</span>.
              </p>

              {/* Quick Contact & Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Get in Touch
                </a>

                <button
                  onClick={() => setIsResumeOpen(true)}
                  className="px-6 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-semibold text-sm transition-all flex items-center gap-2 shadow-sm"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  View Resume
                </button>

                <a
                  href="#projects"
                  className="px-6 py-3 rounded-2xl bg-slate-900/60 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-semibold text-sm transition-all flex items-center gap-2"
                >
                  <span>Key Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Social / Direct contacts badge */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  {personalInfo.email}
                </a>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {personalInfo.location}
                </span>
                <span>•</span>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Right Column: 3D Interactive Three.js Scene */}
            <div className="lg:col-span-6">
              <ThreeHeroScene />
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-slate-800/80">
            {stats.map((stat, idx) => (
              <Card3DTilt key={idx} maxTilt={6}>
                <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md hover:border-cyan-500/40 transition-all group">
                  <stat.icon className="w-6 h-6 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">{stat.label}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{stat.desc}</div>
                </div>
              </Card3DTilt>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. ABOUT & HIGHLIGHTS SECTION                             */}
        {/* ========================================================= */}
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              Engineered for Scalability & Impact
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              About Me & Technical Foundation
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Transforming complex enterprise requirements into high-performance web applications and automated microservices.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Left: Professional Summary Card */}
            <div className="md:col-span-7">
              <Card3DTilt maxTilt={5}>
                <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl relative overflow-hidden group">
                  <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-bold">
                      <Code className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        Full Stack Software Engineer
                      </h3>
                      <p className="text-xs text-cyan-400 font-mono">
                        3+ Years Production Experience
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-5">
                    {personalInfo.summary}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span>RAG (AI) Systems</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span>Python Automation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span>FastAPI & Django</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span>Next.js & React</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span>Docker & Azure</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span>CI/CD Pipelines</span>
                    </div>
                  </div>
                </div>
              </Card3DTilt>
            </div>

            {/* Right: Education & Award Cards */}
            <div className="md:col-span-5 space-y-6">
              {/* Award */}
              <Card3DTilt maxTilt={6}>
                <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 backdrop-blur-xl relative">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                      <Star className="w-6 h-6 fill-amber-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Recognition & Honor
                      </div>
                      <h4 className="text-lg font-bold text-white">
                        {personalInfo.award.title}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {personalInfo.award.company} • {personalInfo.award.year}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    Recognized for exceptional engineering contributions, building core enterprise UI libraries, and architecting the SEO-optimized CMS platform.
                  </p>
                </div>
              </Card3DTilt>

              {/* Education */}
              <Card3DTilt maxTilt={6}>
                <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                        Education
                      </div>
                      <h4 className="text-lg font-bold text-white">
                        {personalInfo.education.degree}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {personalInfo.education.period}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-200 mt-2">
                    {personalInfo.education.institution}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Focused on Computer Applications, Data Structures, Software Engineering, and Database Management Systems.
                  </p>
                </div>
              </Card3DTilt>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. PROFESSIONAL EXPERIENCE (Interactive Timeline)         */}
        {/* ========================================================= */}
        <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" />
              Career Journey
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Professional Experience
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              A track record of delivering production-grade microservices, AI pipelines, enterprise UIs, and cloud integrations.
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <Card3DTilt key={idx} maxTilt={4}>
                <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 backdrop-blur-xl transition-all relative overflow-hidden group">
                  {/* Subtle top indicator */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {exp.role}
                        </h3>
                        <span className="text-slate-500 font-light">@</span>
                        <span className="text-xl font-bold text-cyan-400">
                          {exp.company}
                        </span>

                        {exp.current && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            Current Role
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 mt-2 font-mono">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                          {exp.location}
                        </span>
                        <span>•</span>
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Achievements bullet list */}
                  <div className="mt-6 space-y-3">
                    {exp.achievements.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                        <ChevronRight className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="mt-8 pt-6 border-t border-slate-800/80">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      Technologies & Tools
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-xl text-xs font-medium bg-slate-950/80 border border-slate-700/80 text-cyan-300 hover:border-cyan-400 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card3DTilt>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. TECHNICAL SKILLS (3D GLOBE & CATEGORIZED MATRIX)       */}
        {/* ========================================================= */}
        <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                <Rotate3d className="w-3.5 h-3.5" />
                Technical Mastery
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Skills & Tech Stack
              </h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
                Comprehensive full-stack toolset covering languages, backend microservices, modern frontends, AI RAG workflows, databases, and DevOps automation.
              </p>
            </div>

            {/* View Switcher Toggle */}
            <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setSkillsView("3d")}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                  skillsView === "3d"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md shadow-cyan-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Rotate3d className="w-4 h-4" />
                3D Interactive Globe
              </button>
              <button
                onClick={() => setSkillsView("matrix")}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                  skillsView === "matrix"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md shadow-cyan-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers className="w-4 h-4" />
                Categorized Matrix
              </button>
            </div>
          </div>

          {/* Conditional Skills View */}
          {skillsView === "3d" ? (
            <div className="space-y-8">
              <ThreeSkillGlobe />

              {/* Quick skills tags grid below the globe */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {Object.entries(technicalSkills).map(([catKey, list]) => (
                  <div
                    key={catKey}
                    className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800 text-center"
                  >
                    <div className="text-xs font-bold text-cyan-400 capitalize mb-1">
                      {catKey.replace(/([A-Z])/g, " $1")}
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      {list.length} Technologies
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 1. Languages */}
              <Card3DTilt maxTilt={6}>
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                      <Code className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">Languages</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {technicalSkills.languages.map((item, i) => (
                        <span key={i} className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/80 text-amber-300 font-medium border border-slate-700">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-4 font-mono">Core Development</div>
                </div>
              </Card3DTilt>

              {/* 2. Frontend */}
              <Card3DTilt maxTilt={6}>
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                      <Layout className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">Frontend</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {technicalSkills.frontend.map((item, i) => (
                        <span key={i} className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/80 text-cyan-300 font-medium border border-slate-700">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-4 font-mono">Modern UI & Extensions</div>
                </div>
              </Card3DTilt>

              {/* 3. Backend */}
              <Card3DTilt maxTilt={6}>
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                      <Server className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">Backend & AI</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {technicalSkills.backend.map((item, i) => (
                        <span key={i} className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/80 text-emerald-300 font-medium border border-slate-700">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-4 font-mono">APIs, Microservices & RAG</div>
                </div>
              </Card3DTilt>

              {/* 4. Auth & Security */}
              <Card3DTilt maxTilt={6}>
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">Auth & Security</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {technicalSkills.authAndSecurity.map((item, i) => (
                        <span key={i} className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/80 text-rose-300 font-medium border border-slate-700">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-4 font-mono">SSO, JWT & RBAC</div>
                </div>
              </Card3DTilt>

              {/* 5. Databases */}
              <Card3DTilt maxTilt={6}>
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-lime-500/20 text-lime-400 flex items-center justify-center mb-4">
                      <Database className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">Databases</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {technicalSkills.databases.map((item, i) => (
                        <span key={i} className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/80 text-lime-300 font-medium border border-slate-700">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-4 font-mono">SQL, NoSQL & Redis</div>
                </div>
              </Card3DTilt>

              {/* 6. DevOps & Tools */}
              <Card3DTilt maxTilt={6}>
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                      <Cloud className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">DevOps & Cloud</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {technicalSkills.devopsAndTools.map((item, i) => (
                        <span key={i} className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/80 text-purple-300 font-medium border border-slate-700">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-4 font-mono">AWS, Azure & CI/CD</div>
                </div>
              </Card3DTilt>

              {/* 7. Styling */}
              <Card3DTilt maxTilt={6}>
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-4">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">Styling & UI</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {technicalSkills.styling.map((item, i) => (
                        <span key={i} className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/80 text-pink-300 font-medium border border-slate-700">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-4 font-mono">Tailwind & Material UI</div>
                </div>
              </Card3DTilt>

              {/* 8. Practices */}
              <Card3DTilt maxTilt={6}>
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">Practices</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {technicalSkills.practices.map((item, i) => (
                        <span key={i} className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/80 text-blue-300 font-medium border border-slate-700">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-4 font-mono">Agile, SEO & Accessibility</div>
                </div>
              </Card3DTilt>
            </div>
          )}
        </section>

        {/* ========================================================= */}
        {/* 5. KEY PROJECTS SECTION                                   */}
        {/* ========================================================= */}
        <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Rocket className="w-3.5 h-3.5" />
              Featured Deliverables
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Key Enterprise Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Production systems designed for global marketing, multi-tenant ERP operations, and complex sales quote calculations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {keyProjects.map((project, idx) => (
              <Card3DTilt key={idx} maxTilt={6}>
                <div className="p-8 sm:p-9 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 backdrop-blur-xl h-full flex flex-col justify-between transition-all group relative overflow-hidden">
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-cyan-400 font-mono mt-1 font-semibold">
                      {project.techStack}
                    </p>

                    <p className="text-slate-300 text-sm leading-relaxed mt-4">
                      {project.description}
                    </p>

                    {/* Highlights bullet list */}
                    <div className="mt-5 space-y-2">
                      {project.highlights.map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Tags */}
                  <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg text-xs bg-slate-950 border border-slate-800 text-slate-300 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card3DTilt>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. CONTACT SECTION                                        */}
        {/* ========================================================= */}
        <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              Let's Connect
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              I am open to full-time roles, engineering consultations, and high-impact software projects.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Direct Contact Cards */}
            <div className="lg:col-span-5 space-y-4">
              {/* Email Card */}
              <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Email Me Directly</div>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors break-all"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Call / WhatsApp</div>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Copy phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Location</div>
                  <div className="text-sm sm:text-base font-bold text-white">
                    {personalInfo.location}
                  </div>
                </div>
              </div>

              {/* Quick Resume Download trigger */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-slate-900/60 border border-cyan-500/30 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-white">Looking for my CV?</div>
                    <div className="text-xs text-slate-400">
                      View or print the official 3+ years experience resume.
                    </div>
                  </div>
                  <button
                    onClick={() => setIsResumeOpen(true)}
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black shadow-md shadow-cyan-500/30 transition-all flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Open CV
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Interactive Message Form */}
            <div className="lg:col-span-7">
              <Card3DTilt maxTilt={4}>
                <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
                  <h3 className="text-xl font-bold text-white mb-2">Send a Direct Message</h3>
                  <p className="text-xs text-slate-400 mb-6">
                    Fill out the form below or write directly to{" "}
                    <span className="text-cyan-400">{personalInfo.email}</span>.
                  </p>

                  {formSubmitted ? (
                    <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-center space-y-2 animate-fadeIn">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                      <div className="font-bold text-base">Thank you for reaching out!</div>
                      <div className="text-xs text-slate-300">
                        Opening your default mail client with your pre-filled message...
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            value={contactForm.name}
                            onChange={(e) =>
                              setContactForm({ ...contactForm, name: e.target.value })
                            }
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-sm text-white placeholder-slate-600 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                            Your Email
                          </label>
                          <input
                            type="email"
                            required
                            value={contactForm.email}
                            onChange={(e) =>
                              setContactForm({ ...contactForm, email: e.target.value })
                            }
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-sm text-white placeholder-slate-600 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Message
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={contactForm.message}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, message: e.target.value })
                          }
                          placeholder="Tell me about your project, team, or opportunity..."
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-sm text-white placeholder-slate-600 transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        onClick={() => {
                          if (contactForm.name && contactForm.email && contactForm.message) {
                            window.location.href = `mailto:${personalInfo.email}?subject=Contact from ${encodeURIComponent(contactForm.name)}&body=${encodeURIComponent(contactForm.message + "\n\nFrom: " + contactForm.name + " (" + contactForm.email + ")")}`;
                          }
                        }}
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Send Message via Email
                      </button>
                    </form>
                  )}
                </div>
              </Card3DTilt>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-slate-950/90 relative z-10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md">
              <Terminal className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="font-bold text-white text-base">Aman Sajwan</div>
              <div className="text-xs text-slate-400">
                Full Stack Software Engineer • 3+ Years Experience
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="text-xs text-slate-500 text-center md:text-right">
            <div>© 2026 Aman Sajwan. All rights reserved.</div>
            <div className="text-slate-600 mt-0.5">
              Powered by Next.js, Three.js & Tailwind CSS
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
