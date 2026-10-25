import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import { Building2, Mail, Phone, MapPin, ChevronRight, Scale, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Impressum (Legal Notice / Imprint) | EuropeBridge",
  description: "Official legal disclosure and statutory company information according to § 5 TMG and § 18 MStV.",
};

export default function ImprintPage() {
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
              <span className="font-bold text-[var(--lp-text)]">Imprint / Impressum</span>
            </nav>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--lp-rule-strong)] bg-white/70 backdrop-blur-sm px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lp-red)]" />
              Information Pursuant to § 5 TMG
            </div>

            <h1 className="lp-h2 text-center text-[clamp(2.2rem,4.5vw,3.75rem)] leading-[1.12] tracking-[-0.02em]">
              Legal <em className="lp-script text-[var(--lp-red)]">Notice (Impressum)</em>
            </h1>

            <p className="mt-4 text-xs sm:text-sm text-[var(--lp-muted)] font-medium">
              Statutory company disclosure under German Telecommunications and Media Law
            </p>
          </div>
        </section>

        {/* Content Body */}
        <section className="lp-container pb-24 max-w-4xl mx-auto">
          <div className="bg-[var(--lp-card)] border border-[var(--lp-rule)] rounded-3xl p-6 sm:p-12 shadow-[0_8px_30px_rgba(22,22,26,0.03)] space-y-10 leading-relaxed text-[14.5px] sm:text-[15.5px] text-[var(--lp-muted)]">

            {/* Company Info */}
            <div className="space-y-4">
              <h2 className="lp-serif text-2xl font-bold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-2 flex items-center gap-2.5">
                <Building2 className="w-6 h-6 text-[var(--lp-red)]" />
                Service Provider Information
              </h2>
              <div className="p-5 rounded-2xl bg-[#faf8f3] border border-[#e5e0d3] text-xs sm:text-sm space-y-2 text-[var(--lp-text)]">
                <p className="text-base font-bold">EuropeBridge GmbH</p>
                <p className="flex items-start gap-2 text-[var(--lp-muted)]">
                  <MapPin className="w-4 h-4 text-[var(--lp-red)] shrink-0 mt-0.5" />
                  <span>Friedrichstraße 123, 10117 Berlin, Federal Republic of Germany</span>
                </p>
                <p className="flex items-center gap-2 text-[var(--lp-muted)]">
                  <Mail className="w-4 h-4 text-[var(--lp-red)] shrink-0" />
                  <span>Email: <a href="mailto:hello@europebridge.com" className="text-[var(--lp-red)] hover:underline font-semibold">hello@europebridge.com</a></span>
                </p>
                <p className="flex items-center gap-2 text-[var(--lp-muted)]">
                  <Phone className="w-4 h-4 text-[var(--lp-red)] shrink-0" />
                  <span>Phone: +49 (0) 30 1234 5678</span>
                </p>
              </div>
            </div>

            {/* Commercial Register & Representatives */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#e5e0d3] space-y-2 text-xs sm:text-sm">
                <h3 className="font-bold text-[var(--lp-text)] text-sm uppercase tracking-wider">Commercial Register</h3>
                <p className="text-[var(--lp-muted)]">
                  Registered at: <strong>Amtsgericht Charlottenburg (Berlin)</strong>
                </p>
                <p className="text-[var(--lp-muted)]">
                  Registration Number: <strong>HRB 248901 B</strong>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#e5e0d3] space-y-2 text-xs sm:text-sm">
                <h3 className="font-bold text-[var(--lp-text)] text-sm uppercase tracking-wider">Authorized Representatives</h3>
                <p className="text-[var(--lp-muted)]">
                  Managing Directors (Geschäftsführer):
                </p>
                <p className="font-semibold text-[var(--lp-text)]">
                  Dr. Christian Becker, M.Sc.
                </p>
              </div>
            </div>

            {/* Tax ID & Supervisory Authority */}
            <div className="space-y-3">
              <h2 className="lp-serif text-2xl font-bold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-2">
                VAT &amp; Tax Identification
              </h2>
              <p>
                Value Added Tax Identification Number pursuant to § 27a of the German Value Added Tax Act (Umsatzsteuergesetz - UStG):
              </p>
              <div className="p-4 rounded-xl bg-white border border-[#e5e0d3] text-xs sm:text-sm font-mono font-bold text-[var(--lp-text)]">
                DE 361 892 410
              </div>
            </div>

            {/* Responsible for Content */}
            <div className="space-y-3">
              <h2 className="lp-serif text-2xl font-bold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-2">
                Responsible for Editorial Content (§ 18 Abs. 2 MStV)
              </h2>
              <p className="text-xs sm:text-sm text-[var(--lp-muted)]">
                Responsible for journalistic and editorial content in accordance with § 18 paragraph 2 of the German State Media Treaty (Medienstaatsvertrag - MStV):
              </p>
              <div className="p-4 rounded-xl bg-white border border-[#e5e0d3] text-xs sm:text-sm text-[var(--lp-text)]">
                <p className="font-bold">Editorial Director: Admissions Knowledge Hub</p>
                <p>EuropeBridge GmbH, Friedrichstraße 123, 10117 Berlin, Germany</p>
              </div>
            </div>

            {/* Dispute Resolution */}
            <div className="space-y-3">
              <h2 className="lp-serif text-2xl font-bold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-2">
                Online Dispute Resolution &amp; Consumer Arbitration
              </h2>
              <p className="text-xs sm:text-sm text-[var(--lp-muted)]">
                The European Commission provides a platform for online dispute resolution (ODR):{' '}
                <a 
                  href="https://ec.europa.eu/consumers/odr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[var(--lp-red)] font-semibold hover:underline"
                >
                  https://ec.europa.eu/consumers/odr
                </a>.
              </p>
              <p className="text-xs sm:text-sm text-[var(--lp-muted)]">
                We are neither obligated nor willing to participate in dispute resolution proceedings before a consumer arbitration board (Verbraucherschlichtungsstelle).
              </p>
            </div>

            {/* Liability for Content & Links */}
            <div className="space-y-3">
              <h2 className="lp-serif text-2xl font-bold text-[var(--lp-text)] border-b border-[var(--lp-rule)] pb-2">
                Liability for Content &amp; External Links
              </h2>
              <p className="text-xs sm:text-sm text-[var(--lp-muted)]">
                As a service provider, we are responsible for our own content on these pages under general German law in accordance with § 7 Abs. 1 TMG. However, under §§ 8 to 10 TMG, we are not obligated to monitor transmitted or stored external information or to investigate circumstances indicating illegal activity.
              </p>
              <p className="text-xs sm:text-sm text-[var(--lp-muted)]">
                Our site contains links to external third-party websites (e.g. DAAD, Uni-Assist, official university exam portals) over whose contents we have no control. Therefore, we cannot accept any liability for such third-party content.
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
