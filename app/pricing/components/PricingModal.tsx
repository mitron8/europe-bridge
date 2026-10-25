"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Phone, Mail, User, GraduationCap, Calendar, Sparkles } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
  selectedPrice: string;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  selectedPrice
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [intake, setIntake] = useState('Winter Semester 2026');
  const [field, setField] = useState('Computer Science / IT / AI');
  const [gpa, setGpa] = useState('');
  const [paymentPreference, setPaymentPreference] = useState<'online' | 'emi' | 'counselor'>('online');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsSubmitted(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const isFree = selectedPlan.toLowerCase().includes('free') || selectedPrice === '₹0' || selectedPrice === 'Free';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0d0d10]/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[520px] rounded-2xl sm:rounded-3xl bg-[#faf8f4] border border-[#e2ddd4] p-5 sm:p-6 shadow-[0_24px_65px_-12px_rgba(22,22,26,0.22)] z-10 max-h-[calc(100vh-2rem)] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#ded8cb_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#ded8cb] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#b8b2a5]"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 h-8 w-8 rounded-full bg-[#ede7dc] text-[#6b665d] hover:bg-[#e0d9cd] hover:text-[#16161a] transition-all flex items-center justify-center cursor-pointer z-20"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <div>
                {/* Modal Header */}
                <div className="mb-4 sm:mb-5 pr-8">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9e2a2b] bg-[#9e2a2b]/10 px-2.5 py-0.5 rounded-full border border-[#9e2a2b]/20 inline-flex items-center gap-1.5 mb-1.5">
                    {isFree ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9e2a2b] animate-pulse" />
                        Free Strategy Session
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3 text-[#9e2a2b]" />
                        Official Admission Enrollment
                      </>
                    )}
                  </span>
                  <h3 className="text-xl sm:text-[22px] font-serif font-bold text-[#16161a] tracking-tight leading-snug">
                    {isFree ? "Book Free 1-on-1 Consultation" : `Enroll in ${selectedPlan}`}
                  </h3>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-[#16161a]">{selectedPrice}</span>
                    <span className="text-xs text-[#787369]">
                      {isFree
                        ? "30-min strategy call · No sales pressure · Direct alumni guidance"
                        : "One-time fee · No hidden charges"}
                    </span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Name */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#4a4740] block mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#8a857b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#ded8cb] bg-white text-xs sm:text-sm text-[#16161a] placeholder-[#9c9689] focus:outline-none focus:border-[#16161a] focus:ring-1 focus:ring-[#16161a] transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#4a4740] block mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#8a857b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="rahul@example.com"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#ded8cb] bg-white text-xs sm:text-sm text-[#16161a] placeholder-[#9c9689] focus:outline-none focus:border-[#16161a] focus:ring-1 focus:ring-[#16161a] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#4a4740] block mb-1">
                        WhatsApp Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#8a857b] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#ded8cb] bg-white text-xs sm:text-sm text-[#16161a] placeholder-[#9c9689] focus:outline-none focus:border-[#16161a] focus:ring-1 focus:ring-[#16161a] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* CGPA & Target Intake */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#4a4740] block mb-1">
                        Current GPA / % (Approx)
                      </label>
                      <input
                        type="text"
                        value={gpa}
                        onChange={(e) => setGpa(e.target.value)}
                        placeholder="e.g. 8.2 CGPA or 76%"
                        className="w-full px-3 py-2 rounded-xl border border-[#ded8cb] bg-white text-xs sm:text-sm text-[#16161a] placeholder-[#9c9689] focus:outline-none focus:border-[#16161a] focus:ring-1 focus:ring-[#16161a] transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#4a4740] block mb-1">
                        Target Intake
                      </label>
                      <select
                        value={intake}
                        onChange={(e) => setIntake(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#ded8cb] bg-white text-xs sm:text-sm text-[#16161a] focus:outline-none focus:border-[#16161a] focus:ring-1 focus:ring-[#16161a] transition-all cursor-pointer"
                      >
                        <option value="Winter Semester 2026">Winter 2026 (Oct 2026)</option>
                        <option value="Summer Semester 2027">Summer 2027 (Apr 2027)</option>
                        <option value="Winter Semester 2027">Winter 2027 (Oct 2027)</option>
                      </select>
                    </div>
                  </div>

                  {/* Target Field */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#4a4740] block mb-1">
                      Field of Study
                    </label>
                    <select
                      value={field}
                      onChange={(e) => setField(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#ded8cb] bg-white text-xs sm:text-sm text-[#16161a] focus:outline-none focus:border-[#16161a] focus:ring-1 focus:ring-[#16161a] transition-all cursor-pointer"
                    >
                      <option value="Computer Science / IT / AI">Computer Science / IT / AI / Data</option>
                      <option value="Mechanical / Automotive / Mechatronics">Mechanical / Automotive / Mechatronics</option>
                      <option value="Electrical / Embedded Systems">Electrical / Embedded Systems</option>
                      <option value="Management / Industrial Engineering">Management / Industrial Engineering</option>
                      <option value="Biotechnology / Life Sciences">Biotechnology / Life Sciences</option>
                      <option value="Bachelor's Program / Studienkolleg">Bachelor&apos;s Program / Studienkolleg</option>
                      <option value="Other">Other Field</option>
                    </select>
                  </div>

                  {/* Free vs Paid Dynamic Options */}
                  {isFree ? (
                    <div className="rounded-xl bg-[#ede7dc]/60 border border-[#ded8cb] px-3.5 py-2.5 text-xs text-[#4a4740] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2e7d46] shrink-0" />
                        <span className="text-[12px] leading-snug">
                          Free profile assessment &amp; English-taught public university options
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#2e7d46] bg-[#2e7d46]/10 px-2 py-0.5 rounded-full shrink-0">
                        100% Free
                      </span>
                    </div>
                  ) : (
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#4a4740] block mb-1.5">
                        Preferred Next Step
                      </label>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <button
                          type="button"
                          onClick={() => setPaymentPreference('online')}
                          className={`py-2 px-2 rounded-lg border font-bold text-xs transition-all cursor-pointer ${
                            paymentPreference === 'online'
                              ? 'bg-[#16161a] text-white border-[#16161a]'
                              : 'bg-white border-[#ded8cb] text-[#4a4740] hover:border-[#16161a]'
                          }`}
                        >
                          Instant UPI
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentPreference('emi')}
                          className={`py-2 px-2 rounded-lg border font-bold text-xs transition-all cursor-pointer ${
                            paymentPreference === 'emi'
                              ? 'bg-[#16161a] text-white border-[#16161a]'
                              : 'bg-white border-[#ded8cb] text-[#4a4740] hover:border-[#16161a]'
                          }`}
                        >
                          No-Cost EMI
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentPreference('counselor')}
                          className={`py-2 px-2 rounded-lg border font-bold text-xs transition-all cursor-pointer ${
                            paymentPreference === 'counselor'
                              ? 'bg-[#16161a] text-white border-[#16161a]'
                              : 'bg-white border-[#ded8cb] text-[#4a4740] hover:border-[#16161a]'
                          }`}
                        >
                          Counselor Call
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-[#9e2a2b] text-white hover:bg-[#852324] active:scale-[0.99] transition-all text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50 mt-2"
                  >
                    {isSubmitting ? (
                      <span>{isFree ? "Scheduling Your Session..." : "Reserving Your Seat..."}</span>
                    ) : (
                      <>
                        <span>{isFree ? "Schedule Free Consultation" : "Confirm Admission Plan Enrollment"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10.5px] text-center text-[#787369] pt-0.5 leading-tight">
                    🔒 Strict Privacy Guarantee · An EuropeBridge counsellor contacts you within 2 business hours.
                  </p>
                </form>
              </div>
            ) : (
              /* Success View */
              <div className="py-6 sm:py-8 text-center space-y-3.5">
                <div className="w-14 h-14 rounded-full bg-[#2e7d46]/15 text-[#2e7d46] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#16161a]">
                  {isFree ? "Consultation Booked!" : "Application Received!"}
                </h3>
                <p className="text-xs sm:text-sm text-[#5e5b54] max-w-sm mx-auto leading-relaxed">
                  {isFree ? (
                    <>
                      Thank you, <strong className="text-[#16161a]">{name}</strong>. An EuropeBridge Germany admissions counselor will message you on WhatsApp to confirm your 1-on-1 slot.
                    </>
                  ) : (
                    <>
                      Thank you, <strong className="text-[#16161a]">{name}</strong>. We have registered your enrollment for the <strong className="text-[#9e2a2b]">{selectedPlan}</strong>.
                    </>
                  )}
                </p>
                <div className="p-3.5 rounded-xl bg-[#faf8f3] border border-[#e5e0d3] text-left text-xs text-[#4a4740] space-y-2 max-w-sm mx-auto">
                  <div className="flex justify-between">
                    <span className="text-[#787369]">WhatsApp Confirmation:</span>
                    <strong className="text-[#16161a]">{phone}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#787369]">Target Intake:</span>
                    <strong className="text-[#16161a]">{intake}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#787369]">Counselor Status:</span>
                    <strong className="text-[#2e7d46]">{isFree ? "Assigned (Free Session)" : "Assigned (Onboarding Lead)"}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#16161a] text-white text-xs font-bold hover:bg-[#303038] transition-all cursor-pointer mt-3"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
