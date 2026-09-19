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
      // Check if user has reached bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        setActiveSection(navItems[navItems.length - 1].id);
        return;
      }

      const scrollOffset = 190;
      let currentActive = navItems[0].id;

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section top is above or at the threshold, set as active
          if (rect.top <= scrollOffset) {
            currentActive = item.id;
          }
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -140;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    // Hidden on mobile/tablets (<1024px), visible only on big screens (lg and above)
    <div className="hidden lg:block sticky top-20 z-30 py-3 px-4 bg-white/85 backdrop-blur-md border-y border-gray-200/80 shadow-xs mb-8">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
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
