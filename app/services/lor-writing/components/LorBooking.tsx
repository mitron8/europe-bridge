"use client";
import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Clock, Zap, ArrowRight, Users, GraduationCap, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export const LorBooking = () => {
  const [plan, setPlan] = useState<'standard' | 'express'>('standard');
  const [lorMix, setLorMix] = useState<'2-academic' | '1-academic-1-work' | '2-work'>('2-academic');
  const [targetUni, setTargetUni] = useState('');
  const [targetProgram, setTargetProgram] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  
  // Recommender details
  const [rec1Name, setRec1Name] = useState('');
  const [rec1Role, setRec1Role] = useState('');
  const [rec2Name, setRec2Name] = useState('');
  const [rec2Role, setRec2Role] = useState('');
  
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !phone || !consent) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 850);
  };

  return (
    <section id="booking" className="py-14 px-6 lg:px-12 max-w-4xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-12 border-2 border-germany-red/30 relative overflow-hidden space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>2 LORs Recommendation Package</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Order Your Recommendation Letters
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            Configure both recommenders below. We’ll deliver two distinct, customized LOR drafts within your chosen timeline.
          </p>
        </div>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 bg-green-50 border-2 border-green-300 rounded-3xl text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto font-bold">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-green-900 font-display">2-LOR Order Confirmed!</h3>
            <p className="text-sm text-green-800 font-medium max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{firstName}</strong>. Your order for <strong>2 Letters of Recommendation ({plan === 'express' ? 'Express 24h - ₹5,999' : 'Standard 3-Day - ₹4,999'})</strong> has been logged.
            </p>
            
            <div className="p-4 bg-white/80 rounded-2xl border border-green-200 text-xs text-green-900 max-w-md mx-auto space-y-2 text-left">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Confirmation Sent To:</span>
                <span className="font-black">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Recommender Configuration:</span>
                <span className="font-black text-germany-black">
                  {lorMix === '2-academic' ? '2 Academic LORs' : lorMix === '1-academic-1-work' ? '1 Academic + 1 Professional' : '2 Professional LORs'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Turnaround Speed:</span>
                <span className="font-black text-germany-red">{plan === 'express' ? 'Within 24 Hours' : 'Within 3 Working Days'}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 font-medium pt-2">
              We’ve sent the comprehensive LOR intake questionnaire to your email to collect specific projects, grades, and faculty details.
            </p>

            <button 
              onClick={() => setIsSubmitted(false)}
              className="neu-btn px-6 py-2.5 text-xs font-extrabold text-germany-black bg-white border border-gray-200 mt-2"
            >
              Order Another Bundle
            </button>
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
                    <span className="text-xs text-gray-500 font-medium">Both drafts in 3 working days</span>
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
                      <span className="text-sm font-black text-germany-red">Express Bundle</span>
                      <Zap className="w-3.5 h-3.5 text-germany-red fill-current" />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">Both drafts in 24 hours</span>
                  </div>
                  <span className="text-base font-black text-germany-red">₹5,999</span>
                </button>
              </div>
            </div>

            {/* Recommender Mix Selection */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase text-gray-700 tracking-wider block">
                2. Recommender Combination (2 Letters Included) *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setLorMix('2-academic')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center gap-2 cursor-pointer ${
                    lorMix === '2-academic'
                      ? 'border-germany-red bg-red-50 text-germany-red font-black'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span>2 Academic LORs</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLorMix('1-academic-1-work')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center gap-2 cursor-pointer ${
                    lorMix === '1-academic-1-work'
                      ? 'border-germany-red bg-red-50 text-germany-red font-black'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Users className="w-4 h-4 shrink-0" />
                  <span>1 Academic + 1 Work</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLorMix('2-work')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center gap-2 cursor-pointer ${
                    lorMix === '2-work'
                      ? 'border-germany-red bg-red-50 text-germany-red font-black'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Briefcase className="w-4 h-4 shrink-0" />
                  <span>2 Professional LORs</span>
                </button>
              </div>
            </div>

            {/* Target German Program & University */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Target German University *</label>
                <input 
                  type="text" 
                  value={targetUni}
                  onChange={(e) => setTargetUni(e.target.value)}
                  placeholder="e.g. TUM, RWTH Aachen, or FAU Erlangen"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Target Master’s / Bachelor’s Program *</label>
                <input 
                  type="text" 
                  value={targetProgram}
                  onChange={(e) => setTargetProgram(e.target.value)}
                  placeholder="e.g. M.Sc Automotive Software"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                />
              </div>
            </div>

            {/* Recommender 1 Info */}
            <div className="p-4 bg-gray-50/70 border border-gray-200 rounded-2xl space-y-3">
              <span className="text-xs font-extrabold uppercase text-germany-red tracking-wider block">
                Recommender 1 (e.g. Project Guide, HoD, or Lead)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input 
                  type="text" 
                  value={rec1Name}
                  onChange={(e) => setRec1Name(e.target.value)}
                  placeholder="Recommender 1 Full Name"
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-germany-black focus:outline-none focus:border-germany-red"
                />
                <input 
                  type="text" 
                  value={rec1Role}
                  onChange={(e) => setRec1Role(e.target.value)}
                  placeholder="Designation & Institution/Company"
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-germany-black focus:outline-none focus:border-germany-red"
                />
              </div>
            </div>

            {/* Recommender 2 Info */}
            <div className="p-4 bg-gray-50/70 border border-gray-200 rounded-2xl space-y-3">
              <span className="text-xs font-extrabold uppercase text-germany-red tracking-wider block">
                Recommender 2 (e.g. Course Professor or Manager)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input 
                  type="text" 
                  value={rec2Name}
                  onChange={(e) => setRec2Name(e.target.value)}
                  placeholder="Recommender 2 Full Name"
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-germany-black focus:outline-none focus:border-germany-red"
                />
                <input 
                  type="text" 
                  value={rec2Role}
                  onChange={(e) => setRec2Role(e.target.value)}
                  placeholder="Designation & Institution/Company"
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-germany-black focus:outline-none focus:border-germany-red"
                />
              </div>
            </div>

            {/* Student Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Student First Name *</label>
                <input 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Priya"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Student Last Name</label>
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
                  placeholder="priya@example.com"
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

            {/* Special Instructions */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">
                Specific University Prompts or Instructions (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Professor wants emphasis on embedded microcontrollers project; university requires specific recommendation rating grid."
                rows={2}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-germany-black focus:outline-none focus:border-germany-red"
              />
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3 pt-2">
              <input 
                type="checkbox"
                id="consent-lor"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-1 w-4 h-4 text-germany-red border-gray-300 rounded focus:ring-germany-red accent-germany-red cursor-pointer"
              />
              <label htmlFor="consent-lor" className="text-xs text-gray-600 font-medium leading-relaxed cursor-pointer">
                I understand that this bundle includes <strong>two complete, custom LORs</strong> with 2 full rounds of review, formatted for official university/company letterhead printing.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !consent}
              className="neu-btn-primary w-full py-4 text-base font-extrabold flex items-center justify-center gap-2 shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <span>Logging 2-LOR Order...</span>
              ) : (
                <>
                  <span>
                    Proceed with 2 LORs — {plan === 'express' ? '₹5,999 (24h Express)' : '₹4,999 (Standard 3-Day)'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-xs font-bold text-gray-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                2 LORs Included
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
