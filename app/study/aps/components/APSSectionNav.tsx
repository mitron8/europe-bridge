"use client";

import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileText, ListOrdered, MessageSquare, AlertTriangle, CheckCircle2, Lock } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const APSSectionNav = () => {
  const [activeId, setActiveId] = useState('what-is-aps');
  const user = useAppStore((state) => state.user);

  const navLinks = [
    { id: 'what-is-aps', label: 'What is APS?', icon: ShieldCheck },
    { id: 'documents', label: 'Required Documents', icon: FileText },
    { id: 'process', label: 'Step-by-Step Process', icon: ListOrdered },
    { id: 'interview', label: 'Interview Prep', icon: MessageSquare },
    { id: 'failure', label: 'What If You Fail?', icon: AlertTriangle },
    { id: 'after-aps', label: 'Post-APS Steps', icon: CheckCircle2 },
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
    <div className="sticky top-[64px] sm:top-[68px] z-40 bg-white/95 backdrop-blur-md border-y border-[#EBE7E0] shadow-2xs py-2 px-4 sm:px-8 mb-6 transition-all">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
        <span className="text-[11px] font-black uppercase text-gray-400 shrink-0 mr-1.5 tracking-wider hidden sm:inline">
          Jump to:
        </span>
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeId === link.id;
          const isLocked = !user && ['process', 'interview', 'failure', 'after-aps'].includes(link.id);

          return (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-germany-black text-white shadow-md scale-102 ring-1 ring-black/10'
                  : 'bg-[#F4F1EA]/80 text-gray-700 hover:bg-[#EBE7E0] hover:text-germany-red'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-germany-gold' : 'text-gray-500'}`} />
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
