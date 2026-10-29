"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Clock, Zap, ArrowRight, FileText, Landmark, User, Mail, Phone, Calendar, AlertCircle, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { startServiceCheckout } from '@/lib/servicesPayment';
import { useAppStore } from '@/store/useAppStore';

export const LomBooking = () => {
  const [plan, setPlan] = useState<'standard' | 'express'>('standard');
  const [jurisdiction, setJurisdiction] = useState('New Delhi');
  const [targetUni, setTargetUni] = useState('');
  const [targetProgram, setTargetProgram] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [intakeSession, setIntakeSession] = useState('Winter Semester 2025');
  const [appointmentDate, setAppointmentDate] = useState('');
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
    const planKey = plan === 'express' ? 'LOM_EXPRESS' : 'LOM_STANDARD';

    await startServiceCheckout({
      planKey,
      studentInputs: {
        firstName,
        lastName,
        email,
        phone: `${countryCode} ${phone}`,
        jurisdiction,
        targetUni,
        targetProgram,
        intakeSession,
        appointmentDate,
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
            <FileText className="w-3.5 h-3.5" />
            <span>Order Visa Motivation Letter</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Start Your German Visa LOM
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            Fill in your program and consular details below to get a legally structured, § 16b AufenthG compliant Letter of Motivation.
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
            <h3 className="text-2xl font-black text-[#16161a] font-serif tracking-tight">Visa LOM Order Received!</h3>
            <p className="text-sm text-[#5e5b54] font-medium max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{firstName}</strong>. Your order for the <strong>{plan === 'express' ? 'Express LOM Plan (24h - ₹4,999)' : 'Standard LOM Plan (3 Days - ₹3,999)'}</strong> has been logged.
            </p>
            
            <div className="p-5 bg-white rounded-2xl border border-[#e5e0d3] text-xs text-[#16161a] max-w-md mx-auto space-y-2.5 text-left shadow-[0_2px_8px_rgba(22,22,26,0.02)]">
              <div className="flex justify-between">
                <span className="font-medium text-[#6b6760]">Registered Email:</span>
                <span className="font-bold text-[#16161a]">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-[#6b6760]">German Consulate / VFS:</span>
                <span className="font-bold text-[#16161a]">{jurisdiction} Jurisdiction</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-[#6b6760]">Admitted Institution:</span>
                <span className="font-bold text-[#16161a]">{targetUni}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-[#6b6760]">Target Delivery:</span>
                <span className="font-bold text-[#b4232f]">{plan === 'express' ? 'Within 24 Hours (Guaranteed)' : 'Within 3 Working Days'}</span>
              </div>
            </div>

            <p className="text-xs text-[#787369] font-medium pt-2">
              Our lead visa documentation editor has been assigned. Please check your inbox for the Google Doc intake questionnaire to provide your specific module list and financial breakdown.
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link 
                href="/dashboard/student/services"
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#16161a] hover:bg-black rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Track in Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 text-xs font-bold text-[#16161a] bg-white border border-[#dcd7cb] hover:bg-[#f4f1ea] rounded-xl transition-colors cursor-pointer"
              >
                Order Another LOM
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
                    <span className="text-sm font-black text-germany-black block">Standard LOM Plan</span>
                    <span className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      Delivered in 3 working days
                    </span>
                  </div>
                  <span className="text-base font-black text-germany-black">₹3,999</span>
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
                      <span className="text-sm font-black text-germany-black block">Express LOM Plan</span>
                      <span className="px-1.5 py-0.5 bg-germany-red text-white text-[9px] font-black rounded uppercase">24h</span>
                    </div>
                    <span className="text-xs text-germany-red font-bold flex items-center gap-1 mt-0.5">
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      Guaranteed within 24 hours
                    </span>
                  </div>
                  <span className="text-base font-black text-germany-red">₹4,999</span>
                </button>
              </div>
            </div>

            {/* German Consulate Jurisdiction */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase text-gray-700 tracking-wider block">
                2. German Embassy / Consulate Jurisdiction *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'New Delhi',
                  'Mumbai',
                  'Bengaluru',
                  'Chennai',
                  'Kolkata',
                  'Hyderabad'
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setJurisdiction(item)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                      jurisdiction === item
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
                3. Admitted Program Details *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Admitted German University *</label>
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
                  <label className="text-xs font-bold text-gray-600">Target Degree / Program *</label>
                  <input
                    type="text"
                    required
                    value={targetProgram}
                    onChange={(e) => setTargetProgram(e.target.value)}
                    placeholder="e.g. MSc Robotics & AI"
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
                    <option value="Winter Semester 2025">Winter Semester 2025</option>
                    <option value="Summer Semester 2025">Summer Semester 2025</option>
                    <option value="Winter Semester 2026">Winter Semester 2026</option>
                    <option value="Summer Semester 2026">Summer Semester 2026</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Target VFS / Visa Appointment Date</label>
                  <input
                    type="text"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    placeholder="e.g. 15th October 2025 (or Waitlist)"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-germany-black focus:outline-none focus:border-germany-red transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Student Personal Details */}
            <div className="space-y-4">
              <label className="text-xs font-extrabold uppercase text-gray-700 tracking-wider block">
                4. Applicant Contact Information *
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
                  <label className="text-xs font-bold text-gray-600">Email Address (for Google Doc Draft) *</label>
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
                  Profile Nuances / Special Circumstances (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. 2-year work gap, switching from Mechanical to Data Science, blocked account funded via education loan..."
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
                  I understand that EuropeBridge provides tailored drafting with two review cycles based on my intake questionnaire, strictly adhering to German consular norms (§ 16b AufenthG).
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
                  <span>Processing Your LOM Request...</span>
                ) : (
                  <>
                    <span>Confirm Order &amp; Proceed to Intake — {plan === 'express' ? '₹4,999' : '₹3,999'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="text-center">
              <span className="text-[11px] text-[#787369] font-medium flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#787369]" />
                <span>256-bit encrypted • 2 revision rounds included • No AI Hallucinations</span>
              </span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
