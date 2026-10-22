"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  AlertCircle 
} from 'lucide-react';
import { login, googleAuth } from '@/lib/auth';
import { GoogleLogin } from '@react-oauth/google';
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(email, password);
      const redirectUrl = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('redirect') : null;
      if (redirectUrl && redirectUrl.startsWith('/')) {
        router.push(redirectUrl);
      } else if (data.user.role === 'student') {
        router.push('/dashboard/student');
      } else {
        const targetDashboard = data.user.role === 'superadmin' ? 'super-admin' : data.user.role;
        router.push(`/dashboard/${targetDashboard}`);
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (!credentialResponse.credential) return;
    
    setError('');
    setLoading(true);
    
    try {
      const data = await googleAuth(credentialResponse.credential);
      const redirectUrl = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('redirect') : null;
      if (redirectUrl && redirectUrl.startsWith('/')) {
        router.push(redirectUrl);
      } else if (data.user.role === 'student') {
        router.push('/dashboard/student');
      } else {
        const targetDashboard = data.user.role === 'superadmin' ? 'super-admin' : data.user.role;
        router.push(`/dashboard/${targetDashboard}`);
      }
    } catch (err: any) {
      setError(err.message || 'Google authentication failed.');
    } finally {
      setLoading(false);
    }
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
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold text-[#5e5b54] hover:text-[#9e2a2b] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <Link href="/" className="inline-flex items-center gap-2 group" aria-label="EuropeBridge Home">
          <span aria-hidden className="flex h-4 w-1 flex-col overflow-hidden rounded-[1px]">
            <span className="flex-1 bg-[#16161a]" />
            <span className="flex-1 bg-[#9e2a2b]" />
            <span className="flex-1 bg-[#d4af37]" />
          </span>
          <span className="text-lg font-serif font-bold text-[#16161a] tracking-tight">
            Europe<span className="text-[#9e2a2b]">Bridge</span>
          </span>
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="max-w-md w-full mx-auto my-auto relative z-10">
        <div className="bg-white rounded-3xl border border-[#e5e0d3] p-7 sm:p-9 shadow-[0_20px_50px_rgba(22,22,26,0.06)] relative overflow-hidden">
          
          {/* Subtle German Tricolor Accent Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1.5 flex">
            <div className="flex-1 bg-[#16161a]" />
            <div className="flex-1 bg-[#9e2a2b]" />
            <div className="flex-1 bg-[#d4af37]" />
          </div>

          {/* Heading */}
          <div className="text-center mt-2 mb-7">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#16161a]">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-[13px] text-[#5e5b54] mt-1.5 font-medium">
              Sign in to manage your German university applications
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-[#9e2a2b] px-4 py-3 rounded-2xl text-xs font-semibold flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#9e2a2b]" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
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

            {/* Password Field with Visibility Toggle */}
            <div>
              <div className="flex justify-between items-center mb-1.5 ml-0.5">
                <label className="text-xs font-bold text-[#4a4740]">
                  Password
                </label>
                <Link 
                  href="#" 
                  className="text-[11px] font-bold text-[#9e2a2b] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#787369] absolute left-3.5 top-3.5 pointer-events-none" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password" 
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-[#dcd7cb] bg-[#faf8f3] focus:bg-white focus:border-[#16161a] focus:outline-none text-xs sm:text-sm text-[#16161a] font-medium placeholder-[#9a958c] transition-all" 
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3.5 top-3 text-[#787369] hover:text-[#16161a] transition-colors cursor-pointer p-0.5"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center text-xs font-medium text-[#5e5b54] pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#dcd7cb] text-[#9e2a2b] focus:ring-0 focus:ring-offset-0 cursor-pointer w-3.5 h-3.5" 
                />
                <span>Remember this device</span>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#16161a] hover:bg-[#2b2b31] text-white font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer mt-4 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#ece7dd]" />
            </div>
            <div className="relative flex justify-center text-xs font-semibold">
              <span className="px-3 bg-white text-[#9a958c]">Or continue with</span>
            </div>
          </div>

          {/* Google Login */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-center w-full [&>div]:w-full [&>div]:flex [&>div]:justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google Login Failed')}
                theme="outline"
                size="large"
                width="100%"
                text="signin_with"
                shape="pill"
              />
            </div>
          </div>

          {/* Register Prompt */}
          <p className="text-center text-xs font-semibold text-[#5e5b54] mt-6 pt-2 border-t border-[#f4f1ea]">
            Don&apos;t have an account yet?{' '}
            <Link href="/signup" className="text-[#9e2a2b] font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        {/* Security Assurance */}
        <div className="mt-5 text-center flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#787369]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2e7d46]" />
          <span>256-bit bank-grade SSL encrypted connection</span>
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
