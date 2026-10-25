import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import { Scale, ChevronRight, FileText, CheckCircle2, AlertCircle, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service (AGB) | EuropeBridge",
  description: "Terms and conditions governing the use of EuropeBridge educational consulting, document drafting, and admissions guidance services.",
};

export default function TermsPage() {
  return (
    <main className="bg-[var(--lp-paper)] min-h-screen text-[var(--lp-text)] selection:bg-[var(--lp-red)] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />

        {/* Ambient Glow */}
        <div 
          aria-hidden 
          className="pointer-events-none absolute inset-x-0 top-0 h-[480px] opacity-40 blur-[120px] -z-10"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(201,163,91,0.22), rgba(230,57,70,0.1), transparent 70%)"
          }}
        />

        {/* Header */}
        <section className="relative pt-28 sm:pt-36 pb-10">
          <div className="lp-container text-center max-w-3xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-xs font-semibold text-[var(--lp-muted)]">
              <Link href="/" className="hover:text-[var(--lp-red)] transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3 text-[var(--lp-faint)]" />
              <span className="font-bold text-[var(--lp-text)]">Terms of Service</span>
            </nav>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--lp-rule-strong)] bg-white/70 backdrop-blur-sm px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)]" />
              General Terms &amp; Conditions (AGB)
            </div>

            <h1 className="lp-h2 text-center text-[clamp(2.2rem,4.5vw,3.75rem)] leading-[1.12] tracking-[-0.02em]">
              Terms of <em className="lp-script text-[var(--lp-red)]">Service</em>
            </h1>

            <p className="mt-4 text-xs sm:text-sm text-[var(--lp-muted)] font-medium">
              Effective Date: January 1, 2026 · Governed by the laws of the Federal Republic of Germany
            </p>
          </div>
        </section>

        {/* Content Body */}
        <section className="lp-container pb-24 max-w-4xl mx-auto">
          <div className="bg-[var(--lp-card)] border border-[var(--lp-rule)] rounded-3xl p-6 sm:p-12 shadow-[0_8px_30px_rgba(22,22,26,0.03)] space-y-10 leading-relaxed text-[14.5px] sm:text-[15.5px] text-[var(--lp-muted)]">

            {/* Scope */}
            <div className="space-y-3">
              <h2 className="lp-serif text-2xl font-bold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-2">
                1. Scope of Agreement
              </h2>
              <p>
                These General Terms and Conditions (hereinafter &quot;Terms&quot;) govern the contractual relationship between <strong>EuropeBridge GmbH</strong>, Friedrichstraße 123, 10117 Berlin, Germany (hereinafter &quot;EuropeBridge&quot;, &quot;we&quot;, &quot;our&quot;), and the individual user or applicant (hereinafter &quot;Client&quot;, &quot;you&quot;) regarding our online portal, digital calculators, educational consultation, document drafting, university shortlisting, and visa guidance services.
              </p>
              <p>
                By registering an account, submitting an onboarding order, or using our free tools, you agree to be bound by these Terms in full.
              </p>
            </div>

            {/* Advisory Nature */}
            <div className="space-y-3">
              <h2 className="lp-serif text-2xl font-bold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-2">
                2. Nature of Advisory Services &amp; Disclaimers
              </h2>
              <p>
                EuropeBridge acts strictly as an independent higher education consultancy and preparation platform:
              </p>
              <ul className="space-y-2.5 pl-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-1" />
                  <span><strong>Independent Guidance:</strong> We are not an official arm of any university, the DAAD, Uni-Assist e.V., the Akademische Prüfstelle (APS), or the German Federal Foreign Office (Auswärtiges Amt).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-1" />
                  <span><strong>Admissions Autonomy:</strong> Final admission decisions reside solely with the faculty examination committees (Prüfungsausschüsse) of the respective German universities. While our alumni advisors provide rigorous profile evaluations, EuropeBridge cannot guarantee university acceptance.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-1" />
                  <span><strong>Visa Sovereignty:</strong> German National Visas (Visa D) are granted solely at the discretion of the competent German Embassy or Consulate General. EuropeBridge guarantees professional, checklist-audited preparation but holds no influence over consular discretion.</span>
                </li>
              </ul>
            </div>

            {/* Client Obligations */}
            <div className="space-y-3">
              <h2 className="lp-serif text-2xl font-bold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-2">
                3. Client Responsibilities &amp; Document Authenticity
              </h2>
              <p>
                As a client using our platform, you warrant and agree that:
              </p>
              <ul className="space-y-2 list-disc pl-5 text-xs sm:text-sm">
                <li>All marks, degrees, semester transcripts, and test scores submitted are 100% genuine and unaltered. Submitting forged or fraudulent documents to APS or German universities constitutes a criminal offense under German law (§ 267 StGB).</li>
                <li>You will review all drafts (SOP, CV, Cover Letter) created in collaboration with our writers and confirm their factual accuracy before submission.</li>
                <li>You are solely responsible for meeting individual university application windows and submitting original dossiers via Uni-Assist or courier before deadlines.</li>
              </ul>
            </div>

            {/* Document Drafting & Revisions */}
            <div className="space-y-3">
              <h2 className="lp-serif text-2xl font-bold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-2">
                4. Document Drafting &amp; Revision Policies
              </h2>
              <p>
                For our drafting services (SOP, LOR, CV, Anschreiben, Letter of Motivation):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-white border border-[#e5e0d3]">
                  <strong className="block text-xs font-bold uppercase tracking-wider text-[var(--lp-text)] mb-1">Standard Delivery Window</strong>
                  <p className="text-xs">First drafts are delivered within 3 working days (or 24 hours if Express Service is selected) from receiving complete client questionnaire data.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#e5e0d3]">
                  <strong className="block text-xs font-bold uppercase tracking-wider text-[var(--lp-text)] mb-1">14-Day Revision Period</strong>
                  <p className="text-xs">Every drafting package includes up to 2 comprehensive rounds of revision requested within 14 calendar days of draft delivery.</p>
                </div>
              </div>
            </div>

            {/* Fees & Payment */}
            <div className="space-y-3">
              <h2 className="lp-serif text-2xl font-bold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-2">
                5. Fees, Invoicing &amp; Cancellation
              </h2>
              <p>
                All prices listed on our platform are transparent flat fees inclusive of applicable taxes unless stated otherwise. 
              </p>
              <ul className="space-y-2 list-disc pl-5 text-xs sm:text-sm">
                <li><strong>Payment Due Date:</strong> Service fees are payable upon booking prior to commencement of dossier audit or drafting.</li>
                <li><strong>Right of Withdrawal:</strong> Consumers within the EU enjoy a statutory 14-day cancellation right. For digital custom services (e.g. customized SOP or individual shortlist research), the right of withdrawal expires once execution has commenced with your explicit prior consent.</li>
                <li><strong>Refund Policy:</strong> If a university shortlisting deadline is missed due to EuropeBridge internal delay, or for our dMAT fast-track guarantee, a 100% full refund is honored immediately.</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div className="space-y-3">
              <h2 className="lp-serif text-2xl font-bold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-2">
                6. Intellectual Property
              </h2>
              <p>
                Upon full payment, the client receives exclusive, worldwide usage rights to their customized application documents. The algorithms, calculator logic, Bavarian formula implementations, layout styling, and proprietary knowledge base content of EuropeBridge remain the intellectual property of EuropeBridge GmbH.
              </p>
            </div>

            {/* Jurisdiction */}
            <div className="space-y-3">
              <h2 className="lp-serif text-2xl font-bold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-2">
                7. Applicable Law &amp; Place of Jurisdiction
              </h2>
              <p>
                These Terms and all disputes arising from or in connection with them shall be governed exclusively by the laws of the Federal Republic of Germany, excluding the UN Convention on Contracts for the International Sale of Goods (CISG). The place of jurisdiction for commercial entities or persons with no domestic general venue is Berlin, Germany.
              </p>
            </div>

          </div>
        </section>

        {/* Footer */}
        <div className="relative z-[40]">
          <Footer />
        </div>
      </div>
    </main>
  );
}
