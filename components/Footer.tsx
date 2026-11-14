
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="p-8 bg-[#111111] text-white border-t border-white/10 mt-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <Link href="/" className="inline-block mb-3">
            <Image
              src="/logo-white.png"
              alt="EuropeBridge"
              width={160}
              height={28}
              className="h-6 w-auto object-contain"
            />
          </Link>
          <p className="text-sm text-gray-400">AI-powered Germany education and relocation platform.</p>
        </div>
        <div>
          <h3 className="font-bold mb-2 text-white">Services</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>University Matching</li>
            <li>Visa Assistance</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2 text-white">Resources</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>Blog</li>
            <li>Tools</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2 text-white">Legal</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
