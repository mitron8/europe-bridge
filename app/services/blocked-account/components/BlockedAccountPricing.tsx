"use client";
import React from 'react';
import { Tag, ShieldCheck, RefreshCw } from 'lucide-react';

export const BlockedAccountPricing = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-10 shadow-[0_16px_40px_rgba(22,22,26,0.05)] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e5e0d3] pb-5">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--lp-red)] flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> 100% Free EuropeBridge Counseling
            </span>
            <h3 className="lp-serif text-2xl sm:text-3xl font-semibold text-[var(--lp-text)]">
              Zero Hidden Agency Fees. Transparent Banking Costs.
            </h3>
          </div>
          <span className="px-4 py-2 bg-[#16161a] text-white font-bold text-xs rounded-xl w-fit shadow-sm">
            EuropeBridge Guidance: €0 / ₹0
          </span>
        </div>

        <p className="text-[15px] text-[var(--lp-text-muted)] font-medium leading-relaxed max-w-3xl">
          EuropeBridge never charges students any fee for blocked account consultation or onboarding guidance. All official account setup fees and statutory buffer deposits are paid directly to your chosen BaFin-licensed German banking provider.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-5 bg-white/80 rounded-2xl border border-[#e5e0d3] space-y-1.5 shadow-sm">
            <span className="text-[11px] font-bold text-[var(--lp-text-muted)] uppercase">Provider Setup Fee</span>
            <div className="lp-serif text-xl font-bold text-[var(--lp-text)]">€49 – €89 <span className="text-xs font-normal text-[var(--lp-text-muted)]">(One-Time)</span></div>
            <p className="text-xs text-[var(--lp-text-muted)] font-medium leading-relaxed">
              Covers digital KYC verification and issuance of your official 24-hour blocking confirmation document.
            </p>
          </div>

          <div className="p-5 bg-white/80 rounded-2xl border border-[#e5e0d3] space-y-1.5 shadow-sm">
            <span className="text-[11px] font-bold text-[var(--lp-text-muted)] uppercase">Monthly Maintenance</span>
            <div className="lp-serif text-xl font-bold text-[var(--lp-text)]">€0 – €5.00 <span className="text-xs font-normal text-[var(--lp-text-muted)]">/mo</span></div>
            <p className="text-xs text-[var(--lp-text-muted)] font-medium leading-relaxed">
              German banking administration fee for maintaining your fiduciary blocked IBAN throughout your studies.
            </p>
          </div>

          <div className="p-5 bg-white/80 rounded-2xl border border-[#e5e0d3] space-y-1.5 shadow-sm">
            <span className="text-[11px] font-bold text-[var(--lp-red)] uppercase flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--lp-gold)]" /> Visa Decline Guarantee
            </span>
            <div className="lp-serif text-xl font-bold text-[var(--lp-text)]">100% Refundable</div>
            <p className="text-xs text-[var(--lp-muted)] font-medium leading-relaxed">
              Full return of your deposited €11,904 blocked capital if your student visa is declined by the German Embassy.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/70 border border-[#e5e0d3] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--lp-muted)] font-medium">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[var(--lp-red)] shrink-0" />
            <span>
              <strong>Tip:</strong> Pairing your blocked account with a statutory health insurance package (TK or Barmer) typically earns you up to <strong>€247 in welcome cashback</strong>, completely offsetting all account fees!
            </span>
          </div>
          <a href="#booking" className="font-bold text-[var(--lp-red)] hover:underline shrink-0">
            Claim Health Cashback →
          </a>
        </div>
      </div>
    </section>
  );
};

