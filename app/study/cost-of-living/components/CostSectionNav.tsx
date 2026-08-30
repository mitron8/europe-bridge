"use client";
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -110;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[60px] lg:top-[64px] z-40 bg-white/95 backdrop-blur-md border-y border-gray-200 shadow-sm py-2.5 px-6 lg:px-12 my-6 transition-all">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        <span className="text-xs font-black uppercase text-gray-400 shrink-0 mr-1 hidden sm:inline">Jump to:</span>
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeId === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-germany-black text-white shadow-md scale-105 ring-2 ring-red-500/20'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-germany-red'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-germany-red' : 'text-gray-500'}`} />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
