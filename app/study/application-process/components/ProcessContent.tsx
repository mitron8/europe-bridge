"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Search, 
  FileText, 
  Send, 
  TrendingUp, 
  GraduationCap, 
  Plane,
  CheckCircle2, 
  ArrowUpRight, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const ProcessContent = () => {
  return (
    <section className="py-8 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Steps */}
        <div className="lg:col-span-8 space-y-12">
          {/* Step 1 */}
          <div id="section-research" className="scroll-mt-36 neu-card p-6 md:p-8 bg-white relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EBE7E0]/50 flex items-center justify-center text-germany-red font-display text-xl font-bold shrink-0 shadow-inner">
                1
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h2 className="text-xl md:text-2xl font-display text-germany-black flex items-center gap-2">
                    <Search className="w-5 h-5 text-germany-red" />
                    <span>Research and Shortlist Programs</span>
                  </h2>
                  <p className="text-xs text-gray-500 font-bold mt-1">Foundation of a successful application</p>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  A poorly chosen shortlist wastes time and money. Germany offers thousands of programs, so filtering correctly is critical. We recommend applying to <strong>6–10 programs</strong> divided into three tiers:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold">
                  <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0]/30 space-y-1">
                    <span className="text-germany-red">Dream (2-3)</span>
                    <p className="text-gray-500 font-normal">Top-ranked programs where your profile is borderline. Highly competitive but worth the shot.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0]/30 space-y-1">
                    <span className="text-germany-black">Target (3-4)</span>
                    <p className="text-gray-500 font-normal">Programs matching your GPA, ECTS credits, and profiles in historical admission records.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0]/30 space-y-1">
                    <span className="text-amber-600">Safe (2-3)</span>
                    <p className="text-gray-500 font-normal">No admission restrictions (NC-free) or lower GPA cutoffs where you are highly confident.</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-bold text-gray-700 bg-red-50/50 p-4 rounded-2xl border border-red-100/50">
                  <span className="text-germany-red block uppercase tracking-wider text-[10px]">What to Check for Each Program:</span>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 font-medium">
                    <li>Language of instruction (English vs. German vs. Mixed)</li>
                    <li>Specific credit requirements (minimum ECTS in core subjects)</li>
                    <li>Application deadlines (some cutoffs differ from standard dates)</li>
                    <li>Restricted admission (Numerus Clausus - NC) vs. Open admission</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div id="section-documents" className="scroll-mt-36 neu-card p-6 md:p-8 bg-white relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EBE7E0]/50 flex items-center justify-center text-germany-red font-display text-xl font-bold shrink-0 shadow-inner">
                2
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h2 className="text-xl md:text-2xl font-display text-germany-black flex items-center gap-2">
                    <FileText className="w-5 h-5 text-germany-red" />
                    <span>Prepare Your Documents</span>
                  </h2>
                  <p className="text-xs text-gray-500 font-bold mt-1">Start early and follow formatting rules</p>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  Document preparation is where most applicants lose time. Ensure everything is translated, certified, and formatted correctly.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
                  <div className="p-4 rounded-2xl bg-[#FDFBF7] space-y-2">
                    <span className="text-germany-black block border-b border-[#EBE7E0] pb-2">Academic Credentials</span>
                    <ul className="space-y-1.5 text-gray-600 font-semibold">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Degree Certificates (Apostilled)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Semester-wise Academic Transcripts</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> APS Verification Certificate (If applicable)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Language Scores (IELTS/TOEFL/TestDaF)</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FDFBF7] space-y-2">
                    <span className="text-germany-black block border-b border-[#EBE7E0] pb-2">Personal Materials</span>
                    <ul className="space-y-1.5 text-gray-600 font-semibold">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Tabular CV (Europass format)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Statement of Purpose (Motivation Letter)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Letter of Recommendations (usually 1-2)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Passport Copies (photo pages)</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100/50 text-xs text-gray-700 leading-relaxed font-medium space-y-2">
                  <span className="text-amber-800 font-bold block uppercase tracking-wider text-[10px]">Writing a Deciding Statement of Purpose (SOP):</span>
                  <p className="text-gray-600 font-semibold">
                    Explain why you selected this specific university and curriculum rather than writing generic praise. Connect your bachelor projects or work experience to specific courses offered in the Master's modules.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div id="section-channels" className="scroll-mt-36 neu-card p-6 md:p-8 bg-white relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EBE7E0]/50 flex items-center justify-center text-germany-red font-display text-xl font-bold shrink-0 shadow-inner">
                3
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h2 className="text-xl md:text-2xl font-display text-germany-black flex items-center gap-2">
                    <Send className="w-5 h-5 text-germany-red" />
                    <span>Apply Through the Right Channel</span>
                  </h2>
                  <p className="text-xs text-gray-500 font-bold mt-1">Centralized review vs. direct submissions</p>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  German universities route application packages via three distinct portals. Be sure you route through the correct one:
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0]/40 space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-germany-black">1. uni-assist Portal</span>
                      <span className="text-[10px] font-black uppercase text-germany-red">Most Common</span>
                    </div>
                    <p className="text-xs text-gray-600 font-medium leading-relaxed">
                      A centralized preliminary review body that converts your GPA and evaluates degrees for equivalence. Applying to the first university costs <strong>€75</strong>, with each additional application costing <strong>€30</strong>. They issue a <strong>VPD (Vorläufige Prüfungsdokumentation)</strong> which is forwarded to the university.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0]/40 space-y-2">
                    <span className="text-xs font-bold text-germany-black">2. Direct University Portal</span>
                    <p className="text-xs text-gray-600 font-medium leading-relaxed">
                      Some major public universities (like TU Munich, LMU Munich, and Mannheim) bypass uni-assist entirely. You submit directly to their custom portal (like campus.tum.de) for evaluation.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0]/40 space-y-2">
                    <span className="text-xs font-bold text-germany-black">3. hochschulstart.de Portal</span>
                    <p className="text-xs text-gray-600 font-medium leading-relaxed">
                      Mainly reserved for nationwide admission-restricted courses like medicine, dentistry, and pharmacy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div id="section-outcomes" className="scroll-mt-36 neu-card p-6 md:p-8 bg-white relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EBE7E0]/50 flex items-center justify-center text-germany-red font-display text-xl font-bold shrink-0 shadow-inner">
                4
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h2 className="text-xl md:text-2xl font-display text-germany-black flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-germany-red" />
                    <span>Track and Manage Applications</span>
                  </h2>
                  <p className="text-xs text-gray-500 font-bold mt-1">Understand outcomes and conditional offers</p>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  Universities typically take <strong>4 to 8 weeks after the deadline</strong> to issue decisions. Track statuses in uni-assist or direct portals.
                </p>

                <div className="overflow-x-auto rounded-2xl border border-[#EBE7E0] bg-[#FDFBF7]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#EBE7E0] bg-[#EBE7E0]/20 text-gray-500 font-bold">
                        <th className="px-4 py-3">Outcome</th>
                        <th className="px-4 py-3">What it Means</th>
                        <th className="px-4 py-3">Next Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EBE7E0] text-gray-700 font-medium">
                      <tr>
                        <td className="px-4 py-3 font-bold text-emerald-600">Zulassung</td>
                        <td className="px-4 py-3">Unconditional Admission</td>
                        <td className="px-4 py-3 font-bold">Enroll and start visa process</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-bold text-amber-600">Bedingte Zulassung</td>
                        <td className="px-4 py-3">Conditional Admission (e.g. submit pending transcripts)</td>
                        <td className="px-4 py-3">Fulfill conditions before the deadline</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-bold text-germany-red">Ablehnung</td>
                        <td className="px-4 py-3">Rejection (Not Admitted)</td>
                        <td className="px-4 py-3">Evaluate profile and apply next cycle</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div id="section-enrollment" className="scroll-mt-36 neu-card p-6 md:p-8 bg-white relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EBE7E0]/50 flex items-center justify-center text-germany-red font-display text-xl font-bold shrink-0 shadow-inner">
                5
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h2 className="text-xl md:text-2xl font-display text-germany-black flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-germany-red" />
                    <span>Accept Offer and Enroll</span>
                  </h2>
                  <p className="text-xs text-gray-500 font-bold mt-1">Secure enrollment before deadlines</p>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  Once you get the admission letter (<em>Zulassungsbescheid</em>), accept within the <strong>2–4 week deadline</strong>.
                </p>

                <div className="space-y-3 font-medium text-xs text-gray-600">
                  <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0]/40 space-y-2">
                    <span className="font-bold text-germany-black block">Semester Contribution (Semesterbeitrag)</span>
                    <p className="leading-relaxed">
                      Public universities are tuition-free, but they charge a semester contribution ranging from <strong>€70 to €390</strong> depending on the university. This covers student services, administration, and public transit tickets.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#EBE7E0]/40 space-y-2">
                    <span className="font-bold text-germany-black block">Official Enrollment (Immatrikulation)</span>
                    <p className="leading-relaxed">
                      Done online or in-person. Requires proof of public health insurance (GKV funds TK, AOK, Barmer, etc. push confirmation via the electronic M10 procedure). You will receive your <em>Immatrikulationsbescheinigung</em> (Enrollment Certificate).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div id="section-visa" className="scroll-mt-36 neu-card p-6 md:p-8 bg-white relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EBE7E0]/50 flex items-center justify-center text-germany-red font-display text-xl font-bold shrink-0 shadow-inner">
                6
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h2 className="text-xl md:text-2xl font-display text-germany-black flex items-center gap-2">
                    <Plane className="w-5 h-5 text-germany-red" />
                    <span>Visa and Pre-Departure Preparation</span>
                  </h2>
                  <p className="text-xs text-gray-500 font-bold mt-1">Blocked account and digital visa portal</p>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  The final step is securing your student visa (National Visa D) and planning the relocation.
                </p>

                <div className="p-4 bg-emerald-50/50 border border-emerald-100/50 rounded-2xl text-xs text-gray-700 space-y-1.5 font-medium">
                  <span className="text-emerald-800 font-bold block uppercase tracking-wider text-[10px]">NEW: Digital Visa Portal (2026)</span>
                  <p className="text-gray-600 font-semibold leading-relaxed">
                    Germany launched its nationwide digital visa portal. You can submit files online, leading to faster processing times of <strong>4 to 6 weeks</strong> (down from 8–12 weeks).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
                  <div className="p-4 rounded-2xl bg-[#FDFBF7] space-y-2">
                    <span className="text-germany-black block">Visa Requirements</span>
                    <ul className="space-y-1 text-gray-500 font-semibold list-disc list-inside">
                      <li>Admission Letter</li>
                      <li>Blocked Account (€11,904)</li>
                      <li>Health Insurance Policy</li>
                      <li>APS Verification Certificate</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FDFBF7] space-y-2">
                    <span className="text-germany-black block">First Week Checklist</span>
                    <ul className="space-y-1 text-gray-500 font-semibold list-disc list-inside">
                      <li>Register address at <em>Bürgeramt</em></li>
                      <li>Open a German bank account</li>
                      <li>Activate GKV health plan</li>
                      <li>Collect student ID card</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sticky Sidebar */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
          {/* Resource Card */}
          <div className="neu-card p-6 bg-white space-y-4">
            <h3 className="font-display text-base text-germany-black border-b border-[#EBE7E0] pb-2">
              Helpful Tools & Resources
            </h3>
            <div className="space-y-2">
              <Link 
                href="/tools/masters-admission-chance"
                className="flex items-center justify-between p-3 rounded-2xl bg-[#FDFBF7] hover:bg-[#EBE7E0]/50 transition-colors group font-bold text-xs text-germany-black"
              >
                <div className="space-y-0.5">
                  <span>Admission Chance Calculator</span>
                  <span className="block text-[10px] text-gray-400 font-medium">Check public university odds</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-germany-red transition-colors shrink-0" />
              </Link>

              <Link 
                href="/services/blocked-account"
                className="flex items-center justify-between p-3 rounded-2xl bg-[#FDFBF7] hover:bg-[#EBE7E0]/50 transition-colors group font-bold text-xs text-germany-black"
              >
                <div className="space-y-0.5">
                  <span>Blocked Account Assistance</span>
                  <span className="block text-[10px] text-gray-400 font-medium">Fintiba & Expatrio partners</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-germany-red transition-colors shrink-0" />
              </Link>

              <Link 
                href="/services/education-loan"
                className="flex items-center justify-between p-3 rounded-2xl bg-[#FDFBF7] hover:bg-[#EBE7E0]/50 transition-colors group font-bold text-xs text-germany-black"
              >
                <div className="space-y-0.5">
                  <span>Education Loan Portal</span>
                  <span className="block text-[10px] text-gray-400 font-medium">Instant pre-approval</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-germany-red transition-colors shrink-0" />
              </Link>

              <Link 
                href="/study/aps"
                className="flex items-center justify-between p-3 rounded-2xl bg-[#FDFBF7] hover:bg-[#EBE7E0]/50 transition-colors group font-bold text-xs text-germany-black"
              >
                <div className="space-y-0.5">
                  <span>APS Verification Guide</span>
                  <span className="block text-[10px] text-gray-400 font-medium">Required for South Asian students</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-germany-red transition-colors shrink-0" />
              </Link>
            </div>
          </div>

          {/* Prompt card */}
          <div className="neu-card p-6 bg-germany-black text-white space-y-4">
            <h3 className="font-display text-base text-white border-b border-white/20 pb-2">
              Let's evaluate your profile!
            </h3>
            <p className="text-xs text-white/80 leading-relaxed font-semibold">
              Get detailed odds for public German university admissions from our expert team, absolutely free.
            </p>
            <Link 
              href="/profile-evaluation"
              className="w-full inline-flex items-center justify-center py-3 bg-germany-red hover:bg-red-700 transition-colors rounded-2xl text-xs font-black uppercase text-white shadow-md text-center"
            >
              Get Free Evaluation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
