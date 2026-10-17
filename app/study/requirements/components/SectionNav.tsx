"use client";

import React, { useState } from 'react';
import { GraduationCap, Languages, FileText, Calendar, Calculator, Globe2 } from 'lucide-react';

export const SectionNav = () => {
  const [activeId, setActiveId] = useState('academic');

  const navLinks = [
    { id: 'academic', label: 'Academic & GPA', icon: GraduationCap },
    { id: 'language', label: 'Language Scores', icon: Languages },
    { id: 'documents', label: 'Required Documents', icon: FileText },
    { id: 'deadlines', label: 'Deadlines & Timeline', icon: Calendar },
    { id: 'bavarian', label: 'Grade Formula', icon: Calculator },
    { id: 'country', label: 'Country Specifics (APS)', icon: Globe2 },
  ];

  const scrollToSection = (id: string) => {
    const targetId = `section-${id}`;
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <div className="border-y border-[var(--lp-rule)] bg-[var(--lp-paper-2)]/50 py-3 px-4 sm:px-6 mb-8 transition-all">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        <span className="text-[10px] font-mono font-semibold uppercase text-[var(--lp-muted)] shrink-0 mr-2 tracking-wider hidden sm:inline">
          Jump to section:
        </span>
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeId === link.id;

          return (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[var(--lp-ink)] text-white shadow-xs'
                  : 'bg-[var(--lp-card)] text-[var(--lp-muted)] hover:text-[var(--lp-ink)] border border-[var(--lp-rule)]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[var(--lp-gold)]' : 'text-[var(--lp-muted)]'}`} />
              <span>{link.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
