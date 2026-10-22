"use client";
import React, { useState } from 'react';
import { Send, CheckCircle2, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoanForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
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
      <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-12 shadow-[0_16px_40px_rgba(22,22,26,0.06)] relative overflow-hidden space-y-8">
        {/* Header */}
        <div className="text-center space-y-2.5 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ece7dd] text-[var(--lp-red)] text-[11px] font-semibold uppercase tracking-wider border border-[#e2ddd3]">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Fast Eligibility Assessment</span>
          </div>
          <h2 className="lp-serif text-3xl sm:text-4xl font-semibold text-[var(--lp-text)]">
            Apply for an Education Loan
          </h2>
          <p className="text-xs sm:text-sm text-[var(--lp-muted)] font-normal leading-relaxed">
            Submit your contact details below. An education loan specialist will call you back within <strong className="text-[var(--lp-text)] font-semibold">60 minutes</strong> (working hours) to initiate your application and arrange document pickup.
          </p>
        </div>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 bg-[#ece7dd]/60 border border-[#e2ddd3] rounded-3xl text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--lp-red)]/10 text-[var(--lp-red)] flex items-center justify-center mx-auto font-bold shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="lp-serif text-2xl font-semibold text-[var(--lp-text)]">Loan Application Submitted!</h3>
            <p className="text-sm text-[var(--lp-muted)] font-normal max-w-lg mx-auto leading-relaxed">
              Thank you, <strong className="text-[var(--lp-text)]">{firstName}</strong>. Our loan specialist will call you at <strong className="text-[var(--lp-text)]">{countryCode} {phone}</strong> within 60 minutes to guide you through your sanction letter process.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="lp-btn lp-btn--ghost-dark px-6 py-2.5 text-xs mt-2"
            >
              Submit Another Request
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-[var(--lp-muted)] tracking-wider block">First Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e0d3] font-medium text-sm text-[var(--lp-text)] focus:border-[var(--lp-red)] focus:ring-1 focus:ring-[var(--lp-red)] outline-none bg-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-[var(--lp-muted)] tracking-wider block">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e0d3] font-medium text-sm text-[var(--lp-text)] focus:border-[var(--lp-red)] focus:ring-1 focus:ring-[var(--lp-red)] outline-none bg-white transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-[var(--lp-muted)] tracking-wider block">Email Address *</label>
              <input 
                type="email" 
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#e5e0d3] font-medium text-sm text-[var(--lp-text)] focus:border-[var(--lp-red)] focus:ring-1 focus:ring-[var(--lp-red)] outline-none bg-white transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-[var(--lp-muted)] tracking-wider block">Phone Number *</label>
              <div className="flex gap-2">
                <select 
                  value={countryCode} 
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="px-3 py-3 rounded-xl border border-[#e5e0d3] font-bold text-xs bg-[#faf8f3] text-[var(--lp-text)] focus:border-[var(--lp-red)] outline-none"
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
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-[#e5e0d3] font-medium text-sm text-[var(--lp-text)] focus:border-[var(--lp-red)] focus:ring-1 focus:ring-[var(--lp-red)] outline-none bg-white transition-colors"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input 
                type="checkbox" 
                id="consent"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="w-4 h-4 rounded text-[var(--lp-red)] focus:ring-[var(--lp-red)] accent-[var(--lp-red)] mt-0.5 cursor-pointer shrink-0"
              />
              <label htmlFor="consent" className="text-xs text-[var(--lp-muted)] font-normal leading-relaxed cursor-pointer select-none">
                I agree that EuropeBridge may store my details and contact me via phone or email regarding education loan services. I can request data deletion at any time.
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full lp-btn lp-btn--red py-4 text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_12px_28px_-8px_rgba(230,57,70,0.45)] disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting Request...</span>
              ) : (
                <>
                  <span>Submit Loan Request</span>
                  <Send className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
