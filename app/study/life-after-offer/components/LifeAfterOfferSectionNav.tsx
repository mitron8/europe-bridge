"use client";

import React, { useState } from 'react';
import { 
  FileText, 
  CreditCard, 
  Coins, 
  Briefcase, 
  Award, 
  Calculator, 
  HelpCircle,
  Lock
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const LifeAfterOfferSectionNav = () => {
  const [activeId, setActiveId] = useState('section-job-seeker');
  const user = useAppStore((state) => state.user);

  const sections = [
    { id: 'section-job-seeker', label: '18-Mo Job Seeker', icon: FileText },
    { id: 'section-blue-card', label: 'EU Blue Card', icon: CreditCard },
    { id: 'section-salaries', label: 'Starting Salaries', icon: Coins },
    { id: 'section-playbook', label: 'German Hiring Playbook', icon: Briefcase },
    { id: 'section-pr-citizenship', label: 'PR & Citizenship', icon: Award },
    { id: 'section-calculator', label: 'Eligibility Calculator', icon: Calculator },
    { id: 'section-faq', label: 'FAQs', icon: HelpCircle },
  ];

  const scrollToSection = (id: string) => {
    let targetId = id;

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
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeId === sec.id;
          const isLocked = !user && ['section-salaries', 'section-playbook', 'section-pr-citizenship', 'section-calculator', 'section-faq'].includes(sec.id);

          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[var(--lp-ink)] text-white shadow-xs'
                  : 'bg-[var(--lp-card)] text-[var(--lp-muted)] hover:text-[var(--lp-ink)] border border-[var(--lp-rule)]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[var(--lp-gold)]' : 'text-[var(--lp-muted)]'}`} />
              <span>{sec.label}</span>
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
