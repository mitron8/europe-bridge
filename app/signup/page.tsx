'use client';
import Link from 'next/link';
import { useState } from 'react';
import { signup } from '@/lib/auth';
import { useRouter } from 'next/navigation';

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
      // First register the user
      await signup(firstName, lastName, email, password);
      
      // Auto-redirect to login with a success message, or directly login. 
      // We will redirect to login for simplicity.
      router.push('/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-black p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black">Sign Up</h1>
          <p className="text-black mt-2">Create an account for EuropeBridge</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSignup}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">First Name</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required placeholder="First Name" className="w-full border border-black p-2 rounded focus:ring-black focus:border-black bg-white text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Last Name</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required placeholder="Last Name" className="w-full border border-black p-2 rounded focus:ring-black focus:border-black bg-white text-black" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" className="w-full border border-black p-2 rounded focus:ring-black focus:border-black bg-white text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" className="w-full border border-black p-2 rounded focus:ring-black focus:border-black bg-white text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Confirm Password" className="w-full border border-black p-2 rounded focus:ring-black focus:border-black bg-white text-black" />
          </div>
          
          <button className="px-4 py-2 rounded bg-black text-white font-medium w-full"  disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-sm text-black mt-6">
          Already have an account? <Link href="/login" className="text-black font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
