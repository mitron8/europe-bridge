"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Scale, Building, Clock, Send, HelpCircle } from 'lucide-react';

export const InsuranceNav = () => {
  const [activeId, setActiveId] = useState('features');

  const navLinks = [
    { id: 'features', label: 'What You Get', icon: CheckCircle2 },
    { id: 'comparison', label: 'Public vs Private', icon: Scale },
    { id: 'providers', label: 'Top Providers', icon: Building },
    { id: 'process', label: 'How It Works', icon: Clock },
    { id: 'booking', label: 'Apply Now', icon: Send },
    { id: 'faq', label: 'FAQs', icon: HelpCircle },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (let i = navLinks.length - 1; i >= 0; i--) {
        const section = document.getElementById(`section-${navLinks[i].id}`);
        if (section) {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          if (sectionTop <= scrollPosition) {
            setActiveId(navLinks[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(`section-${id}`);
    if (element) {
      const yOffset = -110;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="hidden md:block sticky top-16 z-40 bg-[#F4F1EA]/95 backdrop-blur-md border-y border-[#EBE7E0] shadow-xs py-2.5 px-4 sm:px-8 transition-all">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <span className="text-[11px] font-black uppercase text-gray-500 shrink-0 mr-2 tracking-wider">Navigate:</span>
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeId === link.id;
          return (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-germany-red text-white shadow-xs'
                  : 'bg-white/80 text-gray-700 hover:bg-white hover:text-germany-red border border-gray-200/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              <span>{link.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
