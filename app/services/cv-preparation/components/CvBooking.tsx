"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Clock, Zap, ArrowRight, FileText, GraduationCap, Briefcase, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { startServiceCheckout } from '@/lib/servicesPayment';
import { useAppStore } from '@/store/useAppStore';

export const CvBooking = () => {
  const [plan, setPlan] = useState<'standard' | 'express'>('standard');
  const [purpose, setPurpose] = useState<'masters' | 'bachelors' | 'ausbildung' | 'job'>('masters');
  const [targetProgram, setTargetProgram] = useState('');
  const [targetUni, setTargetUni] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [educationBackground, setEducationBackground] = useState('');
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
    if (!firstName || !email || !phone || !consent) return;

    setIsSubmitting(true);
    const planKey = plan === 'express' ? 'CV_EXPRESS' : 'CV_STANDARD';

    await startServiceCheckout({
      planKey,
      studentInputs: {
        firstName,
        lastName,
        email,
        phone: `${countryCode} ${phone}`,
        purpose,
        targetProgram,
        targetUni,
        educationBackground,
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Order Your German Lebenslauf</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Start Your CV Preparation
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            Fill in your details below to get your German-standard Tabellarischer Lebenslauf tailored for universities or employers.
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
            <h3 className="text-2xl font-black text-[#16161a] font-serif tracking-tight">CV Order Logged!</h3>
            <p className="text-sm text-[#5e5b54] font-medium max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{firstName}</strong>. Your order for the <strong>{plan === 'express' ? 'Express CV Plan (24h - ₹5,999)' : 'Standard CV Plan (2-3 Days - ₹4,999)'}</strong> has been received.
            </p>
            
            <div className="p-5 bg-white rounded-2xl border border-[#e5e0d3] text-xs text-[#16161a] max-w-md mx-auto space-y-2.5 text-left shadow-[0_2px_8px_rgba(22,22,26,0.02)]">
              <div className="flex justify-between">
                <span className="font-medium text-[#6b6760]">Preferences Form Sent To:</span>
                <span className="font-bold text-[#16161a]">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-[#6b6760]">Application Category:</span>
                <span className="font-bold text-[#16161a]">
                  {purpose === 'masters' ? 'German Master’s Program' : purpose === 'bachelors' ? 'Bachelor’s / Studienkolleg' : purpose === 'ausbildung' ? 'Ausbildung (Vocational)' : 'Werkstudent / Job'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-[#6b6760]">Target Delivery:</span>
                <span className="font-bold text-[#b4232f]">{plan === 'express' ? 'Within 24 Hours' : 'Within 2 to 3 Working Days'}</span>
              </div>
            </div>

            <p className="text-xs text-[#787369] font-medium pt-2">
              Please check your inbox for the detailed intake form where you can upload your existing resume, marksheets, and project links.
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
                Order Another CV
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
                    <span className="text-sm font-black text-germany-black block">Standard CV Plan</span>
                    <span className="text-xs text-gray-500 font-medium">Delivered in 2 to 3 working days</span>
                  </div>
                  <span className="text-base font-black text-germany-black">₹4,999</span>
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
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-black text-germany-red">Express CV Plan</span>
                      <Zap className="w-3.5 h-3.5 text-germany-red fill-current" />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">Delivered in 24 hours</span>
                  </div>
                  <span className="text-base font-black text-germany-red">₹5,999</span>
                </button>
              </div>
            </div>

            {/* Purpose Selector */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase text-gray-700 tracking-wider block">
                2. Application Category *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPurpose('masters')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center gap-1.5 cursor-pointer ${
                    purpose === 'masters'
                      ? 'border-germany-red bg-red-50 text-germany-red font-black'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span>Master’s Degree</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPurpose('bachelors')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center gap-1.5 cursor-pointer ${
                    purpose === 'bachelors'
                      ? 'border-germany-red bg-red-50 text-germany-red font-black'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>Bachelor’s / Prep</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPurpose('ausbildung')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center gap-1.5 cursor-pointer ${
                    purpose === 'ausbildung'
                      ? 'border-germany-red bg-red-50 text-germany-red font-black'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Briefcase className="w-4 h-4 shrink-0" />
                  <span>Ausbildung</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPurpose('job')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center gap-1.5 cursor-pointer ${
                    purpose === 'job'
                      ? 'border-germany-red bg-red-50 text-germany-red font-black'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>Werkstudent / Job</span>
                </button>
              </div>
            </div>

            {/* Target University & Degree */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Target German University / Company *</label>
                <input 
                  type="text" 
                  value={targetUni}
                  onChange={(e) => setTargetUni(e.target.value)}
                  placeholder="e.g. TU Munich, RWTH Aachen, or Bosch"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Target Program / Role *</label>
                <input 
                  type="text" 
                  value={targetProgram}
                  onChange={(e) => setTargetProgram(e.target.value)}
                  placeholder="e.g. M.Sc Automotive Engineering"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                />
              </div>
            </div>

            {/* Current Education & Grades */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">
                Current / Prior Degree &amp; CGPA / Percentage *
              </label>
              <input 
                type="text" 
                value={educationBackground}
                onChange={(e) => setEducationBackground(e.target.value)}
                placeholder="e.g. B.Tech Mechanical Engineering, 8.4/10 CGPA (2025 passout)"
                required
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-germany-black focus:outline-none focus:border-germany-red"
              />
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">First Name *</label>
                <input 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Aarav"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Last Name</label>
                <input 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Sharma"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Email Address *</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aarav@example.com"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">WhatsApp / Phone *</label>
                <div className="flex gap-2">
                  <select 
                    value={countryCode} 
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-24 px-2 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                  >
                    <option value="+91">+91 (IN)</option>
                    <option value="+49">+49 (DE)</option>
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+971">+971 (UAE)</option>
                  </select>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    required
                    className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                  />
                </div>
              </div>
            </div>

            {/* Existing CV link / Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">
                Existing Resume Link or Special Gap/Timeline Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Google Drive link to existing draft, or note about 6-month gap spent preparing for GATE/German A2 exam."
                rows={2}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-germany-black focus:outline-none focus:border-germany-red"
              />
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3 pt-2">
              <input 
                type="checkbox"
                id="consent-cv"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-1 w-4 h-4 text-germany-red border-gray-300 rounded focus:ring-germany-red accent-germany-red cursor-pointer"
              />
              <label htmlFor="consent-cv" className="text-xs text-gray-600 font-medium leading-relaxed cursor-pointer">
                I understand that EuropeBridge prepares a German-standard Tabellarischer Lebenslauf delivered in both submission-ready PDF and editable Word formats, with review revisions included.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !consent}
              className="neu-btn-primary w-full py-4 text-base font-extrabold flex items-center justify-center gap-2 shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <span>Logging CV Order...</span>
              ) : (
                <>
                  <span>
                    Proceed to CV Order — {plan === 'express' ? '₹5,999 (24h Express)' : '₹4,999 (Standard 2-3 Days)'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-xs font-bold text-gray-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#16161a]" />
                Lückenlos &amp; ATS-Compliant
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-germany-red" />
                Guaranteed Turnaround
              </span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
