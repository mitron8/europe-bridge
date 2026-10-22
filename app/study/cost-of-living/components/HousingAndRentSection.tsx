"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Home, Key, ShieldAlert, CheckCircle2, Search, Building } from 'lucide-react';

export const HousingAndRentSection = () => {
  return (
    <section id="section-housing" className="py-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-10 space-y-8 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
        {/* Section Header */}
        <div className="flex items-start gap-4 border-b border-[var(--lp-rule)] pb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center font-bold text-lg shrink-0 border border-[#e2ddd3] shadow-xs">
            02
          </div>
          <div>
            <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lp-red)]">
              Major Monthly Expense
            </div>
            <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
              Housing &amp; <em className="lp-script text-[var(--lp-red)]">Rental Options</em>
            </h2>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-[1.7] font-normal">
          Rent is universally your single largest monthly expenditure in Germany. Securing affordable housing early is critical for a smooth start to your studies.
        </p>

        {/* Accommodations Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#e2ddd3] shadow-xs">
          <table className="w-full text-left text-sm font-normal">
            <thead className="bg-[#ece7dd]/80 text-[var(--lp-text)] text-xs uppercase tracking-wider font-semibold border-b border-[#e2ddd3]">
              <tr>
                <th className="py-4 px-5">Accommodation Type</th>
                <th className="py-4 px-5">Monthly Cost Range</th>
                <th className="py-4 px-5 text-[var(--lp-text)]">Pros</th>
                <th className="py-4 px-5 text-[var(--lp-red)]">Cons</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ece7dd] bg-white/70">
              <tr className="hover:bg-[#ece7dd]/40 transition-colors">
                <td className="py-4 px-5 font-semibold text-[var(--lp-text)]">
                  Student Dormitory<br/>
                  <span className="text-xs font-normal text-[var(--lp-muted)] italic">(Student Residence)</span>
                </td>
                <td className="py-4 px-5 font-semibold text-[var(--lp-text)]">€200 – €350</td>
                <td className="py-4 px-5 text-[var(--lp-muted)] text-xs">
                  Cheapest rates, fully furnished, utilities included, on-campus community.
                </td>
                <td className="py-4 px-5 text-[var(--lp-muted)] text-xs">
                  Long waiting lists (6 to 12 months), high demand, small room sizes.
                </td>
              </tr>
              <tr className="hover:bg-[#ece7dd]/40 transition-colors">
                <td className="py-4 px-5 font-semibold text-[var(--lp-text)]">
                  Shared Flat<br/>
                  <span className="text-xs font-normal text-[var(--lp-muted)] italic">(Shared Apartment)</span>
                </td>
                <td className="py-4 px-5 font-semibold text-[var(--lp-gold)]">€350 – €600</td>
                <td className="py-4 px-5 text-[var(--lp-muted)] text-xs">
                  Social, great way to practice language, flexible lease terms, widespread.
                </td>
                <td className="py-4 px-5 text-[var(--lp-muted)] text-xs">
                  Competitive flatmate interview process, higher in Munich.
                </td>
              </tr>
              <tr className="hover:bg-[#ece7dd]/40 transition-colors">
                <td className="py-4 px-5 font-semibold text-[var(--lp-text)]">
                  Private Studio Apartment<br/>
                  <span className="text-xs font-normal text-[var(--lp-muted)] italic">(Einzelappartement)</span>
                </td>
                <td className="py-4 px-5 font-semibold text-[var(--lp-red)]">€500 – €900+</td>
                <td className="py-4 px-5 text-[var(--lp-muted)] text-xs">
                  100% private kitchen and bathroom, total quiet and personal independence.
                </td>
                <td className="py-4 px-5 text-[var(--lp-muted)] text-xs">
                  Expensive, requires proof of income or guarantor, upfront deposit required.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Kaltmiete vs Warmmiete Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-6 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-3">
            <h3 className="lp-serif text-lg font-semibold text-[var(--lp-text)] flex items-center gap-2">
              <Building className="w-5 h-5 text-[var(--lp-gold)]" />
              Understanding "Kaltmiete" vs "Warmmiete"
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-xs uppercase px-2 py-0.5 rounded-full bg-[var(--lp-gold-soft)]/60 text-[var(--lp-text)] shrink-0 mt-0.5">Kaltmiete</span>
                <span><strong className="text-[var(--lp-text)] font-semibold">Cold Rent:</strong> Base rent for the room/flat excluding heating, water, or building maintenance.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-xs uppercase px-2 py-0.5 rounded-full bg-[var(--lp-ink)] text-white shrink-0 mt-0.5">Warmmiete</span>
                <span><strong className="text-[var(--lp-text)] font-semibold">Warm Rent:</strong> Total rent INCLUDING heating, water, and building maintenance (<em>Nebenkosten</em>). <strong>This is your actual baseline monthly cost.</strong></span>
              </li>
              <li className="text-xs text-[var(--lp-faint)] pt-1">
                * Note: Electricity (<em>Strom</em>) and Internet are usually paid separately (€40–€70/month extra).
              </li>
            </ul>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-6 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-3">
            <h3 className="lp-serif text-lg font-semibold text-[var(--lp-text)] flex items-center gap-2">
              <Search className="w-5 h-5 text-[var(--lp-red)]" />
              Top Housing Platforms in Germany
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
              <li className="flex items-start gap-2">
                <strong className="text-[var(--lp-text)] shrink-0 font-semibold">1. Student Services Dorms:</strong> Official public university dorms. Apply immediately upon receiving your admission letter!
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-[var(--lp-text)] shrink-0 font-semibold">2. WG-Gesucht.de:</strong> Germany's largest portal for shared flat rooms.
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-[var(--lp-text)] shrink-0 font-semibold">3. Immobilienscout24:</strong> Standard portal for private apartments and studios.
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-[var(--lp-text)] shrink-0 font-semibold">4. Kleinanzeigen:</strong> Second-hand listings &amp; direct landlord sublets.
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Scam Warning Box */}
        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-6 rounded-2xl bg-[#ece7dd]/60 border border-[#ded8cb] flex items-start gap-4 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[var(--lp-red)]/10 text-[var(--lp-red)] flex items-center justify-center shrink-0 border border-[var(--lp-red)]/20">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-[var(--lp-red)] bg-[var(--lp-red)]/10 border border-[var(--lp-red)]/20">
                Security Advisory
              </span>
              <h4 className="lp-serif text-base font-semibold text-[var(--lp-text)]">
                Avoid Rental Scams in Student Housing
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
              NEVER transfer a security deposit (<em>Kaution</em>) or first month's rent via wire transfer before viewing the apartment in person or signing an official rental contract. Scammers frequently target international students with fake keys or phantom Airbnb listings.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
