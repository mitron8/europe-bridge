"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Globe, FileCheck, Clock, Layers, MessageSquare, HelpCircle, Lock } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const VisaSectionNav = () => {
  const [activeId, setActiveId] = useState('csp');
  const user = useAppStore((state) => state.user);

  const navLinks = [
    { id: 'csp', label: 'CSP & VIDEX', icon: Globe },
    { id: 'checklist', label: 'Documents', icon: FileCheck },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'interview', label: 'Interview Prep', icon: MessageSquare },
    { id: 'pricing', label: 'Support Plans', icon: Layers },
    { id: 'faq', label: 'FAQs', icon: HelpCircle },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const detectionLine = 220;
      const gate = document.getElementById('study-content-gate');
      let current = navLinks[0].id;

      for (const link of navLinks) {
        const section = document.getElementById(`section-${link.id}`);
        if (section) {
          if (!user && gate && gate.contains(section)) {
            const gateRect = gate.getBoundingClientRect();
            if (gateRect.top <= detectionLine) {
              current = link.id;
              break;
            }
          } else {
            const rect = section.getBoundingClientRect();
            if (rect.top <= detectionLine) {
              current = link.id;
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
      const yOffset = -135;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <div className="sticky top-[64px] sm:top-[68px] z-40 bg-[#F4F1EA]/95 backdrop-blur-md border-y border-[#EBE7E0] shadow-2xs py-2 px-4 sm:px-8 mb-6 transition-all">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
        <span className="text-[11px] font-black uppercase text-gray-500 shrink-0 mr-1.5 tracking-wider hidden sm:inline">
          Navigate:
        </span>
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeId === link.id;
          const isLocked = !user && ['timeline', 'interview', 'pricing', 'faq'].includes(link.id);

          return (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-germany-black text-white shadow-md scale-102 border border-germany-black'
                  : 'bg-white/85 text-gray-700 hover:bg-white hover:text-germany-red border border-[#EBE7E0]/80 shadow-2xs'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-germany-gold' : 'text-gray-400'}`} />
              <span>{link.label}</span>
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
