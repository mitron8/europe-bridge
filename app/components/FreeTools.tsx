"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Plane, Briefcase, GraduationCap, Building } from 'lucide-react';

const categories = ["All", "Education", "Finance", "Career", "Visa"];

const tools = [
  { id: 1, title: "Blocked Account Calculator", category: "Finance", desc: "Calculate the exact amount needed for your German blocked account.", icon: <Calculator className="w-6 h-6 text-germany-red" /> },
  { id: 2, title: "APS Eligibility Checker", category: "Education", desc: "Check if your degree is recognized by the APS India requirements.", icon: <GraduationCap className="w-6 h-6 text-germany-red" /> },
  { id: 3, title: "University Matcher", category: "Education", desc: "Find your perfect German university based on your grades.", icon: <Building className="w-6 h-6 text-germany-red" /> },
  { id: 4, title: "Visa Processing Estimator", category: "Visa", desc: "Get an estimated timeline for your student visa approval.", icon: <Plane className="w-6 h-6 text-germany-red" /> },
  { id: 5, title: "Blue Card Eligibility", category: "Career", desc: "See if you qualify for the EU Blue Card after graduation.", icon: <Briefcase className="w-6 h-6 text-germany-red" /> },
  { id: 6, title: "Living Cost Calculator", category: "Finance", desc: "Estimate your monthly expenses based on the city you choose.", icon: <Calculator className="w-6 h-6 text-germany-red" /> },
];

const FreeTools = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredTools = tools.filter(tool => activeTab === "All" || tool.category === activeTab);

  return (
    <section id="free-tools" className="py-24 px-4 neu-bg relative overflow-hidden z-20">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-germany-gold/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-germany-red/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-full font-bold text-germany-red shadow-[4px_4px_12px_rgba(71,85,105,0.4),inset_-2px_-2px_6px_rgba(71,85,105,0.4),inset_2px_2px_6px_rgba(255,255,255,1)] text-xs tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-germany-gold"></span>
            Public Tools Platform
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-germany-black mb-4">Plan Your Journey For Free</h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-bold text-sm lg:text-base">
            Take advantage of our AI-powered calculators and checkers. Find out exactly where you stand before creating an account.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
                activeTab === cat
                  ? 'bg-germany-red text-white shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.2)]'
                  : 'bg-[#F9FAFB] text-gray-500 hover:text-germany-red shadow-[4px_4px_10px_rgba(71,85,105,0.4),inset_-2px_-2px_5px_rgba(71,85,105,0.2),inset_2px_2px_5px_rgba(255,255,255,1)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tool Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="neu-card p-6 bg-white flex flex-col group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-[#F9FAFB] rounded-2xl shadow-[inset_2px_2px_5px_rgba(71,85,105,0.5),inset_-2px_-2px_5px_rgba(255,255,255,1)]">
                    {tool.icon}
                  </div>
                </div>
                
                <div className="inline-block px-3 py-1 bg-[#F9FAFB] rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 self-start shadow-inner">
                  {tool.category}
                </div>
                
                <h3 className="font-display text-xl text-germany-black mb-2">{tool.title}</h3>
                <p className="text-gray-500 text-sm font-bold mb-8 flex-grow">{tool.desc}</p>
                
                <Link href="/login" className="neu-btn w-full py-4 text-germany-black font-bold text-sm text-center group-hover:text-germany-red transition-colors">
                  Try for Free
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default FreeTools;
