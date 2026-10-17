"use client";

import React, { useState } from 'react';
import { ShieldCheck, Scale, Award, HeartPulse, ListOrdered, CalendarCheck, HelpCircle } from 'lucide-react';

export const InsuranceNav = () => {
  const [activeId, setActiveId] = useState('overview');

  const navLinks = [
    { id: 'overview', label: 'Mandatory Requirement', icon: ShieldCheck },
    { id: 'public-vs-private', label: 'Public vs Private', icon: Scale },
    { id: 'providers', label: 'Top German Providers', icon: Award },
    { id: 'features', label: 'Coverage Benefits', icon: HeartPulse },
    { id: 'process', label: 'How to Get Insured', icon: ListOrdered },
    { id: 'booking', label: 'Free Activation Form', icon: CalendarCheck },
    { id: 'faq', label: 'FAQs', icon: HelpCircle },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(`section-${id}`);
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
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
