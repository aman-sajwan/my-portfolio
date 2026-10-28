"use client";

import React, { useState } from "react";
import { X, Printer, Download, Mail, Phone, MapPin, Linkedin, Copy, Check, ExternalLink, Briefcase, GraduationCap, Award, Code2 } from "lucide-react";
import { personalInfo, experiences, keyProjects, technicalSkills } from "../data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  if (!isOpen) return null;

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      {/* Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl shadow-cyan-500/10 overflow-hidden text-slate-100 my-auto">
        {/* Modal Toolbar (hidden when printing) */}
        <div className="print:hidden flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-slate-800 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400" />
            <span className="font-semibold text-sm text-slate-200">
              Resume Preview • Aman Sajwan
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 text-xs rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-all flex items-center gap-1.5"
              title="Copy Email"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedEmail ? "Copied" : "Email"}
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-red-500/20 hover:text-red-400 border border-slate-700 text-slate-400 transition-all ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-7 bg-white text-slate-900 print:p-0 print:m-0 print:text-black">
          {/* Header */}
          <div className="text-center border-b border-slate-300 pb-5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
              {personalInfo.name}
            </h1>
            <p className="text-sm sm:text-base font-semibold text-slate-700 mt-1">
              Software Engineer ({personalInfo.experienceYears} of Experience)
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-600 mt-2 font-medium">
              <a href={`mailto:${personalInfo.email}`} className="text-blue-600 hover:underline">
                {personalInfo.email}
              </a>
              <span>|</span>
              <a href={`tel:${personalInfo.phone}`} className="hover:underline">
                {personalInfo.phone}
              </a>
              <span>|</span>
              <span>{personalInfo.location}</span>
              <span>|</span>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-semibold hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b-2 border-slate-900 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
              {personalInfo.summary}
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b-2 border-slate-900 pb-1 mb-3">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-2 text-xs sm:text-sm">
              <span className="font-bold text-slate-900">Languages</span>
              <span className="sm:col-span-3 text-slate-700">{technicalSkills.languages.join(", ")}</span>

              <span className="font-bold text-slate-900">Frontend</span>
              <span className="sm:col-span-3 text-slate-700">{technicalSkills.frontend.join(", ")}</span>

              <span className="font-bold text-slate-900">Backend</span>
              <span className="sm:col-span-3 text-slate-700">{technicalSkills.backend.join(", ")}</span>

              <span className="font-bold text-slate-900">Auth & Security</span>
              <span className="sm:col-span-3 text-slate-700">{technicalSkills.authAndSecurity.join(", ")}</span>

              <span className="font-bold text-slate-900">Databases</span>
              <span className="sm:col-span-3 text-slate-700">{technicalSkills.databases.join(", ")}</span>

              <span className="font-bold text-slate-900">Styling</span>
              <span className="sm:col-span-3 text-slate-700">{technicalSkills.styling.join(", ")}</span>

              <span className="font-bold text-slate-900">DevOps & Tools</span>
              <span className="sm:col-span-3 text-slate-700">{technicalSkills.devopsAndTools.join(", ")}</span>

              <span className="font-bold text-slate-900">Practices</span>
              <span className="sm:col-span-3 text-slate-700">{technicalSkills.practices.join(", ")}</span>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b-2 border-slate-900 pb-1 mb-3">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-bold text-xs sm:text-sm text-slate-900">
                    <div>
                      <span>{exp.role}</span>
                      <span className="text-slate-500 font-normal"> | </span>
                      <span className="text-slate-800">{exp.company}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-600">
                      {exp.period} | {exp.location}
                    </div>
                  </div>

                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-700 leading-relaxed">
                    {exp.achievements.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <div className="text-[11px] text-slate-600 pt-0.5">
                    <span className="font-bold text-slate-800">Stack: </span>
                    {exp.tags.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b-2 border-slate-900 pb-1 mb-3">
              Key Projects
            </h2>
            <div className="space-y-3">
              {keyProjects.map((proj, idx) => (
                <div key={idx} className="text-xs sm:text-sm">
                  <div className="font-bold text-slate-900">
                    <span>{proj.title}</span>
                    <span className="text-slate-500 font-normal"> | </span>
                    <span className="text-slate-700 font-medium text-xs">{proj.techStack}</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                    • {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase border-b-2 border-slate-900 pb-1 mb-2">
              Education
            </h2>
            <div className="flex justify-between items-baseline text-xs sm:text-sm">
              <span className="font-bold text-slate-900">{personalInfo.education.degree}</span>
              <span className="text-xs font-semibold text-slate-600">{personalInfo.education.period}</span>
            </div>
            <p className="text-xs text-slate-700">{personalInfo.education.institution}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

