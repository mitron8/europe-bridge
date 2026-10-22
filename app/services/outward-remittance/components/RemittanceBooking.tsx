"use client";
import React, { useState } from 'react';
import { Send, CheckCircle2, PhoneCall, MessageSquare } from 'lucide-react';
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
    <section id="booking" className="py-8 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto scroll-mt-28">
      <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-12 shadow-[0_16px_40px_rgba(22,22,26,0.05)] relative overflow-hidden space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--lp-red)] block">
            Fast Remittance Request
          </div>
          <h2 className="lp-serif text-3xl sm:text-4xl font-semibold text-[var(--lp-text)]">
            Apply for <em className="lp-script text-[var(--lp-red)] font-normal text-4xl sm:text-5xl">Outward Remittance</em>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--lp-muted)] font-medium leading-relaxed">
            Submit the form below. A senior EuropeBridge forex counselor will call you back within <strong className="text-[var(--lp-text)] font-semibold">60 minutes</strong> (working hours) with a live wholesale quote, designated domestic Indian bank account details, and Form A2 guidance.
          </p>
        </div>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 bg-[#ece7dd]/60 border border-[#e2ddd3] rounded-3xl text-center space-y-5"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--lp-red)]/10 text-[var(--lp-red)] flex items-center justify-center mx-auto font-bold shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="lp-serif text-2xl font-bold text-[var(--lp-text)]">Remittance Request Received!</h3>
            <p className="text-sm text-[var(--lp-muted)] font-medium max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{firstName}</strong>. A dedicated senior forex executive has been assigned to your case and will call you at <strong>{countryCode} {phone}</strong> within 60 minutes with your personalized live exchange quote.
            </p>

            <div className="p-4 rounded-2xl bg-white border border-[#e5e0d3] text-xs text-[var(--lp-text)] font-medium max-w-md mx-auto space-y-1">
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
                className="w-full sm:w-auto lp-btn lp-btn--red px-6 py-3 text-xs flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Urgent WhatsApp Rate Confirmation?</span>
              </a>

              <button 
                onClick={() => setIsSubmitted(false)}
                className="w-full sm:w-auto lp-btn lp-btn--ghost-dark px-6 py-3 text-xs font-bold"
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
                <label className="text-xs font-bold uppercase text-[var(--lp-text)] tracking-wider block">First Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Aryan"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e5e0d3] font-medium text-sm focus:border-[var(--lp-red)] focus:ring-2 focus:ring-[var(--lp-red)]/15 outline-none bg-white text-[var(--lp-text)]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[var(--lp-text)] tracking-wider block">Last Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Sharma"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e5e0d3] font-medium text-sm focus:border-[var(--lp-red)] focus:ring-2 focus:ring-[var(--lp-red)]/15 outline-none bg-white text-[var(--lp-text)]"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[var(--lp-text)] tracking-wider block">Email Address *</label>
                <input 
                  type="email" 
                  required
                  placeholder="aryan@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e5e0d3] font-medium text-sm focus:border-[var(--lp-red)] focus:ring-2 focus:ring-[var(--lp-red)]/15 outline-none bg-white text-[var(--lp-text)]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[var(--lp-text)] tracking-wider block">Phone Number *</label>
                <div className="flex gap-2">
                  <select 
                    value={countryCode} 
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="px-3 py-3 rounded-2xl border border-[#e5e0d3] font-bold text-xs bg-white text-[var(--lp-text)] outline-none"
                  >
                    <option value="+91">+91 (IN)</option>
                    <option value="+49">+49 (DE)</option>
                    <option value="+971">+971 (UAE)</option>
                  </select>
                  <input 
                    type="tel" 
                    required
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-[#e5e0d3] font-medium text-sm focus:border-[var(--lp-red)] focus:ring-2 focus:ring-[var(--lp-red)]/15 outline-none bg-white text-[var(--lp-text)]"
                  />
                </div>
              </div>
            </div>

            {/* Transfer Purpose & Approx Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[var(--lp-text)] tracking-wider block">Transfer Purpose</label>
                <select 
                  value={transferPurpose}
                  onChange={(e) => setTransferPurpose(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e5e0d3] font-medium text-sm bg-white text-[var(--lp-text)] outline-none"
                >
                  <option value="German Blocked Account (€11,904–€12,053)">German Blocked Account (€11,904–€12,053)</option>
                  <option value="University Tuition Fee">University Tuition Fee</option>
                  <option value="Semester Fee / Contribution (Semesterbeitrag)">Semester Fee / Contribution (Semesterbeitrag)</option>
                  <option value="Accommodation Rent Deposit (Kaution)">Accommodation Rent Deposit (Kaution)</option>
                  <option value="Other Living Expense Remittance">Other Living Expense Remittance</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[var(--lp-text)] tracking-wider block">Approx. Amount in Euros</label>
                <select 
                  value={approxAmount}
                  onChange={(e) => setApproxAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e5e0d3] font-medium text-sm bg-white text-[var(--lp-text)] outline-none"
                >
                  <option value="€12,053 (Standard Blocked Account)">€12,053 (Standard Blocked Account)</option>
                  <option value="€2,000 to €5,000 (Tuition / Deposit)">€2,000 to €5,000 (Tuition / Deposit)</option>
                  <option value="€5,000 to €15,000 (Full Year Tuition)">€5,000 to €15,000 (Full Year Tuition)</option>
                  <option value="Under €1,500 (Small Payment)">Under €1,500 (Small Payment)</option>
                  <option value="Above €15,000">Above €15,000</option>
                </select>
              </div>
            </div>

            {/* Funding Source & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[var(--lp-text)] tracking-wider block">Funding Source (TCS Rate)</label>
                <select 
                  value={fundingSource}
                  onChange={(e) => setFundingSource(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e5e0d3] font-medium text-sm bg-white text-[var(--lp-text)] outline-none"
                >
                  <option value="Education Loan (0.5% TCS)">Education Loan (0.5% TCS)</option>
                  <option value="Self / Parent Bank Savings (5% TCS)">Self / Parent Bank Savings (5% TCS)</option>
                  <option value="Part Loan + Part Savings">Part Loan + Part Savings</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-[var(--lp-text)] tracking-wider block">Transfer Urgency</label>
                <select 
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#e5e0d3] font-medium text-sm bg-white text-[var(--lp-text)] outline-none"
                >
                  <option value="Urgent (< 3 Days - Visa / Enrollment Deadline)">Urgent (&lt; 3 Days - Visa / Enrollment Deadline)</option>
                  <option value="Within Next 1–2 Weeks">Within Next 1–2 Weeks</option>
                  <option value="Exploring Rates for Upcoming Intake">Exploring Rates for Upcoming Intake</option>
                </select>
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input 
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-[var(--lp-red)] focus:ring-[var(--lp-red)] accent-[var(--lp-red)]"
                />
                <span className="text-xs text-[var(--lp-muted)] font-medium leading-relaxed">
                  I authorize EuropeBridge and its RBI-licensed Authorized Dealer Category-II banking partner to contact me via phone, WhatsApp, and email regarding live remittance exchange rates and Form A2 processing.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="lp-btn lp-btn--red w-full py-4 text-sm font-bold flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting Request...' : 'Request Wholesale Quote & 60-Min Callback'}</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
