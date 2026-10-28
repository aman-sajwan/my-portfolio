import { ExperienceItem, ProjectItem, TechnicalSkillsData } from '../types/portfolio';

export const personalInfo = {
  name: "AMAN SAJWAN",
  roleTitle: "Full Stack Software Engineer",
  experienceYears: "3+ Years",
  email: "sajwanamann@gmail.com",
  phone: "+91 8979829326",
  location: "Rishikesh, Uttarakhand, India",
  linkedin: "https://www.linkedin.com/in/aman-sajwan",
  github: "https://github.com/amansajwan",
  summary:
    "Full Stack Software Engineer with 3+ years of experience designing and delivering scalable web applications and backend services. Proficient in React.js, Next.js, TypeScript, Django, FastAPI, and Python. Delivered enterprise platforms including CMS, ERP, CRM, CTMS, and CPQ solutions for global clients across healthcare, finance, and manufacturing. Recent work spans Python automation, microservices, browser extensions, Outlook add-ins, RAG-based AI features, and Docker/Azure deployments with GitHub Actions CI/CD. Experienced in system design, RESTful and GraphQL APIs, authentication/authorization (JWT, OAuth, SSO), PostgreSQL and other SQL/NoSQL databases, and AWS and Azure. Strong collaborator in Agile/Scrum teams.",
  education: {
    degree: "Bachelor of Computer Applications (BCA)",
    period: "2018 – 2021",
    institution: "M.I.T Rishikesh, Uttarakhand"
  },
  award: {
    title: "Best Performer of the Year",
    company: "Vastedge",
    year: "2024"
  }
};

export const technicalSkills: TechnicalSkillsData = {
  languages: ["JavaScript (ES6+)", "TypeScript", "Python", "HTML5", "CSS3", "SQL"],
  frontend: ["React.js", "Next.js", "Redux", "Redux Toolkit", "Context API", "Browser Extensions", "Outlook Add-ins"],
  backend: [
    "FastAPI",
    "Django",
    "Python Automation",
    "Microservices",
    "System Design",
    "RAG (AI)",
    "RESTful APIs",
    "GraphQL",
    "Axios",
    "Fetch API",
    "JSON"
  ],
  authAndSecurity: [
    "Authentication/Authorization",
    "JWT",
    "OAuth",
    "SSO",
    "Role-Based Access Control"
  ],
  databases: ["SQL (PostgreSQL, MySQL)", "NoSQL", "Redis", "ORM integration"],
  styling: ["Tailwind CSS", "Bootstrap", "Material UI (MUI)", "Responsive Design", "Figma"],
  devopsAndTools: [
    "AWS",
    "Azure Container",
    "Docker",
    "CI/CD",
    "GitHub Actions",
    "Nginx (SSL, gzip, caching)",
    "ngrok",
    "Git",
    "GitHub",
    "Postman",
    "Chrome DevTools"
  ],
  practices: [
    "Agile/Scrum",
    "SEO Optimization",
    "WCAG Accessibility",
    "Code Review",
    "Cross-Browser Compatibility"
  ]
};

export const experiences: ExperienceItem[] = [
  {
    role: "Full Stack Developer",
    company: "SGSN Associates",
    location: "Dehradun, India",
    period: "Jun 2026 – Present",
    current: true,
    achievements: [
      "Built Python automation workflows and an automation dashboard to trigger, monitor, and report on automated tasks in one place.",
      "Designed and developed FastAPI backend services on PostgreSQL, structured as microservices behind the dashboard, extension, and add-in.",
      "Developed a browser extension and a Microsoft Outlook add-in that bring automation and AI-assisted features directly into users' daily tools.",
      "Designed and implemented a Retrieval-Augmented Generation (RAG) pipeline to answer queries grounded in internal documents and data.",
      "Implemented SSO login with JWT/OAuth-based authentication and authorization for secure, centralized access across the dashboard, extension, and add-in.",
      "Containerized services with Docker, used Redis for caching and queuing, and deployed to Azure Container; used ngrok to expose local services for webhook and add-in testing.",
      "Set up CI/CD pipelines with GitHub Actions to automate build, test, and deployment, enabling faster and more reliable releases."
    ],
    tags: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "RAG",
      "Docker",
      "Redis",
      "Azure Container",
      "GitHub Actions",
      "JWT/OAuth",
      "SSO",
      "Outlook Add-in",
      "Browser Extension",
      "ngrok",
      "Git"
    ]
  },
  {
    role: "Software Engineer",
    company: "Vastedge",
    location: "Delhi, India",
    period: "Apr 2024 – Nov 2025",
    current: false,
    achievements: [
      "Architected and built a fully custom SEO-optimized CMS with dynamic page generation, multi-template layouts, automated sitemap creation, and analytics integration using Next.js and TypeScript.",
      "Designed scalable, reusable React.js UI component libraries for enterprise ERP, PMT, CTMS, and CPQ platforms, improving development velocity across teams.",
      "Developed RESTful and GraphQL API integrations across frontend and backend (Django); built automated backup workflows for NetSuite and Salesforce; contributed to Microsoft 365 integrations.",
      "Optimized high-traffic dashboards using React.memo, useCallback, useMemo, code splitting (React.lazy), and list virtualization, resulting in measurably faster load times.",
      "Configured and managed AWS deployments with Nginx reverse proxy, SSL termination, gzip compression, and static asset caching for production environments."
    ],
    tags: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Python/Django",
      "GraphQL",
      "RESTful APIs",
      "SQL",
      "AWS",
      "Nginx",
      "Git"
    ]
  },
  {
    role: "Software Developer",
    company: "PushIdeas INC",
    location: "Punjab, India",
    period: "Nov 2022 – Feb 2024",
    current: false,
    achievements: [
      "Built end-to-end CRM features for Intermaan using React.js, Redux, and Material UI — including lead management, contact timelines, pipeline dashboards, and reporting widgets.",
      "Delivered a real-time live sports betting platform with secure JWT authentication and real-time data feeds; built a real estate listing platform with advanced search and dynamic property pages.",
      "Improved codebase maintainability through systematic refactoring and shared UI component patterns; collaborated directly with backend engineers for seamless RESTful API integration."
    ],
    tags: [
      "React.js",
      "Redux",
      "Material UI",
      "RESTful APIs",
      "JavaScript (ES6+)",
      "Git"
    ]
  }
];

