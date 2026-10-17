"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Search, 
  FileText, 
  Send, 
  TrendingUp, 
  GraduationCap, 
  Plane,
  Check, 
  ArrowRight
} from 'lucide-react';
import { StudyContentGate } from '@/components/StudyContentGate';

export const ProcessContent = () => {
  return (
    <section className="py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" data-reveal>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Steps */}
        <div className="lg:col-span-8 space-y-8">
          {/* Step 1 */}
          <div id="section-research" className="scroll-mt-32 bg-[#faf8f3] rounded-2xl p-6 sm:p-8 border border-[#e5e0d3] space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#eae5db] flex items-center justify-center text-[var(--lp-red)] font-serif text-lg font-bold shrink-0">
                1
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-normal text-[var(--lp-ink)] flex items-center gap-2">
                    <Search className="w-4 h-4 text-[var(--lp-red)]" />
                    <span>Research and Shortlist Programs</span>
                  </h2>
                  <p className="text-xs text-[var(--lp-muted)] mt-0.5">Foundation of a successful application</p>
                </div>

                <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                  Germany offers thousands of programs. Shortlisting correctly is critical. We recommend applying to <strong className="text-[var(--lp-text)]">6–10 programs</strong> divided into three tiers:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1">
                    <span className="font-serif text-sm font-normal text-[var(--lp-red)] block">Dream (2–3)</span>
                    <p className="text-[11px] text-[var(--lp-muted)] leading-relaxed">Top-ranked TU9 programs where admission is highly selective.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1">
                    <span className="font-serif text-sm font-normal text-[var(--lp-ink)] block">Target (3–4)</span>
                    <p className="text-[11px] text-[var(--lp-muted)] leading-relaxed">Programs closely matching your GPA, ECTS credits, and background.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1">
                    <span className="font-serif text-sm font-normal text-[var(--lp-gold)] block">Safe (2–3)</span>
                    <p className="text-[11px] text-[var(--lp-muted)] leading-relaxed">Open admission (NC-free) programs where you comfortably meet all criteria.</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[var(--lp-muted)] bg-[#eae5db]/50 p-4 rounded-xl border border-[#e5e0d3]">
                  <span className="text-[var(--lp-text)] font-semibold block text-[11px] uppercase tracking-wider">What to Check for Each Program:</span>
                  <ul className="space-y-1 text-[11px] pl-1">
                    <li>• Language of instruction (English vs. German vs. Mixed)</li>
                    <li>• Specific subject ECTS credit prerequisites</li>
                    <li>• Application deadlines (Uni-Assist vs. Direct portal)</li>
                    <li>• NC restricted admission vs. Open admission</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div id="section-documents" className="scroll-mt-32 bg-[#faf8f3] rounded-2xl p-6 sm:p-8 border border-[#e5e0d3] space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#eae5db] flex items-center justify-center text-[var(--lp-red)] font-serif text-lg font-bold shrink-0">
                2
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-normal text-[var(--lp-ink)] flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[var(--lp-red)]" />
                    <span>Prepare Your Documents</span>
                  </h2>
                  <p className="text-xs text-[var(--lp-muted)] mt-0.5">Start early and adhere strictly to consular formatting</p>
                </div>

                <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                  Document preparation is where most applicants lose weeks. Ensure everything is certified, translated, and formatted correctly.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-2">
                    <span className="font-semibold text-[var(--lp-text)] block border-b border-[#e5e0d3] pb-1.5">Academic Credentials</span>
                    <ul className="space-y-1.5 text-[var(--lp-muted)] text-[11px]">
                      <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0" /> Degree Certificates &amp; Transcripts</li>
                      <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0" /> APS Verification Certificate</li>
                      <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0" /> Language Scores (IELTS / TOEFL / TestDaF)</li>
                      <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0" /> Course Module Syllabus descriptions</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-2">
                    <span className="font-semibold text-[var(--lp-text)] block border-b border-[#e5e0d3] pb-1.5">Personal Dossier</span>
                    <ul className="space-y-1.5 text-[var(--lp-muted)] text-[11px]">
                      <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0" /> Tabular CV in Europass format</li>
                      <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0" /> Tailored Statement of Purpose (SOP)</li>
                      <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0" /> Academic Letters of Recommendation (LOR)</li>
                      <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[var(--lp-gold)] shrink-0" /> Valid Passport copy</li>
                    </ul>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#eae5db]/60 border border-[#e5e0d3] text-xs text-[var(--lp-muted)] space-y-1">
                  <span className="text-[var(--lp-text)] font-semibold block text-[10px] font-mono uppercase tracking-wider">Statement of Purpose (SOP) Strategy:</span>
                  <p className="leading-relaxed">
                    Explain specifically why you selected this faculty curriculum. Connect your bachelor thesis or industrial projects to specific modules offered in the master&apos;s curriculum.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <StudyContentGate guideTitle="Full Step-by-Step Application Guide">
            <div className="space-y-8">
              {/* Step 3 */}
              <div id="section-channels" className="scroll-mt-32 bg-[#faf8f3] rounded-2xl p-6 sm:p-8 border border-[#e5e0d3] space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#eae5db] flex items-center justify-center text-[var(--lp-red)] font-serif text-lg font-bold shrink-0">
                    3
                  </div>
                  <div className="space-y-4 flex-1">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-normal text-[var(--lp-ink)] flex items-center gap-2">
                        <Send className="w-4 h-4 text-[var(--lp-red)]" />
                        <span>Apply Through the Right Portal</span>
                      </h2>
                      <p className="text-xs text-[var(--lp-muted)] mt-0.5">Centralized review vs. direct university submissions</p>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                      German universities process international dossiers through three primary channels:
                    </p>

                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1.5">
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs font-semibold text-[var(--lp-text)]">1. uni-assist Portal</span>
                          <span className="text-[10px] font-mono uppercase text-[var(--lp-red)] bg-[var(--lp-red)]/10 px-2 py-0.5 rounded-full border border-[var(--lp-red)]/20">Most Common</span>
                        </div>
                        <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                          Centralized preliminary review body that converts your GPA and evaluates degrees for equivalence. First application costs <strong className="text-[var(--lp-text)]">€75</strong>, with each additional application costing <strong className="text-[var(--lp-text)]">€30</strong>. They issue a <strong className="text-[var(--lp-text)]">VPD</strong> certificate forwarded to the university.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1.5">
                        <span className="text-xs font-semibold text-[var(--lp-text)] block">2. Direct University Portal</span>
                        <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                          Major public universities (like TU Munich, RWTH Aachen, and LMU) operate proprietary admission portals (such as campus.tum.de) directly without uni-assist.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1.5">
                        <span className="text-xs font-semibold text-[var(--lp-text)] block">3. hochschulstart.de</span>
                        <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
                          Reserved for nationwide restricted admissions programs like medicine, dentistry, and pharmacy.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div id="section-outcomes" className="scroll-mt-32 bg-[#faf8f3] rounded-2xl p-6 sm:p-8 border border-[#e5e0d3] space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#eae5db] flex items-center justify-center text-[var(--lp-red)] font-serif text-lg font-bold shrink-0">
                    4
                  </div>
                  <div className="space-y-4 flex-1">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-normal text-[var(--lp-ink)] flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[var(--lp-red)]" />
                        <span>Track Applications &amp; Admission Offers</span>
                      </h2>
                      <p className="text-xs text-[var(--lp-muted)] mt-0.5">Understand admission outcomes and conditions</p>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                      Universities typically take <strong className="text-[var(--lp-text)]">4 to 8 weeks after the deadline</strong> to issue decisions.
                    </p>

                    <div className="overflow-x-auto rounded-xl border border-[#e5e0d3] bg-[#eae5db]/40">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-[#e5e0d3] bg-[#eae5db] text-[var(--lp-text)] font-semibold uppercase text-[10px] font-mono tracking-wider">
                            <th className="px-4 py-3">Outcome</th>
                            <th className="px-4 py-3">What it Means</th>
                            <th className="px-4 py-3">Next Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e5e0d3] text-[var(--lp-muted)]">
                          <tr>
                            <td className="px-4 py-3 font-semibold text-[var(--lp-text)]">Full Admission</td>
                            <td className="px-4 py-3">Unconditional offer letter issued</td>
                            <td className="px-4 py-3 text-[var(--lp-red)] font-semibold">Accept offer &amp; pay semester fee</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-semibold text-[var(--lp-gold)]">Conditional Offer</td>
                            <td className="px-4 py-3">Pending conditions (e.g., degree completion)</td>
                            <td className="px-4 py-3">Fulfill conditions before enrollment</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-semibold text-[var(--lp-muted)]">Rejection</td>
                            <td className="px-4 py-3">Credit prerequisites or NC not met</td>
                            <td className="px-4 py-3">Audit rationale &amp; target alternatives</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div id="section-enrollment" className="scroll-mt-32 bg-[#faf8f3] rounded-2xl p-6 sm:p-8 border border-[#e5e0d3] space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#eae5db] flex items-center justify-center text-[var(--lp-red)] font-serif text-lg font-bold shrink-0">
                    5
                  </div>
                  <div className="space-y-4 flex-1">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-normal text-[var(--lp-ink)] flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[var(--lp-red)]" />
                        <span>Accept Offer, Enroll &amp; Visa</span>
                      </h2>
                      <p className="text-xs text-[var(--lp-muted)] mt-0.5">Secure enrollment and begin visa procedures</p>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
                      Accept your offer within the stated window (typically 2–4 weeks), transfer your semester contribution (<strong className="text-[var(--lp-text)]">€150–€380</strong>), and trigger statutory health insurance confirmation (TK/Barmer) for electronic enrollment.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1.5">
                        <span className="font-semibold text-[var(--lp-text)] block">Visa Checklist</span>
                        <ul className="space-y-1 text-[var(--lp-muted)] text-[11px]">
                          <li>• Admission Letter (Zulassungsbescheid)</li>
                          <li>• Blocked Account (€11,904)</li>
                          <li>• Statutory Health Insurance</li>
                          <li>• Valid APS Certificate</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] space-y-1.5">
                        <span className="font-semibold text-[var(--lp-text)] block">Arrival Week Checklist</span>
                        <ul className="space-y-1 text-[var(--lp-muted)] text-[11px]">
                          <li>• City registration at <em>Bürgeramt</em></li>
                          <li>• Open German checking account</li>
                          <li>• Activate GKV health insurance</li>
                          <li>• Collect student transit card</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </StudyContentGate>
        </div>

        {/* Right Column - Sticky Sidebar */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
          {/* Resource Card */}
          <div className="bg-[#faf8f3] rounded-2xl p-6 border border-[#e5e0d3] space-y-4 shadow-xs">
            <h3 className="font-serif text-base font-normal text-[var(--lp-ink)] border-b border-[#e5e0d3] pb-2">
              Helpful Tools &amp; Resources
            </h3>
            <div className="space-y-2.5">
              {[
                { title: "Admission Chance Calculator", desc: "Check public university odds", href: "/tools/admission-chance" },
                { title: "Blocked Account Assistance", desc: "Fintiba & Expatrio partners", href: "/services/blocked-account" },
                { title: "Education Loan Advisory", desc: "Fast pre-approval", href: "/services/education-loan" },
                { title: "APS Verification Guide", desc: "Required for South Asian students", href: "/study/aps" },
              ].map((res) => (
                <Link 
                  key={res.title}
                  href={res.href}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#eae5db]/50 border border-[#e5e0d3] hover:border-[var(--lp-red)]/30 transition-all group text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold text-[var(--lp-text)] group-hover:text-[var(--lp-red)] transition-colors block">
                      {res.title}
                    </span>
                    <span className="text-[10px] text-[var(--lp-muted)] font-mono block">
                      {res.desc}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--lp-muted)] group-hover:text-[var(--lp-red)] transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Evaluate Card */}
          <div className="bg-[var(--lp-ink)] text-white rounded-2xl p-6 space-y-3.5 shadow-md">
            <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
              <h3 className="font-serif text-base font-normal">Evaluate Your Chances</h3>
              <span className="text-[10px] font-mono uppercase text-[var(--lp-gold)] bg-white/10 px-2 py-0.5 rounded-full">
                Free Tool
              </span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Find out your exact admission odds for public German universities based on your GPA, ECTS credits, and language scores.
            </p>
            <Link 
              href="/tools/admission-chance"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[var(--lp-red)] hover:bg-[#b5322b] text-white text-xs font-semibold transition-colors"
            >
              <span>Calculate Chances</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
