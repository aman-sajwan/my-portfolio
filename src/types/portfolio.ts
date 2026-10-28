export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  achievements: string[];
  tags: string[];
}

export interface ProjectItem {
  title: string;
  subtitle?: string;
  techStack: string;
  description: string;
  highlights: string[];
  tags: string[];
  featured?: boolean;
  category: 'Enterprise' | 'CMS' | 'SaaS' | 'Automation';
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number; icon: string; highlight?: boolean }[];
}

export interface TechnicalSkillsData {
  languages: string[];
  frontend: string[];
  backend: string[];
  authAndSecurity: string[];
  databases: string[];
  styling: string[];
  devopsAndTools: string[];
  practices: string[];
}

