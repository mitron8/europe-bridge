"use client";

import React, { useState } from 'react';
import { Send, Check, ShieldCheck, Clock, User, Mail, Phone, Building } from 'lucide-react';

export const InsuranceBookingForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: 'student_under_30',
    targetUniversity: '',
    consent: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="booking" className="scroll-mt-32 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
      <div className="max-w-2xl mx-auto">
        {/* Form Container */}
        <div className="bg-[var(--lp-card)] rounded-3xl p-6 sm:p-8 border border-[#e5e0d3] space-y-6 shadow-[0_12px_40px_rgba(22,22,26,0.05)]">
          <div className="space-y-2 border-b border-[var(--lp-rule)] pb-4">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--lp-gold)] bg-[var(--lp-gold)]/10 px-2.5 py-0.5 rounded-full border border-[var(--lp-gold)]/20 inline-block">
              Fast-Track Advisory
            </span>
            <h2 className="lp-serif text-2xl font-semibold text-[var(--lp-text)]">
              Apply for German Health Insurance
            </h2>
            <p className="text-xs text-[var(--lp-muted)] leading-relaxed">
              Submit your details below. Our healthcare coordination team will assess your eligibility and transmit your digital M10 notification.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-4 bg-[#eae5db]/60 border border-[#e5e0d3] rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-[var(--lp-ink)] text-white flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 text-[var(--lp-gold)]" />
              </div>
              <h3 className="font-serif text-lg font-normal text-[var(--lp-ink)]">Application Received</h3>
              <p className="text-xs text-[var(--lp-muted)] leading-relaxed max-w-md mx-auto">
                Thank you, <strong className="text-[var(--lp-text)]">{formData.firstName || 'Student'}</strong>. Our advisor is reviewing your academic details and will follow up via email ({formData.email}) and WhatsApp within 60 minutes.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 text-xs font-semibold rounded-full bg-[#faf8f3] text-[var(--lp-text)] border border-[#e5e0d3] hover:bg-[#eae5db] cursor-pointer transition-colors"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">First Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Rahul"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#e5e0d3] bg-[#eae5db]/40 text-xs font-medium text-[var(--lp-text)] focus:outline-none focus:border-[var(--lp-red)] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">Last Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Sharma"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#e5e0d3] bg-[#eae5db]/40 text-xs font-medium text-[var(--lp-text)] focus:outline-none focus:border-[var(--lp-red)] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#e5e0d3] bg-[#eae5db]/40 text-xs font-medium text-[var(--lp-text)] focus:outline-none focus:border-[var(--lp-red)] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">Phone / WhatsApp *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#e5e0d3] bg-[#eae5db]/40 text-xs font-medium text-[var(--lp-text)] focus:outline-none focus:border-[var(--lp-red)] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">Student Category *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e5e0d3] bg-[#eae5db]/40 text-xs font-medium text-[var(--lp-text)] focus:outline-none focus:border-[var(--lp-red)] transition-colors"
                >
                  <option value="student_under_30">Regular Student Under 30 (Bachelor / Master)</option>
                  <option value="student_over_30">Student Age 30 or Older</option>
                  <option value="phd_researcher">PhD Candidate / Academic Researcher</option>
                  <option value="language_studienkolleg">Language School / Studienkolleg Attendee</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--lp-muted)]">Target University in Germany</label>
                <input
                  type="text"
                  placeholder="e.g. TU Munich, RWTH Aachen, FU Berlin"
                  value={formData.targetUniversity}
                  onChange={(e) => setFormData({ ...formData, targetUniversity: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e5e0d3] bg-[#eae5db]/40 text-xs font-medium text-[var(--lp-text)] focus:outline-none focus:border-[var(--lp-red)] transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full bg-[var(--lp-ink)] text-white hover:bg-[var(--lp-red)] text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  {loading ? (
                    <span>Processing Submission...</span>
                  ) : (
                    <>
                      <span>Submit Free Health Insurance Application</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
