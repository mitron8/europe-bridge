"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Clock, User, Mail, Phone, Building } from 'lucide-react';

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
    <section id="section-booking" className="py-16 px-6 lg:px-12 bg-white/50 border-t border-gray-200/80 relative">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Form Container */}
        <div className="neu-card p-6 sm:p-10 bg-white border-2 border-gray-200 shadow-xl space-y-6">
          <div className="space-y-2 border-b border-gray-200 pb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-black uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>60-Minute Response SLA (Working Hours)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-germany-black font-display">
              Apply for Health Insurance for Germany
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Submit your details below. Our European healthcare coordination desk will follow up to assess your eligibility, explain provider differences, and complete your digital enrollment.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-emerald-950">Application Received!</h3>
              <p className="text-sm text-emerald-900 font-medium max-w-lg mx-auto">
                Thank you, <strong>{formData.firstName || 'Student'}</strong>. Our German healthcare advisor is reviewing your academic status and will contact you via email ({formData.email}) and WhatsApp within 60 minutes.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="neu-btn px-6 py-2.5 text-xs font-bold text-germany-black bg-white cursor-pointer"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">First Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rahul"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-germany-red/30 focus:border-germany-red text-sm font-semibold text-gray-800 bg-gray-50/60"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Last Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Sharma"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-germany-red/30 focus:border-germany-red text-sm font-semibold text-gray-800 bg-gray-50/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      required
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-germany-red/30 focus:border-germany-red text-sm font-semibold text-gray-800 bg-gray-50/60"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Phone / WhatsApp *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-germany-red/30 focus:border-germany-red text-sm font-semibold text-gray-800 bg-gray-50/60"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Applicant Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-germany-red/30 focus:border-germany-red text-sm font-semibold text-gray-800 bg-gray-50/60 cursor-pointer"
                  >
                    <option value="student_under_30">Bachelor / Master Student (Under 30)</option>
                    <option value="student_over_30">Student Aged 30 or Above</option>
                    <option value="preparatory">Preparatory Language Course / Studienkolleg</option>
                    <option value="researcher">PhD Candidate / Guest Researcher</option>
                    <option value="family">Student Moving with Spouse / Children</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Target University / City</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. TU Munich, RWTH Aachen, Berlin"
                      value={formData.targetUniversity}
                      onChange={(e) => setFormData({ ...formData, targetUniversity: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-germany-red/30 focus:border-germany-red text-sm font-semibold text-gray-800 bg-gray-50/60"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 rounded border-gray-300 text-germany-red focus:ring-germany-red h-4 w-4 cursor-pointer"
                  />
                  <span className="text-xs text-gray-600 font-medium leading-relaxed">
                    I agree that EuropeBridge may process my contact details to assist with health insurance comparison and consular university registration. See our privacy policy.
                  </span>
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full neu-btn-primary py-3.5 px-6 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting Request...' : 'Submit Health Insurance Request'}</span>
                </button>
              </div>
            </form>
          )}

          <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-500 font-bold gap-3">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Free Advisory • Zero Service Charges
            </span>
            <span>Official Digital M10 Notification Included</span>
          </div>
        </div>
      </div>
    </section>
  );
};
