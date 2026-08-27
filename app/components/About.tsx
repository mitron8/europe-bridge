"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 px-4 neu-bg relative overflow-hidden z-20">
      
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-germany-red/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-germany-gold/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#F9FAFB] rounded-full font-bold text-germany-red shadow-[inset_2px_2px_5px_rgba(71,85,105,0.5),inset_-2px_-2px_5px_rgba(255,255,255,1)] text-xs tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-germany-gold"></span>
            Why Choose Us
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-germany-black mb-4">The Smart Way to Germany</h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-bold text-sm lg:text-base">
            We combined advanced AI with expert human guidance to remove the friction, delays, and confusion from the traditional study abroad process.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          
          {/* Traditional Agencies (The Bad) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative mt-12 md:mt-0 group flex flex-col"
          >
            {/* Peek Doodle (Left side - Desktop Only) */}
            <div className="absolute top-12 -left-40 w-40 h-48 overflow-hidden z-0 pointer-events-none hidden md:block">
              <img 
                src="/doodles/thinking.png" 
                alt="Stressed" 
                className="absolute top-8 right-0 w-32 h-32 object-contain drop-shadow-lg transition-all duration-1000 ease-out translate-x-full opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-6 group-hover:-rotate-12" 
              />
            </div>

            {/* The Card */}
            <div className="neu-card p-8 bg-[#f8fafc] flex flex-col relative z-10 h-full">
              {/* Static Doodle (Mobile Only) */}
              <div className="absolute -top-12 -right-4 z-30 md:hidden">
                <img src="/doodles/error.png" alt="Stressed" className="w-24 h-24 object-contain drop-shadow-lg transform -rotate-6" />
              </div>

              <div className="mb-8 relative z-20">
                <h3 className="font-display text-2xl text-slate-500 mb-2">Traditional Agencies</h3>
                <p className="text-gray-400 font-bold text-sm">Slow, manual, and stressful.</p>
              </div>

              <ul className="space-y-6 flex-grow relative z-20">
                {[
                  "Generic SOPs written from templates.",
                  "Manual document checks that miss errors.",
                  "Zero visibility into your application status.",
                  "Weeks of waiting for simple email replies.",
                  "Pushes you to partnered 'easy' universities."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-red-100 p-1 rounded-full shrink-0">
                      <X className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-gray-500 font-bold text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* EuropeBridge (The Good) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mt-12 md:mt-0 group flex flex-col"
          >
            {/* Peek Doodle (Right side - Desktop Only) */}
            <div className="absolute top-10 -right-48 w-58 h-56 overflow-hidden z-0 pointer-events-none hidden md:flex items-center">
              <img 
                src="/doodles/sucesss.png" 
                alt="Happy" 
                className="absolute top-10 left-0 w-40 h-40 object-contain drop-shadow-lg transition-all duration-1000 ease-out -translate-x-full opacity-0 scale-75 origin-bottom-left group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-x-6 group-hover:rotate-[25deg]" 
              />
            </div>

            {/* The Card */}
            <div className="neu-card p-8 bg-white flex flex-col relative border-2 border-germany-red/10 z-10 h-full">
              {/* Static Doodle (Mobile Only) */}
              <div className="absolute -top-12 -left-4 z-30 md:hidden">
                <img src="/doodles/sucesss.png" alt="Happy" className="w-24 h-24 object-contain drop-shadow-lg transform rotate-6" />
              </div>

              <div className="mb-8 relative z-20">
                <h3 className="font-display text-2xl text-germany-black mb-2">EuropeBridge</h3>
                <p className="text-germany-red font-bold text-sm">Fast, transparent, and AI-powered.</p>
              </div>

              <ul className="space-y-6 flex-grow relative z-20">
                {[
                  "AI-drafted, human-perfected custom SOPs.",
                  "Automated APS & VFS checklist validation.",
                  "Live dashboard for real-time status tracking.",
                  "Instant AI chat support + human experts.",
                  "Data-driven matching for the best universities."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-green-100 p-1 rounded-full shrink-0 shadow-sm">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-germany-black font-bold text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default About;
