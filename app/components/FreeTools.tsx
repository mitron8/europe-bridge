"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  Target, 
  Wallet, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  ArrowRight
} from 'lucide-react';

interface ToolItem {
  id: string;
  title: string;
  category: 'Education' | 'Finance' | 'Career';
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  desc: string;
}

const categories = ["All", "Education", "Finance", "Career"];

const tools: ToolItem[] = [
  {
    id: "german-grade",
    title: "German Grade Calculator",
    category: "Education",
    href: "/tools/german-grade-calculator",
    icon: Calculator,
    tag: "Bavarian Formula",
    desc: "Calculate your exact German GPA (1.0 to 5.0) using the official modified Bavarian Formula required by TU9 universities."
  },
  {
    id: "admission-chance",
    title: "Admission Chance Evaluator",
    category: "Education",
    href: "/tools/admission-chance",
    icon: Target,
    tag: "AI Matcher",
    desc: "Benchmark your degree against 400+ public universities to predict your admission odds into English-taught programs."
  },
  {
    id: "blocked-account",
    title: "Blocked Account Calculator",
    category: "Finance",
    href: "/tools/blocked-account-calculator",
    icon: Wallet,
    tag: "€11,904 Standard",
    desc: "Calculate the exact €11,904 required proof of funds, monthly disbursement limits, and buffer fees for your visa."
  },
  {
    id: "cost-of-living",
    title: "Living Cost Estimator",
    category: "Finance",
    href: "/tools/cost-of-living-estimator",
    icon: Building2,
    tag: "City Index",
    desc: "Estimate realistic monthly expenses, accommodation, health insurance, and grocery costs across 20+ German cities."
  },
  {
    id: "ects-credit",
    title: "ECTS Credit Converter",
    category: "Education",
    href: "/tools/ects-credit-calculator",
    icon: GraduationCap,
    tag: "Course Workload",
    desc: "Convert lecture hours and domestic university credits into European ECTS credits required for direct Master's admission."
  },
  {
    id: "net-salary",
    title: "Post-Study Salary Calculator",
    category: "Career",
    href: "/tools/net-salary-calculator",
    icon: Briefcase,
    tag: "Tax Class 1",
    desc: "Estimate take-home net salary after statutory German taxes, pension contributions, and public healthcare deductions."
  }
];

const FreeTools = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredTools = tools.filter(
    (tool) => activeTab === "All" || tool.category === activeTab
  );

  return (
    <section id="free-tools" className="py-24 px-4 neu-bg relative overflow-hidden z-20">
      
      {/* Background Soft Glows matching EuropeBridge theme */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-germany-red/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-germany-gold/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Centered Header matching site layout */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-full font-bold text-germany-red shadow-[4px_4px_12px_rgba(71,85,105,0.25),inset_-2px_-2px_6px_rgba(71,85,105,0.2),inset_2px_2px_6px_rgba(255,255,255,1)] text-xs tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-germany-gold"></span>
            Public Tools Platform
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-germany-black mb-4">
            Plan Your Journey For Free
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-bold text-sm lg:text-base leading-relaxed">
            Take advantage of our AI-powered calculators and checkers. Find out exactly where you stand before creating an account.
          </p>
        </div>

        {/* Centered Category Tabs with Theme Styling */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16">
          {categories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'neu-btn-primary text-white shadow-md'
                    : 'neu-btn text-gray-600 hover:text-germany-red'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3-Column Responsive Grid with Theme Clay Cards */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="neu-card p-7 bg-white flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 border border-white/60"
                >
                  <div>
                    {/* Top Row: Clay Icon + Category Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-[4px_4px_10px_rgba(210,205,195,0.7),inset_-2px_-2px_5px_rgba(210,205,195,0.4),inset_2px_2px_5px_rgba(255,255,255,1)] flex items-center justify-center text-germany-red group-hover:scale-105 transition-transform duration-200">
                        <Icon className="w-6 h-6 text-germany-red" />
                      </div>
                      
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gray-100 text-gray-500 shadow-inner">
                        {tool.tag}
                      </span>
                    </div>

                    {/* Category Label */}
                    <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                      {tool.category} Tool
                    </p>

                    {/* Title */}
                    <h3 className="font-display text-xl text-germany-black mb-2.5 group-hover:text-germany-red transition-colors leading-snug">
                      {tool.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-xs sm:text-sm font-bold leading-relaxed mb-6">
                      {tool.desc}
                    </p>
                  </div>

                  {/* Action Link styled with Theme Button */}
                  <div className="pt-2">
                    <Link
                      href={tool.href}
                      className="neu-btn w-full py-3.5 text-germany-black font-bold text-xs sm:text-sm text-center inline-flex items-center justify-center gap-2 group-hover:text-germany-red group-hover:shadow-md transition-all cursor-pointer"
                    >
                      <span>Try for Free</span>
                      <ArrowRight className="w-4 h-4 text-germany-red group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default FreeTools;
