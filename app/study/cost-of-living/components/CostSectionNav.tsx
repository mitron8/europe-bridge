"use client";

import React, { useState } from 'react';
import { Wallet, Home, UtensilsCrossed, TramFront, MapPin, PiggyBank, HelpCircle } from 'lucide-react';

export const CostSectionNav = () => {
  const [activeId, setActiveId] = useState('section-breakdown');

  const sections = [
    { id: 'section-breakdown', label: '1. Monthly Breakdown', icon: Wallet },
    { id: 'section-housing', label: '2. Housing & Rent', icon: Home },
    { id: 'section-food', label: '3. Food & Groceries', icon: UtensilsCrossed },
    { id: 'section-transport', label: '4. Transport', icon: TramFront },
    { id: 'section-cities', label: '5. City Comparison', icon: MapPin },
    { id: 'section-budgeting', label: '6. Earning & Tips', icon: PiggyBank },
    { id: 'section-faq', label: '7. FAQs', icon: HelpCircle },
  ];

  const scrollToSection = (id: string) => {
    const targetId = id;
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
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeId === sec.id;

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
            </button>
          );
        })}
      </div>
    </div>
  );
};
