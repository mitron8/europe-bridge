"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Mail, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    setLoading(true);
    // Simulate recovery dispatch
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between bg-[#f4f1ea] text-[#16161a] selection:bg-[#e63946] selection:text-white px-4 py-8 sm:py-12 relative overflow-hidden lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
      {/* Ambient background glows */}
      <div 
        aria-hidden 
        className="pointer-events-none absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#e63946]/10 to-transparent blur-3xl select-none" 
      />
      <div 
        aria-hidden 
        className="pointer-events-none absolute -bottom-32 -right-20 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-[#c9a35b]/15 to-transparent blur-3xl select-none" 
      />

      {/* Top Bar */}
      <header className="max-w-md w-full mx-auto flex items-center justify-between relative z-10 mb-6">
        <Link 
          href="/login" 
          className="inline-flex items-center gap-2 text-xs font-bold text-[#5e5b54] hover:text-[#9e2a2b] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </Link>

        <Link href="/" className="inline-flex items-center gap-2 group" aria-label="EuropeBridge Home">
          <span aria-hidden className="flex h-[18px] w-[5px] flex-col overflow-hidden rounded-[1px] shadow-sm">
            <span className="flex-1 bg-[#16161a]" />
            <span className="flex-1 bg-[#e63946]" />
            <span className="flex-1 bg-[#c9a35b]" />
          </span>
          <span className={`lp-serif text-[22px] leading-none tracking-[-0.01em] text-[#16161a]`}>
            Europe<span className="italic font-normal">Bridge</span>
          </span>
        </Link>
      </header>

      {/* Main Card */}
      <main className="max-w-md w-full mx-auto relative z-10 my-auto">
        <div className="bg-white rounded-3xl border border-[#e5e0d3] p-7 sm:p-9 shadow-[0_12px_36px_rgba(22,22,26,0.06)] relative overflow-hidden">
          {/* Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#16161a] via-[#e63946] to-[#c9a35b]" />

          {submitted ? (
            <div className="text-center space-y-5 py-3">
              <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 text-green-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h1 className="lp-serif text-2xl font-bold text-[#16161a]">
                  Check your inbox
                </h1>
                <p className="text-xs sm:text-sm text-[#5e5b54] leading-relaxed">
                  We sent password reset instructions to: <br />
                  <strong className="text-[#16161a] font-semibold">{email}</strong>
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#faf8f3] border border-[#e5e0d3] text-xs text-[#5e5b54] text-left leading-relaxed">
                If an account exists under this email address, you will receive a secure link to reset your credentials. The link expires in 30 minutes.
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="w-full py-2.5 text-xs font-bold text-[#5e5b54] hover:text-[#16161a] transition-colors"
                >
                  Didn&apos;t receive the email? Try again
                </button>
                <Link
                  href="/login"
                  className="w-full py-3 px-4 rounded-xl bg-[#16161a] hover:bg-[#2b2b31] text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Return to Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-6">
                <h1 className="lp-serif text-2xl sm:text-3xl font-bold text-[#16161a] tracking-tight">
                  Reset Password
                </h1>
                <p className="text-xs sm:text-sm text-[#5e5b54] font-medium mt-1.5">
                  Enter your registered student email address to receive a password reset link.
                </p>
              </div>

              {error && (
                <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#4a4740] mb-1.5 ml-0.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#787369] absolute left-3.5 top-3.5 pointer-events-none" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com" 
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#dcd7cb] bg-[#faf8f3] focus:bg-white focus:border-[#16161a] focus:outline-none text-xs sm:text-sm text-[#16161a] font-medium placeholder-[#9a958c] transition-all" 
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#16161a] hover:bg-[#2b2b31] text-white font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer mt-4 disabled:opacity-50"
                >
                  <span>{loading ? 'Sending Recovery Link...' : 'Send Reset Link'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-[#f4f1ea] text-center">
                <p className="text-xs font-semibold text-[#5e5b54]">
                  Remembered your password?{' '}
                  <Link href="/login" className="text-[#9e2a2b] font-bold hover:underline">
                    Back to Sign In
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Security Assurance */}
        <div className="mt-5 text-center flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#787369]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2e7d46]" />
          <span>256-bit bank-grade SSL encrypted recovery</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-md w-full mx-auto text-center mt-6 relative z-10">
        <p className="text-[11px] text-[#787369]">
          &copy; {new Date().getFullYear()} EuropeBridge Education Services. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
