"use client";
import React, { useState, useEffect } from 'react';
import { Award, Landmark, Globe, Building2, Briefcase, GitPullRequest, HelpCircle, Wallet } from 'lucide-react';

export const ScholarshipsNav = () => {
  const [activeSection, setActiveSection] = useState('major-scholarships');

  const navLinks = [
    { id: 'major-scholarships', label: 'Major Scholarships', icon: Award },
    { id: 'deutschlandstipendium', label: 'Deutschlandstipendium', icon: Landmark },
    { id: 'foundations-and-grants', label: 'Foundations & HiWi', icon: Building2 },
    { id: 'application-roadmap', label: 'Application Roadmap', icon: GitPullRequest },
    { id: 'alternative-funding', label: 'Working & Alternatives', icon: Wallet },
    { id: 'scholarships-faq', label: 'FAQs', icon: HelpCircle },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="hidden md:block sticky top-16 z-30 neu-bg/95 backdrop-blur-md py-3 px-4 border-y border-gray-200/50 shadow-sm overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-2 min-w-max">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? 'bg-germany-red text-white shadow-md'
                  : 'bg-white/80 text-gray-700 hover:bg-white hover:text-germany-red border border-gray-200/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{link.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};
