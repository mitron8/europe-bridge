"use client";
import React from 'react';
import { Home, Key, ShieldAlert, CheckCircle2, Search, Building } from 'lucide-react';

export const HousingAndRentSection = () => {
  return (
    <section id="section-housing" className="py-10 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-10 space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-germany-red flex items-center justify-center font-black text-xl shrink-0">
            02
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-germany-red">Major Monthly Expense</div>
            <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">
              Housing &amp; Rental Options in Germany
            </h2>
          </div>
        </div>

        <p className="text-base text-gray-700 font-medium leading-relaxed">
          Rent is universally your single largest monthly expenditure in Germany. Securing affordable housing early is critical for a smooth start to your studies.
        </p>

        {/* Accommodations Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full text-left text-sm font-medium">
            <thead className="bg-gray-100 text-germany-black text-xs uppercase tracking-wider font-extrabold border-b border-gray-200">
              <tr>
                <th className="py-4 px-5">Accommodation Type</th>
                <th className="py-4 px-5">Monthly Cost Range</th>
                <th className="py-4 px-5 text-green-700">Pros</th>
                <th className="py-4 px-5 text-red-700">Cons</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-5 font-extrabold text-germany-black">
                  Student Dormitory<br/>
                  <span className="text-xs font-normal text-gray-500 italic">(Student Residence)</span>
                </td>
                <td className="py-4 px-5 font-bold text-green-700">€200 – €350</td>
                <td className="py-4 px-5 text-gray-700 text-xs font-medium">
                  Cheapest rates, fully furnished, utilities included, on-campus community.
                </td>
                <td className="py-4 px-5 text-gray-700 text-xs font-medium">
                  Long waiting lists (6 to 12 months), high demand, small room sizes.
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-5 font-extrabold text-germany-black">
                  Shared Flat<br/>
                  <span className="text-xs font-normal text-gray-500 italic">(Shared Apartment)</span>
                </td>
                <td className="py-4 px-5 font-bold text-amber-700">€350 – €600</td>
                <td className="py-4 px-5 text-gray-700 text-xs font-medium">
                  Social, great way to practice language, flexible lease terms, widespread.
                </td>
                <td className="py-4 px-5 text-gray-700 text-xs font-medium">
                  Competitive flatmate interview process, higher in Munich.
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-5 font-extrabold text-germany-black">
                  Private Studio Apartment<br/>
                  <span className="text-xs font-normal text-gray-500 italic">(Einzelappartement)</span>
                </td>
                <td className="py-4 px-5 font-bold text-red-700">€500 – €900+</td>
                <td className="py-4 px-5 text-gray-700 text-xs font-medium">
                  100% private kitchen and bathroom, total quiet and personal independence.
                </td>
                <td className="py-4 px-5 text-gray-700 text-xs font-medium">
                  Expensive, requires proof of income or guarantor, upfront deposit required.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Kaltmiete vs Warmmiete Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
            <h3 className="font-extrabold text-germany-black text-lg flex items-center gap-2">
              <Building className="w-5 h-5 text-amber-700" />
              Understanding "Kaltmiete" vs "Warmmiete"
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 font-medium">
              <li className="flex items-start gap-2">
                <span className="font-extrabold text-germany-black text-xs uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-900 shrink-0 mt-0.5">Kaltmiete</span>
                <span><strong>Cold Rent:</strong> Base rent for the room/flat excluding heating, water, or building maintenance.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-extrabold text-white text-xs uppercase px-2 py-0.5 rounded bg-germany-black shrink-0 mt-0.5">Warmmiete</span>
                <span><strong>Warm Rent:</strong> Total rent INCLUDING heating, water, and building maintenance (<em>Nebenkosten</em>). <strong>This is your actual baseline monthly cost.</strong></span>
              </li>
              <li className="text-xs text-gray-500 pt-1">
                * Note: Electricity (<em>Strom</em>) and Internet are usually paid separately (€40–€70/month extra).
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-red-50/70 border border-red-200 space-y-3">
            <h3 className="font-extrabold text-germany-black text-lg flex items-center gap-2">
              <Search className="w-5 h-5 text-germany-red" />
              Top Housing Platforms in Germany
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 font-medium">
              <li className="flex items-start gap-2">
                <strong className="text-germany-black shrink-0 font-bold">1. Student Services Dorms:</strong> Official public university dorms. Apply immediately upon receiving your admission letter!
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-germany-black shrink-0 font-bold">2. WG-Gesucht.de:</strong> Germany's largest portal for shared flat rooms.
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-germany-black shrink-0 font-bold">3. Immobilienscout24:</strong> Standard portal for private apartments and studios.
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-germany-black shrink-0 font-bold">4. Kleinanzeigen:</strong> Second-hand listings &amp; direct landlord sublets.
              </li>
            </ul>
          </div>
        </div>

        {/* Scam Warning Box */}
        <div className="p-5 rounded-2xl bg-red-100/80 border border-red-300 flex items-start gap-4">
          <ShieldAlert className="w-8 h-8 text-germany-red shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-extrabold text-germany-black text-sm uppercase tracking-wider">
              Critical Warning: Avoid Rental Scams
            </h4>
            <p className="text-xs text-gray-800 font-medium leading-relaxed">
              NEVER transfer a security deposit (<em>Kaution</em>) or first month's rent via wire transfer before viewing the apartment in person or signing an official rental contract. Scammers frequently target international students with fake keys or phantom Airbnb listings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
