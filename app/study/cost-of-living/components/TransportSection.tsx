"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { TramFront, Bike, Bus, Train, Ticket, CheckCircle2 } from 'lucide-react';

export const TransportSection = () => {
  return (
    <section id="section-transport" className="py-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div data-reveal className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-10 space-y-8 shadow-[0_8px_30px_rgba(22,22,26,0.03)] hover:shadow-[0_16px_40px_rgba(22,22,26,0.05)] transition-all duration-300">
        {/* Section Header */}
        <div className="flex items-start gap-4 border-b border-[var(--lp-rule)] pb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#ece7dd] text-[var(--lp-text)] flex items-center justify-center font-bold text-lg shrink-0 border border-[#e2ddd3] shadow-xs">
            04
          </div>
          <div>
            <div className="lp-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lp-red)]">
              Public Mobility
            </div>
            <h2 className="lp-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[var(--lp-text)] tracking-[-0.015em]">
              Public Transportation &amp; <em className="lp-script text-[var(--lp-red)]">Travel</em>
            </h2>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[var(--lp-muted)] leading-[1.7] font-normal">
          Germany boasts one of the most comprehensive public transport networks in the world. Getting around as a student is seamless and exceptionally affordable.
        </p>

        {/* Deutschlandticket Highlight Box */}
        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-6 rounded-2xl bg-[#ece7dd]/50 border border-[#e2ddd3] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e2ddd3] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--lp-ink)] text-white flex items-center justify-center font-bold">
                <Ticket className="w-5 h-5 text-[var(--lp-gold-soft)]" />
              </div>
              <div>
                <h3 className="lp-serif text-lg font-semibold text-[var(--lp-text)]">The Nationwide Deutschlandticket (€63/mo)</h3>
                <span className="text-xs font-semibold text-[var(--lp-red)]">All Regional Transport Included</span>
              </div>
            </div>
            <span className="px-3 py-1 bg-[var(--lp-red)] text-white text-[11px] font-semibold rounded-full w-fit">
              Essential for Students
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[var(--lp-muted)] leading-relaxed">
            The <strong className="text-[var(--lp-text)] font-semibold">Deutschlandticket</strong> provides unlimited monthly access to all local buses, trams, U-Bahn (subways), S-Bahn (commuter rail), and regional trains (RE, RB, MEX) across the entire country of Germany.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[var(--lp-text)] font-medium">
            <motion.div whileHover={{ y: -1 }} className="p-3.5 bg-white/70 rounded-xl border border-[#e2ddd3] flex items-center gap-2 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0" />
              <span>Unlimited city commuting</span>
            </motion.div>
            <motion.div whileHover={{ y: -1 }} className="p-3.5 bg-white/70 rounded-xl border border-[#e2ddd3] flex items-center gap-2 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0" />
              <span>Weekend regional travel</span>
            </motion.div>
            <motion.div whileHover={{ y: -1 }} className="p-3.5 bg-white/70 rounded-xl border border-[#e2ddd3] flex items-center gap-2 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[var(--lp-red)] shrink-0" />
              <span>No separate tickets needed</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Semester Ticket & Cycling & Long Distance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/80 text-[var(--lp-text)] flex items-center justify-center border border-[#e2ddd3] shadow-xs">
              <Train className="w-4 h-4 text-[var(--lp-gold)]" />
            </div>
            <h4 className="lp-serif text-base font-semibold text-[var(--lp-text)]">University Semester Ticket</h4>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Most public universities bundle a discounted student Deutschlandticket directly into your mandatory semester contribution.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/80 text-[var(--lp-text)] flex items-center justify-center border border-[#e2ddd3] shadow-xs">
              <Bike className="w-4 h-4 text-[var(--lp-text)]" />
            </div>
            <h4 className="lp-serif text-base font-semibold text-[var(--lp-text)]">Bicycle Culture</h4>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Cities like Münster, Freiburg, Aachen, and Leipzig are bike paradises. Buy a second-hand bike on <em>Kleinanzeigen</em> for €50–€150 and save transit money entirely.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-5 rounded-2xl bg-[#ece7dd]/40 border border-[#e2ddd3] space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/80 text-[var(--lp-text)] flex items-center justify-center border border-[#e2ddd3] shadow-xs">
              <Bus className="w-4 h-4 text-[var(--lp-red)]" />
            </div>
            <h4 className="lp-serif text-base font-semibold text-[var(--lp-text)]">Intercity Travel Hacks</h4>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              For high-speed ICE trains, get a student <strong>BahnCard 25</strong> (€36.90/yr) for 25% off all Deutsche Bahn tickets. Or use <strong>FlixBus</strong> and <strong>BlaBlaCar</strong> for budget rides.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
