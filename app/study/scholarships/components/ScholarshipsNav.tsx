"use client";

import React, { useState } from 'react';
import { Award, Landmark, Building2, GitPullRequest, HelpCircle, Wallet } from 'lucide-react';

export const ScholarshipsNav = () => {
  const [activeSection, setActiveSection] = useState('major-scholarships');

  const navLinks = [
    { id: 'major-scholarships', label: 'Major Scholarships', icon: Award },
    { id: 'deutschlandstipendium', label: 'Deutschlandstipendium', icon: Landmark },
    { id: 'foundations-and-grants', label: 'Foundations & HiWi', icon: Building2 },
    { id: 'application-roadmap', label: 'Application Roadmap', icon: GitPullRequest },
    { id: 'alternative-funding', label: 'Working & Alternatives', icon: Wallet },
    { id: 'scholarships-faq', label: 'FAQs', icon: HelpCircle },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      setActiveSection(id);
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
          const isActive = activeSection === link.id;
          return (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer ${
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
