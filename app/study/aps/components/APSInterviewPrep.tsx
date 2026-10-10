"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, CheckCircle2, AlertTriangle, Lightbulb, HelpCircle } from 'lucide-react';

export const APSInterviewPrep = () => {
  return (
    <section id="section-interview" className="py-12 px-6 lg:px-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold shrink-0 shadow-sm">
              <MessageSquare className="w-6 h-6 text-indigo-700" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-germany-red tracking-wider">Section #4</span>
              <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">APS Interview Preparation Guide</h2>
              <p className="text-sm text-gray-600 font-medium mt-1">
                The APS interview is an academic verification check (15–20 minutes) to confirm that you actually studied your transcript subjects.
              </p>
            </div>
          </div>
        </div>

        {/* Question Categories Grid */}
        <div className="neu-card p-6 sm:p-8 space-y-6">
          <h3 className="font-extrabold text-germany-black text-lg border-b border-gray-200 pb-3">
            Key Categories of Interview Questions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2">
              <div className="flex items-center gap-2 text-germany-red font-extrabold text-sm">
                <HelpCircle className="w-4 h-4 text-germany-red" />
                <span>1. Core Subject Fundamentals</span>
              </div>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                "What is the difference between a compiler and an interpreter?" or "Explain the 2nd law of thermodynamics." Evaluators test basic concepts from your major subjects.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2">
              <div className="flex items-center gap-2 text-germany-red font-extrabold text-sm">
                <HelpCircle className="w-4 h-4 text-germany-red" />
                <span>2. Final Year Thesis &amp; Projects</span>
              </div>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                "Explain your senior year project. What problem did you solve? What methodology, tools, and algorithms did you choose, and what were the results?"
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2">
              <div className="flex items-center gap-2 text-germany-red font-extrabold text-sm">
                <HelpCircle className="w-4 h-4 text-germany-red" />
                <span>3. Application-Based Problem Solving</span>
              </div>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Evaluators may ask you to sketch a circuit, write a pseudocode loop, or outline a database schema on paper or whiteboard during the interview.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2">
              <div className="flex items-center gap-2 text-germany-red font-extrabold text-sm">
                <HelpCircle className="w-4 h-4 text-germany-red" />
                <span>4. High-Credit Subject Deep Dives</span>
              </div>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Evaluators select subjects directly from your mark sheet where you earned maximum credits or high grades to verify genuine mastery.
              </p>
            </div>
          </div>
        </div>

        {/* Preparation Tips & Pitfalls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="neu-card p-6 space-y-3 border-l-4 border-l-emerald-500">
            <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-base">
              <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Winning Preparation Strategies</span>
            </div>
            <ul className="space-y-2 text-xs text-gray-700 font-medium">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Focus on High-Credit Courses:</strong> Revisit fundamental definitions and principles of 4–5 core subjects.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Master Project Details:</strong> Be ready to explain your thesis role, libraries used, and project architecture clearly.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Be Honest (Never Bluff):</strong> If you do not recall a formula, state so honestly rather than guessing or bluffing.</span>
              </li>
            </ul>
          </div>

          <div className="neu-card p-6 space-y-3 border-l-4 border-l-red-500 bg-red-50/20">
            <div className="flex items-center gap-2 text-red-950 font-extrabold text-base">
              <AlertTriangle className="w-5 h-5 text-germany-red shrink-0" />
              <span>Common Pitfalls to Avoid</span>
            </div>
            <ul className="space-y-2 text-xs text-gray-700 font-medium">
              <li className="flex items-start gap-1.5">
                <span className="text-germany-red font-bold">•</span>
                <span><strong>Memorizing Answers:</strong> Reciting memorized definitions from forums without conceptual understanding.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-germany-red font-bold">•</span>
                <span><strong>Steering Topics:</strong> Attempting to force the interviewers toward unrelated subjects. Evaluators set the agenda.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-germany-red font-bold">•</span>
                <span><strong>Excessive Nervousness:</strong> Panicking instead of taking a pause to organize your thoughts before answering.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
