"use client";
import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Clock, Zap, ArrowRight, FileText, Calendar, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';

export const VisaBooking = () => {
  const [plan, setPlan] = useState<'premium' | 'complete'>('complete');
  const [intake, setIntake] = useState<'winter-2026' | 'summer-2027'>('winter-2026');
  const [targetUni, setTargetUni] = useState('');
  const [targetProgram, setTargetProgram] = useState('');
  const [admissionStatus, setAdmissionStatus] = useState<'unconditional' | 'conditional' | 'awaiting'>('unconditional');
  const [jurisdiction, setJurisdiction] = useState('New Delhi');
  const [apsStatus, setApsStatus] = useState('Have APS Certificate');
  const [blockedAccountStatus, setBlockedAccountStatus] = useState('Already Funded');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
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
            <ShieldCheck className="w-4 h-4" />
            <span>Book Your Visa Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Start Your German Visa Application
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            Pick Premium or Complete and tell us about your admission. We will initiate your CSP profile setup and VIDEX dossier within 1 to 2 working days.
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
            <h3 className="text-2xl font-black text-green-900 font-display">Visa Dossier Initiated!</h3>
            <p className="text-sm text-green-800 font-medium max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{firstName}</strong>. Your order for the <strong>{plan === 'complete' ? 'Complete Visa Plan (₹19,999)' : 'Premium Visa Plan (₹14,999)'}</strong> for <strong>{targetUni || 'Target German University'}</strong> has been registered.
            </p>
            
            <div className="p-4 bg-white/80 rounded-2xl border border-green-200 text-xs text-green-900 max-w-md mx-auto space-y-2 text-left">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Preferences Form Sent To:</span>
                <span className="font-black">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Selected Plan:</span>
                <span className="font-black text-germany-black">
                  {plan === 'complete' ? 'Complete Plan (Includes LOM & Cover Letter)' : 'Premium Plan'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">VFS Jurisdiction:</span>
                <span className="font-black text-germany-red">{jurisdiction}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Initial Setup:</span>
                <span className="font-black text-green-800">Within 1 to 2 Working Days</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 font-medium pt-2">
              Our lead visa counselor is reviewing your profile and will reach out via WhatsApp and email with your intake checklist.
            </p>

            <button 
              onClick={() => setIsSubmitted(false)}
              className="neu-btn px-6 py-2.5 text-xs font-extrabold text-germany-black bg-white border border-gray-200 mt-2 cursor-pointer"
            >
              Order Another Application
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            {/* Plan Selector */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase text-gray-700 tracking-wider block">
                1. Select Visa Package *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPlan('premium')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex justify-between items-center cursor-pointer ${
                    plan === 'premium'
                      ? 'border-germany-black bg-gray-50 shadow-inner'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div>
                    <span className="text-sm font-black text-germany-black block">Premium Plan</span>
                    <span className="text-xs text-gray-500 font-medium">CSP + VIDEX + VFS + Interview</span>
                  </div>
                  <span className="text-base font-black text-germany-black">₹14,999</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlan('complete')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex justify-between items-center cursor-pointer ${
                    plan === 'complete'
                      ? 'border-germany-red bg-red-50/50 shadow-inner'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-black text-germany-red">Complete Plan</span>
                      <Zap className="w-3.5 h-3.5 text-germany-red fill-current" />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">Includes Expert LOM &amp; Cover Letter</span>
                  </div>
                  <span className="text-base font-black text-germany-red">₹19,999</span>
                </button>
              </div>
            </div>

            {/* Intake Semester & Admission Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Target Semester *</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIntake('winter-2026')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      intake === 'winter-2026'
                        ? 'border-germany-red bg-red-50 text-germany-red font-black'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Winter 2026
                  </button>
                  <button
                    type="button"
                    onClick={() => setIntake('summer-2027')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      intake === 'summer-2027'
                        ? 'border-germany-red bg-red-50 text-germany-red font-black'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Summer 2027
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Admission Status *</label>
                <select
                  value={admissionStatus}
                  onChange={(e) => setAdmissionStatus(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                >
                  <option value="unconditional">Unconditional Offer Letter Received</option>
                  <option value="conditional">Conditional Admission Letter Received</option>
                  <option value="awaiting">Awaiting Final University Result</option>
                </select>
              </div>
            </div>

            {/* University & Degree */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Target German University *</label>
                <input 
                  type="text" 
                  value={targetUni}
                  onChange={(e) => setTargetUni(e.target.value)}
                  placeholder="e.g. TU Munich, RWTH Aachen, or KIT"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Degree Program *</label>
                <input 
                  type="text" 
                  value={targetProgram}
                  onChange={(e) => setTargetProgram(e.target.value)}
                  placeholder="e.g. M.Sc Mechanical Engineering"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                />
              </div>
            </div>

            {/* VFS Jurisdiction & APS Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Your Regional VFS Jurisdiction *</label>
                <select
                  value={jurisdiction}
                  onChange={(e) => setJurisdiction(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                >
                  <option value="New Delhi">VFS New Delhi (German Embassy)</option>
                  <option value="Mumbai">VFS Mumbai (Consulate General)</option>
                  <option value="Bengaluru">VFS Bengaluru (Consulate General)</option>
                  <option value="Chennai">VFS Chennai (Consulate General)</option>
                  <option value="Kolkata">VFS Kolkata (Consulate General)</option>
                  <option value="Hyderabad">VFS Hyderabad</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">APS Certificate Status *</label>
                <select
                  value={apsStatus}
                  onChange={(e) => setApsStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                >
                  <option value="Have APS Certificate">Have APS Certificate</option>
                  <option value="APS Verification In Progress">APS Verification In Progress</option>
                  <option value="Exempted (PhD / EU Scholar)">Exempted (e.g. PhD / Erasmus Scholar)</option>
                </select>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">First Name (As Per Passport) *</label>
                <input 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Ananya"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-germany-black focus:outline-none focus:border-germany-red"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Last Name (As Per Passport)</label>
                <input 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Rao"
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
                  placeholder="ananya@example.com"
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

            {/* Special Notes / Urgent deadlines */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">
                Urgent Application Notes or Blocked Account Status (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. University enrollment deadline is August 15; blocked account opening with Expatrio is currently underway."
                rows={2}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-germany-black focus:outline-none focus:border-germany-red"
              />
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3 pt-2">
              <input 
                type="checkbox"
                id="consent-visa"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-1 w-4 h-4 text-germany-red border-gray-300 rounded focus:ring-germany-red accent-germany-red cursor-pointer"
              />
              <label htmlFor="consent-visa" className="text-xs text-gray-600 font-medium leading-relaxed cursor-pointer">
                I understand that EuropeBridge provides full end-to-end guidance including CSP digital profile setup, VIDEX filing, document dossier review, VFS booking, and 1:1 interview preparation.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !consent}
              className="neu-btn-primary w-full py-4 text-base font-extrabold flex items-center justify-center gap-2 shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <span>Registering Visa Dossier...</span>
              ) : (
                <>
                  <span>
                    Proceed with {plan === 'complete' ? 'Complete Plan (₹19,999)' : 'Premium Plan (₹14,999)'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-xs font-bold text-gray-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                99.4% Visa Success Rate
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-germany-red" />
                Initial Setup in 1–2 Days
              </span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
