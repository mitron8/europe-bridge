"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Clock, Zap, ArrowRight, FileText, User, Mail, Phone, Calendar, Layers, GraduationCap, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { startServiceCheckout } from '@/lib/servicesPayment';
import { useAppStore } from '@/store/useAppStore';

export const BundleBooking = () => {
  const [plan, setPlan] = useState<'standard' | 'express'>('standard');
  const [programType, setProgramType] = useState("Master's Degree (MSc / MEng)");
  const [lorMix, setLorMix] = useState('1 Academic + 1 Professional');
  const [targetUni, setTargetUni] = useState('');
  const [targetProgram, setTargetProgram] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [intakeSession, setIntakeSession] = useState('Winter Semester 2025/26');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-fill student data if logged in
  const user = useAppStore((state) => state.user);
  useEffect(() => {
    if (user) {
      if (user.firstName && !firstName) setFirstName(user.firstName);
      if (user.lastName && !lastName) setLastName(user.lastName);
      if (user.email && !email) setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !phone || !targetUni || !consent) return;

    setIsSubmitting(true);
    const planKey = plan === 'express' ? 'BUNDLE_EXPRESS' : 'BUNDLE_STANDARD';

    await startServiceCheckout({
      planKey,
      studentInputs: {
        firstName,
        lastName,
        email,
        phone: `${countryCode} ${phone}`,
        programType,
        lorMix,
        targetUni,
        targetProgram,
        intakeSession,
        deadlineDate,
        notes,
      },
      onSuccess: () => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      },
      onError: (err) => {
        setIsSubmitting(false);
        alert(err.message || 'Payment could not be completed');
      },
      onAuthRequired: (redirectUrl) => {
        setIsSubmitting(false);
        window.location.href = redirectUrl;
      },
    });
  };

  return (
    <section id="booking" className="py-14 px-6 lg:px-12 max-w-4xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-12 border-2 border-germany-red/30 relative overflow-hidden space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Order Document Bundle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Start Your Document Preparation Bundle
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            Order your standard 2-page SOP, two LORs, and Europass CV in one unified workflow.
          </p>
        </div>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 bg-[#faf8f3] border border-[#e5e0d3] rounded-3xl text-center space-y-4 shadow-[0_4px_20px_rgba(22,22,26,0.04)]"
          >
            <div className="w-14 h-14 rounded-full bg-[#16161a] text-[#c9a35b] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-[#16161a] font-serif tracking-tight">Bundle Order Received!</h3>
            <p className="text-sm text-[#5e5b54] font-medium max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{firstName}</strong>. Your order for the <strong>{plan === 'express' ? 'Express Bundle Plan (48h - ₹18,999)' : 'Standard Bundle Plan (3-5 Days - ₹13,999)'}</strong> has been logged.
            </p>
            
            <div className="p-5 bg-white rounded-2xl border border-[#e5e0d3] text-xs text-[#16161a] max-w-md mx-auto space-y-2.5 text-left shadow-[0_2px_8px_rgba(22,22,26,0.02)]">
              <div className="flex justify-between">
                <span className="font-medium text-[#6b6760]">Registered Email:</span>
                <span className="font-bold text-[#16161a]">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-[#6b6760]">Target University:</span>
                <span className="font-bold text-[#16161a]">{targetUni}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-[#6b6760]">LOR Configuration:</span>
                <span className="font-bold text-[#16161a]">{lorMix}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-[#6b6760]">Target Delivery:</span>
                <span className="font-bold text-[#b4232f]">{plan === 'express' ? 'Within 48 Hours (Guaranteed)' : 'Within 3 to 5 Working Days'}</span>
              </div>
            </div>

            <p className="text-xs text-[#787369] font-medium pt-2">
              Our Senior Admissions Editor has been assigned. Please check your inbox for three separate emails containing the dedicated intake forms (SOP, LORs, and CV).
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
              <Link
                href="/dashboard/student/services"
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-[#b4232f] hover:bg-[#901c26] rounded-xl transition-colors shadow-sm"
              >
                Track in Dashboard & Upload Documents →
              </Link>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-[#16161a] bg-white border border-[#dcd7cb] hover:bg-[#f4f1ea] rounded-xl transition-colors cursor-pointer"
              >
                Order Another Bundle
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            {/* Plan Selector */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase text-gray-700 tracking-wider block">
                1. Select Turnaround Speed *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPlan('standard')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex justify-between items-center cursor-pointer ${
                    plan === 'standard'
                      ? 'border-germany-black bg-gray-50 shadow-inner'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div>
                    <span className="text-sm font-black text-germany-black block">Standard Bundle</span>
                    <span className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      Delivered in 3 to 5 working days
                    </span>
                  </div>
                  <span className="text-base font-black text-germany-black">₹13,999</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlan('express')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex justify-between items-center cursor-pointer ${
                    plan === 'express'
                      ? 'border-germany-red bg-red-50/50 shadow-inner'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-black text-germany-black block">Express Bundle</span>
                      <span className="px-1.5 py-0.5 bg-germany-red text-white text-[9px] font-black rounded uppercase">48h</span>
                    </div>
                    <span className="text-xs text-germany-red font-bold flex items-center gap-1 mt-0.5">
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      Guaranteed within 48 hours
                    </span>
                  </div>
                  <span className="text-base font-black text-germany-red">₹18,999</span>
                </button>
              </div>
            </div>

            {/* Target Program Level */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase text-gray-700 tracking-wider block">
                2. Target Program Level *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  "Master's Degree (MSc / MEng)",
                  "Bachelor's Degree",
                  "MBA / Management"
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setProgramType(item)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                      programType === item
                        ? 'border-germany-red bg-red-50 text-germany-red shadow-sm'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* LOR Mix Selection */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase text-gray-700 tracking-wider block">
                3. Choose Your 2 LORs Preference *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  '2 Academic LORs',
                  '1 Academic + 1 Professional',
                  '2 Professional LORs'
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setLorMix(item)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                      lorMix === item
                        ? 'border-germany-red bg-red-50 text-germany-red shadow-sm'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* University & Degree */}
            <div className="space-y-4">
              <label className="text-xs font-extrabold uppercase text-gray-700 tracking-wider block">
                4. Primary Target Institution *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Target German University *</label>
                  <input
                    type="text"
                    required
                    value={targetUni}
                    onChange={(e) => setTargetUni(e.target.value)}
                    placeholder="e.g. TU Munich / RWTH Aachen"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-germany-black focus:outline-none focus:border-germany-red transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Target Degree Program *</label>
                  <input
                    type="text"
                    required
                    value={targetProgram}
                    onChange={(e) => setTargetProgram(e.target.value)}
                    placeholder="e.g. MSc Data Engineering"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-germany-black focus:outline-none focus:border-germany-red transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Intake / Semester</label>
                  <select
                    value={intakeSession}
                    onChange={(e) => setIntakeSession(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-germany-black focus:outline-none focus:border-germany-red transition-all"
                  >
                    <option value="Winter Semester 2025/26">Winter Semester 2025/26</option>
                    <option value="Summer Semester 2026">Summer Semester 2026</option>
                    <option value="Winter Semester 2026/27">Winter Semester 2026/27</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Application Deadline (Uni-Assist / Direct)</label>
                  <input
                    type="text"
                    value={deadlineDate}
                    onChange={(e) => setDeadlineDate(e.target.value)}
                    placeholder="e.g. 15th July 2025"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-germany-black focus:outline-none focus:border-germany-red transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Applicant Details */}
            <div className="space-y-4">
              <label className="text-xs font-extrabold uppercase text-gray-700 tracking-wider block">
                5. Applicant Contact Details *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">First Name *</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-germany-black focus:outline-none focus:border-germany-red transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-germany-black focus:outline-none focus:border-germany-red transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Email Address (for Google Doc Drafts) *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-germany-black focus:outline-none focus:border-germany-red transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">WhatsApp / Mobile Number *</label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="px-2 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-germany-black focus:outline-none focus:border-germany-red"
                    >
                      <option value="+91">+91 (IN)</option>
                      <option value="+49">+49 (DE)</option>
                      <option value="+1">+1 (US)</option>
                      <option value="+971">+971 (AE)</option>
                      <option value="+44">+44 (UK)</option>
                    </select>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="flex-1 px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-germany-black focus:outline-none focus:border-germany-red transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">
                  Special Notes / Key Projects to Connect Across Documents (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Highlight Capstone AI research project in SOP and Professor LOR; highlight Siemens internship in Manager LOR and CV..."
                  className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs font-medium text-germany-black focus:outline-none focus:border-germany-red transition-all"
                />
              </div>
            </div>

            {/* Terms and Consent */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-2.5 text-xs text-gray-600 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-gray-300 text-germany-red focus:ring-germany-red"
                />
                <span>
                  I understand that the Document Preparation Bundle includes one standard 2-page course SOP, two tailored LORs, and one Europass CV with two student review rounds per document.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !consent}
                className="neu-btn-primary w-full py-4 text-sm font-black flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Processing Your Bundle Order...</span>
                ) : (
                  <>
                    <span>Confirm Order &amp; Proceed to Intake — {plan === 'express' ? '₹18,999' : '₹13,999'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="text-center">
              <span className="text-[11px] text-[#787369] font-medium flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#787369]" />
                <span>256-bit encrypted • 2 review rounds included • Delivered as Google Docs + PDF + Word DOCX</span>
              </span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
