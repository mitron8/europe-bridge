"use client";

import React, { useState, useEffect } from 'react';
import { 
  Clock, 
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
    { id: 'section-job-seeker', label: '1. 18-Mo Visa', icon: Clock },
    { id: 'section-blue-card', label: '2. EU Blue Card', icon: CreditCard },
    { id: 'section-salaries', label: '3. Starting Salaries', icon: Coins },
    { id: 'section-playbook', label: '4. Job Playbook', icon: Briefcase },
    { id: 'section-pr-citizenship', label: '5. PR & Passport', icon: Award },
    { id: 'section-calculator', label: '6. Calculator', icon: Calculator },
    { id: 'section-faq', label: '7. FAQs', icon: HelpCircle },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const detectionLine = 220;
      const gate = document.getElementById('study-content-gate');
      let current = sections[0].id;

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          if (!user && gate && gate.contains(el)) {
            const gateRect = gate.getBoundingClientRect();
            if (gateRect.top <= detectionLine) {
              current = sec.id;
              break;
            }
          } else {
            const rect = el.getBoundingClientRect();
            if (rect.top <= detectionLine) {
              current = sec.id;
            }
          }
        }
      }

      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [user]);

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
      const yOffset = -135;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <div className="sticky top-[64px] sm:top-[68px] z-40 bg-white/95 backdrop-blur-md border-y border-[#EBE7E0] shadow-2xs py-2 px-4 sm:px-8 mb-6 transition-all">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
        <span className="text-[11px] font-black uppercase text-gray-400 shrink-0 mr-1.5 tracking-wider hidden sm:inline">
          Jump to:
        </span>
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeId === sec.id;
          const isLocked = !user && ['section-salaries', 'section-playbook', 'section-pr-citizenship', 'section-calculator', 'section-faq'].includes(sec.id);

          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-germany-black text-white shadow-md scale-102 ring-1 ring-black/10'
                  : 'bg-[#F4F1EA]/80 text-gray-700 hover:bg-[#EBE7E0] hover:text-germany-red'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-germany-gold' : 'text-gray-500'}`} />
              <span>{sec.label}</span>
              {isLocked && (
                <Lock className="w-3 h-3 text-gray-400 shrink-0 ml-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
