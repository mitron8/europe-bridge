"use client";
import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Clock, PhoneCall, Banknote, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export const RemittanceBooking = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [transferPurpose, setTransferPurpose] = useState('German Blocked Account (€11,904–€12,053)');
  const [fundingSource, setFundingSource] = useState('Education Loan (0.5% TCS)');
  const [approxAmount, setApproxAmount] = useState('€12,053');
  const [urgency, setUrgency] = useState('Urgent (< 3 Days - Visa / Enrollment Deadline)');
  const [consent, setConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !phone || !consent) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <section id="booking" className="py-12 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto scroll-mt-28">
      <div className="neu-card p-6 sm:p-12 border-2 border-germany-red/30 relative overflow-hidden space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-germany-red text-xs font-black uppercase tracking-wider">
            <Banknote className="w-4 h-4" />
            <span>Fast Remittance Request</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-germany-black font-display">
            Apply for Outward Remittance
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            Submit the form below. A senior EuropeBridge forex counselor will call you back within <strong className="text-germany-black font-extrabold">60 minutes</strong> (working hours) with a live wholesale quote, designated domestic Indian bank account details, and Form A2 guidance.
          </p>
        </div>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 bg-green-50 border-2 border-green-300 rounded-3xl text-center space-y-5"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto font-bold shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-green-900 font-display">Remittance Request Received!</h3>
            <p className="text-sm text-green-800 font-medium max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{firstName}</strong>. A dedicated senior forex executive has been assigned to your case and will call you at <strong>{countryCode} {phone}</strong> within 60 minutes with your personalized live exchange quote.
            </p>

            <div className="p-4 rounded-2xl bg-white/80 border border-green-200 text-xs text-green-900 font-semibold max-w-md mx-auto space-y-1">
              <div>Purpose: <strong>{transferPurpose}</strong></div>
              <div>Approx. Amount: <strong>{approxAmount}</strong></div>
              <div>Funding Source: <strong>{fundingSource}</strong></div>
              <div>Timeline: <strong>{urgency}</strong></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/4915212345678?text=Hi%20EuropeBridge%20team,%20I%20just%20submitted%20my%20outward%20remittance%20request%20for%20${encodeURIComponent(firstName)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-emerald-700 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Urgent WhatsApp Rate Confirmation?</span>
              </a>

              <button 
                onClick={() => setIsSubmitted(false)}
                className="w-full sm:w-auto neu-btn px-6 py-3 text-xs font-extrabold text-germany-black bg-white border border-gray-200"
              >
                Submit Another Request
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">First Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Aryan"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Last Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Verma"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Email Address *</label>
                <input 
                  type="email" 
                  required
                  placeholder="aryan@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Phone Number (WhatsApp) *</label>
                <div className="flex gap-2">
                  <select 
                    value={countryCode} 
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="px-3 py-3 rounded-xl border border-gray-300 font-bold text-xs bg-gray-50 focus:border-germany-red outline-none"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                  </select>
                  <input 
                    type="tel" 
                    required
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red focus:ring-1 focus:ring-germany-red outline-none bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Transfer Purpose & Estimated Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Transfer Purpose *</label>
                <select
                  value={transferPurpose}
                  onChange={(e) => setTransferPurpose(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm bg-white focus:border-germany-red outline-none"
                >
                  <option value="German Blocked Account (€11,904–€12,053)">German Blocked Account (€11,904–€12,053)</option>
                  <option value="University Semester Contribution / Tuition">University Semester Contribution / Tuition</option>
                  <option value="Accommodation / Rental Deposit (Mietkaution)">Accommodation / Rental Deposit (Mietkaution)</option>
                  <option value="Student Travel Forex Card">Student Travel Forex Card</option>
                  <option value="Living Expenses / Other">Living Expenses / Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Approximate Amount (EUR / INR)</label>
                <input 
                  type="text" 
                  placeholder="e.g. €12,053 or ₹11 Lakhs"
                  value={approxAmount}
                  onChange={(e) => setApproxAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm focus:border-germany-red outline-none bg-white"
                />
              </div>
            </div>

            {/* Funding Source & Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Funding Source *</label>
                <select
                  value={fundingSource}
                  onChange={(e) => setFundingSource(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm bg-white focus:border-germany-red outline-none"
                >
                  <option value="Education Loan (0.5% TCS)">Education Loan (0.5% TCS above ₹7L)</option>
                  <option value="Self / Parent Savings (5% TCS)">Self / Parent Savings (5% TCS above ₹7L)</option>
                  <option value="Mix of Loan and Savings">Mix of Loan and Savings</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-gray-600 tracking-wider block">Deadline Urgency *</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 font-semibold text-sm bg-white focus:border-germany-red outline-none"
                >
                  <option value="Urgent (< 3 Days - Visa / Enrollment Deadline)">Urgent (&lt; 3 Days - Visa / Enrollment Deadline)</option>
                  <option value="Within 1 to 2 Weeks">Within 1 to 2 Weeks</option>
                  <option value="Planning Ahead / Exploring Rates">Planning Ahead / Exploring Rates</option>
                </select>
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input 
                type="checkbox" 
                id="consent"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="w-5 h-5 rounded text-germany-red focus:ring-germany-red accent-germany-red mt-0.5 cursor-pointer shrink-0"
              />
              <label htmlFor="consent" className="text-xs text-gray-600 font-medium leading-relaxed cursor-pointer select-none">
                I agree that EuropeBridge and its RBI-authorized forex partners may contact me via phone or WhatsApp regarding German outward remittance quotes and Form A2 procedures. EuropeBridge does not charge students any agency markup.
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full neu-btn-primary py-4 text-base font-black flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting Request...</span>
              ) : (
                <>
                  <span>Request 60-Minute Callback &amp; Quote</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
