"use client";
import React from 'react';
import Link from 'next/link';
import { GitPullRequest, Clock, CheckCircle2, AlertTriangle, FileText, UserCheck, Sparkles, Send } from 'lucide-react';

export const ScholarshipApplicationRoadmap = () => {
  const roadmapSteps = [
    {
      phase: 'Phase 1: 12–18 Months Before Intake',
      title: 'Profile Audit & Grade Conversion',
      icon: Clock,
      color: 'border-l-blue-500',
      tag: 'Foundation',
      tasks: [
        'Convert your undergraduate GPA to the German 1.0–4.0 scale (Bavarian Formula)',
        'Check German language (Goethe / TestDaF) or English (IELTS / TOEFL) score thresholds',
        'Identify target German university courses (Master’s curriculum & research groups)',
        'Collect certificates of extracurriculars, volunteering, or social initiatives'
      ]
    },
    {
      phase: 'Phase 2: 9–12 Months Before Intake',
      title: 'Scholarship Mapping & Early Deadlines',
      icon: GitPullRequest,
      color: 'border-l-germany-red',
      tag: 'Critical Window',
      tasks: [
        'Track early DAAD portal deadlines (many close between July and October for the following year)',
        'Verify whether target scholarship requires pre-admission or handles admission internally',
        'Request 2 academic recommendation letters (LOR) from former professors',
        'Ensure APS certificate verification is underway (crucial for students from India/China/Vietnam)'
      ]
    },
    {
      phase: 'Phase 3: 6–9 Months Before Intake',
      title: 'Tailored SOP & Foundation Alignment',
      icon: FileText,
      color: 'border-l-amber-500',
      tag: 'Document Crafting',
      tasks: [
        'Write a distinctive Statement of Motivation customized to the scholarship foundation’s core ethos',
        'Draft a 2–3 page research proposal if applying for research-oriented or PhD tracks',
        'Format your CV strictly according to the German Tabellarischer Lebenslauf standard',
        'Have your documents reviewed by an experienced German study counselor'
      ]
    },
    {
      phase: 'Phase 4: 3–6 Months Before Intake',
      title: 'Submission & University Coordination',
      icon: Send,
      color: 'border-l-emerald-500',
      tag: 'Application Push',
      tasks: [
        'Submit official scholarship dossiers via Uni-Assist or directly to university portals',
        'Prepare for scholarship panel interviews (often conducted in English or German via video)',
        'Track Deutschlandstipendium calls opened by your enrolled university department',
        'Keep backup financial preparations ready (Blocked Account arrangement)'
      ]
    }
  ];

  const mistakes = [
    {
      title: 'Missing the 1-Year Early Deadline',
      desc: 'Most students realize too late that prestigious DAAD scholarships close nearly a full year before classes begin. Waiting for university admission before starting scholarship prep is the #1 mistake.'
    },
    {
      title: 'Using a Generic SOP',
      desc: 'Submitting the exact same motivation letter to DAAD, Heinrich Böll, and your university will lead to immediate rejection. Each foundation has distinct ideological and societal goals.'
    },
    {
      title: 'Overlooking Deutschlandstipendium',
      desc: 'Many students falsely assume they must have a 1.0 GPA to apply. In reality, Deutschlandstipendium awards consider volunteering, family background, and department ranking.'
    },
    {
      title: 'Vague Letters of Recommendation',
      desc: 'Generic LORs stating "the student was punctual" carry zero weight in German selection committees. LORs must detail concrete academic projects and analytical rigor.'
    }
  ];

  return (
    <section id="application-roadmap" className="py-12 px-6 lg:px-12 bg-cream/40 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-germany-red text-xs font-black uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>Step-by-Step Strategy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Scholarship Application Timeline & Roadmap
          </h2>
          <p className="text-base text-gray-700 font-medium leading-relaxed">
            German scholarships are competitive, but 80% of candidates fail simply due to poor timing or generic documents. Here is the exact playbook to maximize your chances.
          </p>
        </div>

        {/* Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roadmapSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className={`neu-card p-6 sm:p-7 border-l-4 ${step.color} flex flex-col justify-between space-y-5`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {step.phase}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-germany-black bg-gray-100 px-2.5 py-0.5 rounded-full">
                      {step.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-germany-black flex items-center gap-2">
                    <Icon className="w-5 h-5 text-germany-red shrink-0" />
                    <span>{step.title}</span>
                  </h3>

                  <div className="space-y-2 pt-2">
                    {step.tasks.map((task, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2 text-xs text-gray-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-semibold">EuropeBridge Step {idx + 1} of 4</span>
                  <Link href="/#cta" className="font-bold text-germany-red hover:underline">
                    Get Template &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mistakes to Avoid Callout Box */}
        <div className="neu-card p-6 sm:p-8 border border-red-200 bg-red-50/20 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center text-germany-red shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-germany-black">
                4 Fatal Mistakes That Lead to Scholarship Rejections
              </h3>
              <p className="text-xs text-gray-600 font-medium">
                Keep these crucial caveats in mind when preparing your documents.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mistakes.map((item, idx) => (
              <div key={idx} className="bg-white/90 p-4 rounded-xl border border-red-100/80 space-y-1.5 shadow-sm">
                <div className="text-xs font-black text-germany-red">{item.title}</div>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
