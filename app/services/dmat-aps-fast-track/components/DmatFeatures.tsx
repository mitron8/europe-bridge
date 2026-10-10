"use client";
import React from 'react';
import { ClipboardCheck, MapPin, CalendarCheck, BookOpen, FileText, PhoneCall, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const DmatFeatures = () => {
  const features = [
    {
      icon: ClipboardCheck,
      title: "We Handle Your dMAT Registration",
      desc: "We configure your official g.a.s.t. candidate account and execute your complete registration without portal errors or incorrect exam modules."
    },
    {
      icon: MapPin,
      title: "Test Centre Booking Support",
      desc: "Ten Indian cities share the same test date, and high-demand hubs like Delhi, Mumbai, and Bangalore fill up rapidly. We help you lock in a centre close to you."
    },
    {
      icon: CalendarCheck,
      title: "Strict Deadline Monitoring",
      desc: "We monitor the strict registration window with daily alerts so you never miss the deadline or forfeit your target intake timeline."
    },
    {
      icon: BookOpen,
      title: "Preparation Materials & Mock Tests",
      desc: "Access structured dMAT sample questions, numerical reasoning exercises, pattern recognition drills, and full-length mock tests for the General Academic Module."
    },
    {
      icon: FileText,
      title: "APS Integration & Timeline Planning",
      desc: "We provide step-by-step guidance on how your dMAT test certificate connects directly to your APS India verification file and subsequent visa appointment."
    },
    {
      icon: PhoneCall,
      title: "1:1 Expert Counselor Q&A Call",
      desc: "Schedule a dedicated one-on-one session with a EuropeBridge senior counselor to resolve any lingering doubts regarding your degree or German university plans."
    }
  ];

  return (
    <section id="how-it-works" className="py-12 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-black uppercase tracking-widest text-germany-red">
            End-to-End Support
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            What We Do For You
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            We help you register, prepare, book the right centre, and plan your APS timeline on schedule.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div 
                key={idx}
                className="p-6 rounded-2xl bg-white border border-gray-200 shadow-2xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-germany-red flex items-center justify-center font-bold border border-red-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-germany-black text-lg">{feat.title}</h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-green-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span>Verified by EuropeBridge Advisors</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
