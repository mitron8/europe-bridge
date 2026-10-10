"use client";
import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Clock, Zap, ArrowRight, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';

export const SopBooking = () => {
  const [plan, setPlan] = useState<'standard' | 'express'>('standard');
  const [degreeLevel, setDegreeLevel] = useState<'masters' | 'bachelors'>('masters');
  const [targetUni, setTargetUni] = useState('');
  const [targetProgram, setTargetProgram] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [guidelines, setGuidelines] = useState('');
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
    <section id="booking" className="py-12 px-6 lg:px-12 max-w-4xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-12 border-2 border-germany-red/30 relative overflow-hidden space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <PenTool className="w-4 h-4" />
            <span>Order Your Statement of Purpose</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Start Your Custom SOP
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            Submit your basic details below. The first draft will arrive in 1 or 3 working days based on your chosen plan.
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
            <h3 className="text-2xl font-black text-green-900 font-display">SOP Order Logged!</h3>
            <p className="text-sm text-green-800 font-medium max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{firstName}</strong>. Your order for the <strong>{plan === 'express' ? 'Express Plan (24h - ₹5,999)' : 'Standard Plan (3 days - ₹4,999)'}</strong> for <strong>{targetUni || 'Target German University'}</strong> has been received.
            </p>
            <div className="p-4 bg-white/80 rounded-2xl border border-green-200 text-xs text-green-900 max-w-md mx-auto space-y-1 text-left">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Questionnaire Sent To:</span>
                <span className="font-black">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Draft Delivery Target:</span>
                <span className="font-black text-germany-red">{plan === 'express' ? 'Within 24 Hours' : 'Within 3 Working Days'}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium pt-2">
              Please check your email for the detailed background questionnaire and CV upload link.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="neu-btn px-6 py-2.5 text-xs font-extrabold text-germany-black bg-white border border-gray-200 mt-2"
            >
              Order Another SOP
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            {/* Plan Selector Radios */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase text-gray-700 tracking-wider block">
                Select Turnaround Speed *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPlan('standard')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${
                    plan === 'standard'
                      ? 'border-germany-black bg-gray-50 shadow-inner'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div>
                    <span className="text-sm font-black text-germany-black block">Standard Order</span>
                    <span className="text-xs text-gray-500 font-medium">First draft in 3 working days</span>
                  </div>
                  <span className="text-base font-black text-germany-black">₹4,999</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlan('express')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${
                    plan === 'express'
                      ? 'border-germany-red bg-red-50/50 shadow-inner'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-black text-germany-red">Express Order</span>
                      <Zap className="w-3.5 h-3.5 text-germany-red fill-current" />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">First draft in 24 hours</span>
                  </div>
                  <span className="text-base font-black text-germany-red">₹5,999</span>
                </button>
              </div>
            </div>

            {/* Target University & Degree */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Target German University *</label>
                <input 
                  type="text" 
                  value={targetUni}
                  onChange={(e) => setTargetUni(e.target.value)}
                  placeholder="e.g. RWTH Aachen or TU Munich"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Target Program *</label>
                <input 
                  type="text" 
                  value={targetProgram}
                  onChange={(e) => setTargetProgram(e.target.value)}
                  placeholder="e.g. M.Sc Computer Science"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                />
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">First Name *</label>
                <input 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Rohan"
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
                  placeholder="e.g. Patel"
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
                  placeholder="rohan@example.com"
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
                University Prompts or Specific Guidelines (Optional)
              </label>
              <textarea
                value={guidelines}
                onChange={(e) => setGuidelines(e.target.value)}
                placeholder="e.g. 500-word limit specified by TUM, or specific prompt on why I selected autonomous systems track."
                rows={2}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-germany-black focus:outline-none focus:border-germany-red"
              />
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3 pt-2">
              <input 
                type="checkbox"
                id="consent-sop"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-1 w-4 h-4 text-germany-red border-gray-300 rounded focus:ring-germany-red accent-germany-red cursor-pointer"
              />
              <label htmlFor="consent-sop" className="text-xs text-gray-600 font-medium leading-relaxed cursor-pointer">
                I understand that EuropeBridge crafts 100% original, plagiarism-free SOPs tailored to my profile and target German program, with 2 full student review rounds included.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !consent}
              className="neu-btn-primary w-full py-4 text-base font-extrabold flex items-center justify-center gap-2 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span>Logging SOP Order...</span>
              ) : (
                <>
                  <span>
                    Proceed to SOP Order — {plan === 'express' ? '₹5,999 (24h Express)' : '₹4,999 (Standard 3-Day)'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-xs font-bold text-gray-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                100% Original &amp; Turnitin-Verified
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
