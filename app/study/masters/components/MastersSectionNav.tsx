"use client";

import React, { useState, useEffect } from 'react';
import { BookOpen, Building2, ClipboardCheck, Calendar, DollarSign, Briefcase, Award, Wrench, HelpCircle, Lock } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const MastersSectionNav = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const user = useAppStore((state) => state.user);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'university-types', label: 'TU9 vs UAS', icon: Building2 },
    { id: 'requirements', label: 'Requirements', icon: ClipboardCheck },
    { id: 'deadlines', label: 'Deadlines', icon: Calendar },
    { id: 'costs', label: 'Costs & Funds', icon: DollarSign },
    { id: 'work', label: 'Part-Time Work', icon: Briefcase },
    { id: 'career', label: 'Post-Study & PR', icon: Award },
    { id: 'tools', label: 'Free Tools', icon: Wrench },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const detectionLine = 220;
      const gate = document.getElementById('study-content-gate');
      let current = navItems[0].id;

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          if (!user && gate && gate.contains(el)) {
            const gateRect = gate.getBoundingClientRect();
            if (gateRect.top <= detectionLine) {
              current = item.id;
              break;
            }
          } else {
            const rect = el.getBoundingClientRect();
            if (rect.top <= detectionLine) {
              current = item.id;
            }
          }
        }
      }

      setActiveSection(current);
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
      const yOffset = -135; // Clearance for fixed navbar (64-68px) + sticky bar + breathing room
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="sticky top-[64px] sm:top-[68px] z-40 py-2 px-4 bg-white/95 backdrop-blur-md border-y border-[#EBE7E0] shadow-2xs mb-8 transition-all">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
        <span className="text-[11px] font-black uppercase text-gray-400 shrink-0 mr-1.5 tracking-wider hidden sm:inline">
          Jump to:
        </span>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isLocked = !user && ['requirements', 'deadlines', 'costs', 'work', 'career', 'tools', 'faqs'].includes(item.id);

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-germany-black text-white shadow-md scale-102 ring-1 ring-black/10'
                  : 'bg-[#F4F1EA]/80 text-gray-700 hover:bg-[#EBE7E0] hover:text-germany-red'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-germany-gold' : 'text-gray-500'}`} />
              <span>{item.label}</span>
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
