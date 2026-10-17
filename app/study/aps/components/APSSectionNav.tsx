"use client";

import React, { useState } from 'react';
import { ShieldCheck, FileText, ListOrdered, MessageSquare, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const APSSectionNav = () => {
  const [activeId, setActiveId] = useState('what-is-aps');

  const navLinks = [
    { id: 'what-is-aps', label: 'What is APS?', icon: ShieldCheck },
    { id: 'documents', label: 'Required Documents', icon: FileText },
    { id: 'process', label: 'Step-by-Step Process', icon: ListOrdered },
    { id: 'interview', label: 'Interview Prep', icon: MessageSquare },
    { id: 'failure', label: 'What If You Fail?', icon: AlertTriangle },
    { id: 'after-aps', label: 'Post-APS Steps', icon: CheckCircle2 },
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
    <div className="border-y border-[var(--lp-rule)] bg-[var(--lp-paper-2)]/50 py-3 px-4 sm:px-8 mb-6 transition-all">
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
