"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { signup, googleAuth } from '@/lib/auth';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // fire off the signup request
      await signup(firstName, lastName, email, password);
      
      // we could log them straight in, but sending them to the login page is safer and simpler for now
      router.push('/login');
    } catch (err: any) {
      // just echo whatever the backend complained about
      setError(err.message || 'Signup failed. Please try again.');
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
      if (data.user.role === 'student') {
        router.push('/dashboard/student');
      } else {
        const targetDashboard = data.user.role === 'superadmin' ? 'super-admin' : data.user.role;
        router.push(`/dashboard/${targetDashboard}`);
      }
    } catch (err: any) {
      setError(err.message || 'Google signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center neu-bg px-4 py-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-germany-red/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-germany-gold/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Back to Home Link */}
      <div className="max-w-md w-full mb-6 flex items-center justify-between z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-germany-red transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link href="/" className="inline-flex items-center gap-2 font-display text-xl text-germany-black">
          <img src="/doodles/happy.png" alt="Logo" className="w-8 h-8 object-contain" />
          <span>Europe<span className="text-germany-red">Bridge</span></span>
        </Link>
      </div>

      {/* Main Signup Card */}
      <div className="max-w-md w-full bg-white neu-card p-8 relative z-10 overflow-hidden shadow-[12px_12px_30px_rgba(210,205,195,0.6)]">
        {/* Tricolor Header Strip */}
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="text-center mt-2 mb-6">
          <h1 className="text-3xl font-display text-germany-black">Create Account</h1>
          <p className="text-gray-500 font-bold text-xs mt-1">Start your German education journey today</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border-2 border-germany-red text-red-700 px-4 py-2.5 rounded-xl font-bold text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-extrabold text-germany-black mb-1 ml-1">First Name</label>
              <input 
                type="text" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                required 
                placeholder="First Name" 
                className="w-full px-4 py-2.5 neu-input font-bold text-germany-black text-sm placeholder-gray-400" 
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-germany-black mb-1 ml-1">Last Name</label>
              <input 
                type="text" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                required 
                placeholder="Last Name" 
                className="w-full px-4 py-2.5 neu-input font-bold text-germany-black text-sm placeholder-gray-400" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-germany-black mb-1 ml-1">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="you@example.com" 
              className="w-full px-4 py-2.5 neu-input font-bold text-germany-black text-sm placeholder-gray-400" 
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-germany-black mb-1 ml-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="••••••••" 
              className="w-full px-4 py-2.5 neu-input font-bold text-germany-black text-sm placeholder-gray-400" 
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-germany-black mb-1 ml-1">Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              placeholder="••••••••" 
              className="w-full px-4 py-2.5 neu-input font-bold text-germany-black text-sm placeholder-gray-400" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full neu-btn-primary py-3 px-4 font-bold text-base cursor-pointer flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            <span>{loading ? 'Creating Account...' : 'Register'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center text-xs font-bold"><span className="px-3 bg-white text-gray-400">Or continue with</span></div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-center w-full [&>div]:w-full [&>div]:flex [&>div]:justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google Signup Failed')}
              theme="outline"
              size="large"
              width="100%"
              text="continue_with"
            />
          </div>
        </div>

        <p className="text-center text-xs font-bold text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-germany-red font-extrabold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
