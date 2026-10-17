"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, CheckCircle2, AlertTriangle, Lightbulb, HelpCircle } from 'lucide-react';

export const APSInterviewPrep = () => {
  return (
    <section id="section-interview" className="py-12 px-4 sm:px-6 lg:px-12 scroll-mt-28">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div data-reveal className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center shrink-0 border border-[#e2ddd3] shadow-xs">
            <MessageSquare className="w-6 h-6 text-[var(--lp-text)]" />
          </div>
          <div>
            <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-red)]">
              Section #4
            </div>
            <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
              APS Interview <em className="lp-script text-[var(--lp-red)]">Preparation Guide</em>
            </h2>
            <p className="text-sm sm:text-base text-[var(--lp-muted)] font-normal mt-1 max-w-3xl leading-relaxed">
              The APS interview is an academic verification check (15–20 minutes) to confirm that you actually studied your transcript subjects.
            </p>
          </div>
        </div>

        {/* Question Categories Grid */}
        <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
          <h3 className="lp-serif text-xl sm:text-2xl font-semibold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-4">
            Key Categories of Interview Questions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-white/70 border border-[#e2ddd3] space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-[var(--lp-red)] font-semibold text-sm">
                <HelpCircle className="w-4 h-4 text-[var(--lp-red)]" />
                <span>1. Core Subject Fundamentals</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                "What is the difference between a compiler and an interpreter?" or "Explain the 2nd law of thermodynamics." Evaluators test basic concepts from your major subjects.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-white/70 border border-[#e2ddd3] space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-[var(--lp-red)] font-semibold text-sm">
                <HelpCircle className="w-4 h-4 text-[var(--lp-red)]" />
                <span>2. Final Year Thesis &amp; Projects</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                "Explain your senior year project. What problem did you solve? What methodology, tools, and algorithms did you choose, and what were the results?"
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-white/70 border border-[#e2ddd3] space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-[var(--lp-red)] font-semibold text-sm">
                <HelpCircle className="w-4 h-4 text-[var(--lp-red)]" />
                <span>3. Application-Based Problem Solving</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                Evaluators may ask you to sketch a circuit, write a pseudocode loop, or outline a database schema on paper or whiteboard during the interview.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-white/70 border border-[#e2ddd3] space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-[var(--lp-red)] font-semibold text-sm">
                <HelpCircle className="w-4 h-4 text-[var(--lp-red)]" />
                <span>4. High-Credit Subject Deep Dives</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                Evaluators select subjects directly from your mark sheet where you earned maximum credits or high grades to verify genuine mastery.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Preparation Tips & Pitfalls */}
        <div data-reveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-3 border-l-4 border-l-[var(--lp-ink)] shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2.5 text-[var(--lp-text)] font-semibold text-lg">
              <Lightbulb className="w-5 h-5 text-[var(--lp-gold)] shrink-0" />
              <span className="lp-serif">Winning Preparation Strategies</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <span><strong className="text-[var(--lp-text)] font-semibold">Focus on High-Credit Courses:</strong> Revisit fundamental definitions and principles of 4–5 core subjects.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <span><strong className="text-[var(--lp-text)] font-semibold">Master Project Details:</strong> Be ready to explain your thesis role, libraries used, and project architecture clearly.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                <span><strong className="text-[var(--lp-text)] font-semibold">Be Honest (Never Bluff):</strong> If you do not recall a formula, state so honestly rather than guessing or bluffing.</span>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-8 space-y-3 border-l-4 border-l-[var(--lp-red)] shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2.5 text-[var(--lp-text)] font-semibold text-lg">
              <AlertTriangle className="w-5 h-5 text-[var(--lp-red)] shrink-0" />
              <span className="lp-serif">Common Pitfalls to Avoid</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[var(--lp-red)] font-bold">•</span>
                <span><strong className="text-[var(--lp-text)] font-semibold">Memorizing Answers:</strong> Reciting memorized definitions from forums without conceptual understanding.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--lp-red)] font-bold">•</span>
                <span><strong className="text-[var(--lp-text)] font-semibold">Steering Topics:</strong> Attempting to force the interviewers toward unrelated subjects. Evaluators set the agenda.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--lp-red)] font-bold">•</span>
                <span><strong className="text-[var(--lp-text)] font-semibold">Excessive Nervousness:</strong> Panicking instead of taking a pause to organize your thoughts before answering.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
