"use client";

import React, { useState, useEffect } from 'react';
import { BookOpen, Building2, ClipboardCheck, Calendar, DollarSign, Briefcase, Award, Sparkles, HelpCircle } from 'lucide-react';

export const MastersSectionNav = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'university-types', label: 'TU9 vs UAS', icon: Building2 },
    { id: 'requirements', label: 'Requirements', icon: ClipboardCheck },
    { id: 'deadlines', label: 'Deadlines', icon: Calendar },
    { id: 'costs', label: 'Costs & Funds', icon: DollarSign },
    { id: 'work', label: 'Part-Time Work', icon: Briefcase },
    { id: 'career', label: 'Post-Study & PR', icon: Award },
    { id: 'tools', label: 'Free Tools', icon: Sparkles },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="sticky top-20 z-30 py-3.5 px-4 bg-white/80 backdrop-blur-md border-y border-gray-200/80 shadow-xs mb-10">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-germany-black text-white shadow-sm scale-105'
                  : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-germany-gold' : 'text-gray-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
