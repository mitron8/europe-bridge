"use client";
import React, { useState, useEffect } from 'react';
import { GraduationCap, Languages, FileText, Calendar, Calculator, Globe2 } from 'lucide-react';

export const SectionNav = () => {
  const [activeId, setActiveId] = useState('academic');

  const navLinks = [
    { id: 'academic', label: 'Academic & GPA', icon: GraduationCap },
    { id: 'language', label: 'Language Scores', icon: Languages },
    { id: 'documents', label: 'Required Documents', icon: FileText },
    { id: 'deadlines', label: 'Deadlines & Timeline', icon: Calendar },
    { id: 'bavarian', label: 'Grade Formula', icon: Calculator },
    { id: 'country', label: 'Country Specifics (APS)', icon: Globe2 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(`section-${link.id}`));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveId(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(`section-${id}`);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-y border-gray-200 shadow-sm py-2.5 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <span className="text-xs font-black uppercase text-gray-400 shrink-0 mr-2">Jump to:</span>
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeId === link.id
                  ? 'bg-germany-black text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{link.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
