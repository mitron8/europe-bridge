"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ClipboardList, ShieldCheck, Calendar, MessageSquare, Headphones, CheckCircle2 } from 'lucide-react';

const FEATURES = [
  {
    icon: FileText,
    title: 'CSP Portal Registration',
    description: 'We register and configure your profile on the official Consular Services Portal (Auswärtiges Amt), setting up your entry form and verified communication credentials with the German authorities.',
    badge: 'Digital Portal'
  },
  {
    icon: ClipboardList,
    title: 'VIDEX Long-Term Form Filing',
    description: 'Accurate VIDEX National Visa form completion, resolution-compliant document uploads, and rapid resolution of CSP correction emails directly handled by our senior visa specialists.',
    badge: 'Accurate VIDEX'
  },
  {
    icon: ShieldCheck,
    title: 'Two-Set Document Dossier Audit',
    description: 'Personalized document checklist ordered to the exact requirements of your regional German Embassy/Consulate (Delhi, Mumbai, Chennai, Kolkata, or BLR), ensuring zero missing sheets.',
    badge: 'Consulate Order'
  },
  {
    icon: Calendar,
    title: 'VFS Appointment Booking',
    description: 'We monitor and secure your physical VFS biometrics appointment slot so you avoid the peak seasonal waiting list rush and file your application on schedule.',
    badge: 'Biometrics Slot'
  },
  {
    icon: MessageSquare,
    title: '1:1 Visa Mock Interview Prep',
    description: 'Personalized 1:1 interview session simulating actual consular questions: study motivations, German university modules, financial sustainability, and post-study career trajectories.',
    badge: '1:1 Coaching'
  },
  {
    icon: Headphones,
    title: 'On-Call Expert Visa Guidance',
    description: 'Priority direct phone and WhatsApp guidance until your passport is stamped. Includes complimentary advisory on Blocked Account, Education Loan, and Forex Travel Card.',
    badge: 'End-to-End Support'
  }
];

export const VisaFeatures = () => {
  return (
    <section id="features" className="py-20 px-6 lg:px-12 bg-amber-50/20 relative">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Complete Visa Security</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-germany-black font-display tracking-tight">
            What You Get With Our <span className="text-germany-red">Visa Support</span>
          </h2>
          <p className="text-base text-gray-600 font-medium leading-relaxed">
            Applying for a German National Visa involves strict legal standards. We eliminate the stress, document rejection risks, and appointment booking delays.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                className="neu-card p-8 bg-white border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-germany-red flex items-center justify-center group-hover:bg-germany-red group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-extrabold px-3 py-1 bg-gray-100 text-gray-600 rounded-full uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-germany-black pt-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>99.4% Student Visa Approval Rate</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
