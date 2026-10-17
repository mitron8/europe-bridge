"use client";

import React, { useState } from 'react';
import { 
  FileCheck2, 
  Files, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  HelpCircle,
  Lock
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const VisaSectionNav = () => {
  const [activeId, setActiveId] = useState('csp-videx');
  const user = useAppStore((state) => state.user);

  const navLinks = [
    { id: 'csp-videx', label: 'CSP & Videx Form', icon: FileCheck2 },
    { id: 'checklist', label: '14-Point Checklist', icon: Files },
    { id: 'timeline', label: 'VFS Process Timeline', icon: Clock },
    { id: 'interview', label: 'Consulate Interview', icon: MessageSquare },
    { id: 'pricing', label: 'Visa Support Plans', icon: CheckCircle2 },
    { id: 'faq', label: 'FAQs', icon: HelpCircle },
  ];

  const scrollToSection = (id: string) => {
    let targetId = `section-${id}`;

    if (!user) {
      const gate = document.getElementById('study-content-gate');
      const element = document.getElementById(targetId);
      if (gate && element && gate.contains(element)) {
        targetId = 'study-content-gate';
      }
    }

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
          const isLocked = !user && ['timeline', 'interview', 'pricing', 'faq'].includes(link.id);

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
              {isLocked && (
                <Lock className="w-3 h-3 text-[var(--lp-muted)] shrink-0 ml-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
