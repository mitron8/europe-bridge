"use client";
import React from 'react';
import { TramFront, Bike, Bus, Train, Ticket, CheckCircle2 } from 'lucide-react';

export const TransportSection = () => {
  return (
    <section id="section-transport" className="py-10 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-germany-red flex items-center justify-center font-black text-xl shrink-0">
            04
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-germany-red">Public Mobility</div>
            <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">
              Public Transportation &amp; Travel
            </h2>
          </div>
        </div>

        <p className="text-base text-gray-700 font-medium leading-relaxed">
          Germany boasts one of the most comprehensive public transport networks in the world. Getting around as a student is seamless and exceptionally affordable.
        </p>

        {/* Deutschlandticket Highlight Box */}
        <div className="p-6 rounded-2xl bg-red-50 border-2 border-germany-red/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-red-200/60 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-germany-red text-white flex items-center justify-center font-black">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-germany-black text-lg">The Nationwide Deutschlandticket (€63/mo)</h3>
                <span className="text-xs font-bold text-germany-red">All Regional Transport Included</span>
              </div>
            </div>
            <span className="px-3 py-1 bg-germany-red text-white text-xs font-extrabold rounded-full w-fit">
              Essential for Students
            </span>
          </div>

          <p className="text-sm text-gray-700 font-medium leading-relaxed">
            The <strong className="text-germany-black">Deutschlandticket</strong> provides unlimited monthly access to all local buses, trams, U-Bahn (subways), S-Bahn (commuter rail), and regional trains (RE, RB, MEX) across the entire country of Germany.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold text-gray-700">
            <div className="p-3 bg-white rounded-xl border border-red-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>Unlimited city commuting</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-red-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>Weekend regional travel</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-red-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>No separate tickets needed</span>
            </div>
          </div>
        </div>

        {/* Semester Ticket & Cycling & Long Distance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-gray-100 text-germany-black flex items-center justify-center font-bold">
              <Train className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-germany-black text-base">University Semester Ticket</h4>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Most public universities bundle a discounted student Deutschlandticket directly into your mandatory semester contribution (<em>Semesterbeitrag</em>).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-gray-100 text-germany-black flex items-center justify-center font-bold">
              <Bike className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-germany-black text-base">Bicycle Culture</h4>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Cities like Münster, Freiburg, Aachen, and Leipzig are bike paradises. Buy a second-hand bike on <em>Kleinanzeigen</em> for €50–€150 and save transit money entirely.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-gray-100 text-germany-black flex items-center justify-center font-bold">
              <Bus className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-germany-black text-base">Intercity Travel Hacks</h4>
            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              For high-speed ICE trains, get a student <strong>BahnCard 25</strong> (€36.90/yr) for 25% off all Deutsche Bahn tickets. Or use <strong>FlixBus</strong> and <strong>BlaBlaCar</strong> for budget rides.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