export const keyProjects: ProjectItem[] = [
  {
    title: "Vastedge.com",
    subtitle: "Enterprise CMS & Global Marketing Site",
    techStack: "Next.js, TypeScript, CMS, SEO, AWS",
    description:
      "Corporate site and enterprise CMS featuring dynamic page builder, multi-template support, automated sitemap, metadata management, and analytics integration powering global marketing initiatives.",
    highlights: [
      "Dynamic page builder & multi-template layouts",
      "Automated sitemap generation & metadata pipeline",
      "95+ Google Lighthouse SEO & performance score",
      "AWS production deployment with Nginx caching"
    ],
    tags: ["Next.js", "TypeScript", "CMS", "SEO", "AWS", "Nginx"],
    featured: true,
    category: "CMS"
  },
  {
    title: "OWB Cloud",
    subtitle: "Enterprise ERP Caretaker Platform",
    techStack: "React.js, TypeScript, SQL, REST API, Nginx",
    description:
      "Enterprise ERP caretaker platform with real-time data validation dashboards, automated backup management, recovery status views, and fine-grained role-based access control for multi-tenant clients.",
    highlights: [
      "Data validation dashboards & live diagnostics",
      "Automated backup management & recovery views",
      "Multi-tenant Role-Based Access Control (RBAC)",
      "Seamless REST API and SQL backend integration"
    ],
    tags: ["React.js", "TypeScript", "SQL", "REST API", "Nginx", "RBAC"],
    featured: true,
    category: "Enterprise"
  },
  {
    title: "Alaska – CPQ",
    subtitle: "Configure, Price, Quote Sales Engine",
    techStack: "React.js, Next.js, TypeScript, CRM Integration",
    description:
      "High-performance CPQ sales tool featuring a multi-step product configurator, dynamic pricing UI calculation engine, interactive quote document preview, and bidirectional CRM data sync for the complete sales quoting workflow.",
    highlights: [
      "Multi-step interactive product configurator",
      "Dynamic real-time pricing calculation UI",
      "Instant PDF/quote document preview",
      "Bidirectional CRM synchronization pipeline"
    ],
    tags: ["React.js", "Next.js", "TypeScript", "CRM Integration", "CPQ"],
    featured: true,
    category: "SaaS"
  },
  {
    title: "ERP-GD Dashboard",
    subtitle: "Modular Operations & Procurement Dashboard",
    techStack: "React.js, TypeScript, Material UI, SQL",
    description:
      "Modular enterprise ERP dashboard covering inventory management, order processing, procurement tracking, and vendor workflows with real-time KPI reporting and multi-format data export.",
    highlights: [
      "Real-time operational KPI reporting and alerts",
      "Inventory, procurement, and vendor workflows",
      "Multi-format data export (Excel, CSV, PDF)",
      "Material UI design system with responsive views"
    ],
    tags: ["React.js", "TypeScript", "Material UI", "SQL", "ERP", "Analytics"],
    featured: false,
    category: "Enterprise"
  }
];

export const skillClouds = [
  { name: "React.js", category: "Frontend", level: 95 },
  { name: "Next.js", category: "Frontend", level: 92 },
  { name: "TypeScript", category: "Language", level: 90 },
  { name: "Python", category: "Backend", level: 92 },
  { name: "FastAPI", category: "Backend", level: 90 },
  { name: "Django", category: "Backend", level: 88 },
  { name: "RAG (AI)", category: "AI & Data", level: 85 },
  { name: "Docker", category: "DevOps", level: 86 },
  { name: "Azure Container", category: "DevOps", level: 84 },
  { name: "AWS", category: "Cloud", level: 85 },
  { name: "PostgreSQL", category: "Database", level: 90 },
  { name: "Redis", category: "Database", level: 86 },
  { name: "GraphQL", category: "Backend", level: 86 },
  { name: "RESTful APIs", category: "Backend", level: 95 },
  { name: "JWT / OAuth / SSO", category: "Security", level: 92 },
  { name: "GitHub Actions", category: "CI/CD", level: 88 },
  { name: "Browser Extensions", category: "Frontend", level: 90 },
  { name: "Outlook Add-ins", category: "Enterprise", level: 88 },
  { name: "Nginx", category: "DevOps", level: 86 },
  { name: "Tailwind CSS", category: "Styling", level: 95 },
  { name: "Material UI", category: "Styling", level: 88 },
  { name: "Redux Toolkit", category: "Frontend", level: 90 }
];

