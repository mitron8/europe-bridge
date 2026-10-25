import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import { ShieldCheck, ChevronRight, Lock, Eye, Server, RefreshCw, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy (Datenschutzerklärung) | EuropeBridge",
  description: "Privacy policy and data protection guidelines compliant with EU General Data Protection Regulation (GDPR / DSGVO).",
};

export default function PrivacyPage() {
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
              <span className="font-bold text-[var(--lp-text)]">Privacy Policy</span>
            </nav>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--lp-rule-strong)] bg-white/70 backdrop-blur-sm px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)]" />
              GDPR / DSGVO Compliant
            </div>

            <h1 className="lp-h2 text-center text-[clamp(2.2rem,4.5vw,3.75rem)] leading-[1.12] tracking-[-0.02em]">
              Privacy <em className="lp-script text-[var(--lp-red)]">Policy</em>
            </h1>

            <p className="mt-4 text-xs sm:text-sm text-[var(--lp-muted)] font-medium">
              Effective Date: January 1, 2026 · Last Updated: October 2026
            </p>
          </div>
        </section>

        {/* Main Content Article */}
        <section className="lp-container pb-24 max-w-4xl mx-auto">
          <div className="bg-[var(--lp-card)] border border-[var(--lp-rule)] rounded-3xl p-6 sm:p-12 shadow-[0_8px_30px_rgba(22,22,26,0.03)] space-y-10 leading-relaxed text-[14.5px] sm:text-[15.5px] text-[var(--lp-muted)]">

            {/* Intro Notice */}
            <div className="p-5 rounded-2xl bg-[#faf8f3] border border-[#e5e0d3] flex items-start gap-4 text-xs sm:text-sm text-[var(--lp-text)]">
              <ShieldCheck className="w-5 h-5 text-[var(--lp-red)] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold mb-1">General Data Protection Regulation (GDPR) Notice</strong>
                EuropeBridge GmbH is committed to protecting your personal data in full compliance with Regulation (EU) 2016/679 (GDPR) and the German Federal Data Protection Act (BDSG).
              </div>
            </div>

            {/* 1. Controller */}
            <div className="space-y-3">
              <h2 className="lp-serif text-2xl font-bold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-2">
                1. Data Controller
              </h2>
              <p>
                The responsible party for data processing on this platform according to Art. 4 No. 7 GDPR is:
              </p>
              <div className="p-4 rounded-xl bg-white border border-[#e5e0d3] text-xs sm:text-sm space-y-1 text-[var(--lp-text)]">
                <p><strong>EuropeBridge GmbH</strong></p>
                <p>Friedrichstraße 123, 10117 Berlin, Germany</p>
                <p>Commercial Register: Amtsgericht Charlottenburg (Berlin), HRB 248901 B</p>
                <p>Email: <a href="mailto:privacy@europebridge.com" className="text-[var(--lp-red)] hover:underline font-semibold">privacy@europebridge.com</a></p>
              </div>
            </div>

            {/* 2. Collection and Processing */}
            <div className="space-y-3">
              <h2 className="lp-serif text-2xl font-bold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-2">
                2. What Data We Collect &amp; Why
              </h2>
              <p>
                Depending on how you interact with our platform, we collect and process the following categories of personal data:
              </p>
              <ul className="space-y-2.5 pl-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-1" />
                  <span><strong>Account &amp; Identity Data:</strong> Name, email address, password hash, contact phone number when you register or request consultations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-1" />
                  <span><strong>Academic &amp; Admission Dossier:</strong> Transcripts, CGPA/percentage, graduation university, semester marksheets, test scores (IELTS/TOEFL/GRE), and statement of purpose drafts for evaluation.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-1" />
                  <span><strong>Calculator Inputs:</strong> CGPA inputs on the Bavarian formula tool and blocked account inputs are processed client-side or ephemerally and not sold to third parties.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-1" />
                  <span><strong>Technical &amp; Log Data:</strong> Anonymized IP addresses, browser user-agent, operating system, and referral headers required for server security and denial-of-service mitigation.</span>
                </li>
              </ul>
            </div>

            {/* 3. Legal Basis */}
            <div className="space-y-3">
              <h2 className="lp-serif text-2xl font-bold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-2">
                3. Legal Bases for Processing (Art. 6 GDPR)
              </h2>
              <p>We process personal data only when lawful under the provisions of the GDPR:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#e5e0d3]">
                  <strong className="block text-xs font-bold uppercase tracking-wider text-[var(--lp-text)] mb-1">Contract Performance (Art. 6(1)(b))</strong>
                  <p className="text-xs">Processing required to perform our admissions counseling, document drafting, shortlisting, and visa support agreements.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#e5e0d3]">
                  <strong className="block text-xs font-bold uppercase tracking-wider text-[var(--lp-text)] mb-1">Explicit Consent (Art. 6(1)(a))</strong>
                  <p className="text-xs">Processing based on your voluntary consent when signing up for newsletters, marketing updates, or partner introductions.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#e5e0d3]">
                  <strong className="block text-xs font-bold uppercase tracking-wider text-[var(--lp-text)] mb-1">Legitimate Interests (Art. 6(1)(f))</strong>
                  <p className="text-xs">Protection of IT infrastructure, platform fraud prevention, and performance optimizations of our calculators.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#e5e0d3]">
                  <strong className="block text-xs font-bold uppercase tracking-wider text-[var(--lp-text)] mb-1">Legal Obligation (Art. 6(1)(c))</strong>
                  <p className="text-xs">Retention of fiscal transaction records and invoices as required by German commercial and tax code (HGB/AO).</p>
                </div>
              </div>
            </div>

            {/* 4. Security */}
            <div className="space-y-3">
              <h2 className="lp-serif text-2xl font-bold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-2">
                4. Data Storage &amp; Encryption
              </h2>
              <p>
                All data in transit is encrypted using 256-bit TLS/SSL protocols. Data at rest is hosted on enterprise-grade ISO 27001 certified server infrastructure within Frankfurt am Main, Germany (EU). We implement strict role-based access control (RBAC) ensuring only your assigned counselor can access submitted academic marksheets.
              </p>
            </div>

            {/* 5. Your Rights */}
            <div className="space-y-3">
              <h2 className="lp-serif text-2xl font-bold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-2">
                5. Your Rights Under GDPR
              </h2>
              <p>Under European data protection law, you possess the following enforceable rights:</p>
              <ul className="space-y-1.5 list-disc pl-5 text-xs sm:text-sm">
                <li><strong>Right of Access (Art. 15 GDPR):</strong> You may request a complete copy of all personal data held about you.</li>
                <li><strong>Right to Rectification (Art. 16 GDPR):</strong> You may correct inaccurate or incomplete data at any time.</li>
                <li><strong>Right to Erasure / &quot;Right to be Forgotten&quot; (Art. 17 GDPR):</strong> You may request the immediate deletion of your profile and uploaded files.</li>
                <li><strong>Right to Restriction of Processing (Art. 18 GDPR):</strong> You can limit how we handle your dossier during active dispute audits.</li>
                <li><strong>Right to Data Portability (Art. 20 GDPR):</strong> You can receive your data in a machine-readable JSON or PDF format.</li>
                <li><strong>Right to Object (Art. 21 GDPR):</strong> You may revoke consent for communications or profile analysis at any time.</li>
              </ul>
              <p className="pt-2 text-xs">
                To exercise any of these rights, contact our Data Protection Officer at <a href="mailto:dpo@europebridge.com" className="text-[var(--lp-red)] font-semibold hover:underline">dpo@europebridge.com</a>.
              </p>
            </div>

            {/* 6. Supervisory Authority */}
            <div className="space-y-3">
              <h2 className="lp-serif text-2xl font-bold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-2">
                6. Right to Lodge a Complaint
              </h2>
              <p>
                You also hold the legal right to lodge a formal complaint with the competent supervisory authority:
              </p>
              <div className="p-4 rounded-xl bg-white border border-[#e5e0d3] text-xs">
                <p><strong>Berliner Beauftragte für Datenschutz und Informationsfreiheit</strong></p>
                <p>Alt-Moabit 59-61, 10555 Berlin, Germany</p>
                <p>Website: <a href="https://www.datenschutz-berlin.de" target="_blank" rel="noreferrer" className="text-[var(--lp-red)] hover:underline">www.datenschutz-berlin.de</a></p>
              </div>
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
