"use client";
import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Youtube = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-[#111111] bg-germany-black text-white pt-20 pb-10 px-4 relative z-20 border-t-4 border-germany-red">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <img src="/doodles/university.png" alt="EuropeBridge Mascot" className="w-14 h-14 object-contain drop-shadow-md" />
              <h2 className="font-display text-3xl text-white">
                Europe<span className="text-germany-red">Bridge</span>
              </h2>
            </Link>
            <p className="text-gray-400 font-bold text-sm leading-relaxed max-w-xs">
              The AI-first operating system for study-abroad admissions, visa processing, and career consulting in Germany.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-germany-red transition-colors"><Instagram className="w-5 h-5 text-white" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-germany-red transition-colors"><Linkedin className="w-5 h-5 text-white" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-germany-red transition-colors"><Youtube className="w-5 h-5 text-white" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-germany-red transition-colors"><Twitter className="w-5 h-5 text-white" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-display text-xl text-white">Platform</h3>
            <ul className="space-y-3 font-bold text-sm text-gray-400">
              <li><Link href="/#free-tools" className="hover:text-germany-gold transition-colors">University Matcher</Link></li>
              <li><Link href="/#free-tools" className="hover:text-germany-gold transition-colors">AI SOP Builder</Link></li>
              <li><Link href="/#free-tools" className="hover:text-germany-gold transition-colors">APS Tracker</Link></li>
              <li><Link href="/#free-tools" className="hover:text-germany-gold transition-colors">Visa Checklist</Link></li>
              <li><Link href="/#free-tools" className="hover:text-germany-gold transition-colors">Blocked Account Setup</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h3 className="font-display text-xl text-white">Company</h3>
            <ul className="space-y-3 font-bold text-sm text-gray-400">
              <li><Link href="/#about" className="hover:text-germany-gold transition-colors">About Us</Link></li>
              <li><Link href="/#testimonials" className="hover:text-germany-gold transition-colors">Student Stories</Link></li>
              <li><Link href="/#cta" className="hover:text-germany-gold transition-colors">Pricing Tiers</Link></li>
              <li><Link href="/login" className="hover:text-germany-gold transition-colors">Student Portal</Link></li>
              <li><Link href="/#faq" className="hover:text-germany-gold transition-colors">FAQ & Support</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-display text-xl text-white">Get in Touch</h3>
            <ul className="space-y-4 font-bold text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-germany-red shrink-0" />
                <span>Friedrichstraße 123<br/>10117 Berlin, Germany</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-germany-red shrink-0" />
                <span>hello@europebridge.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-germany-red shrink-0" />
                <span>+49 (0) 30 1234 5678</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-gray-500">
          <p>© {new Date().getFullYear()} EuropeBridge GmbH. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/#about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/#about" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/#about" className="hover:text-white transition-colors">Imprint</Link>
          </div>
        </div>

      </div>
      
      {/* Decorative Tricolor Strip at the absolute bottom */}
      <div className="absolute bottom-0 left-0 w-full h-2 flex">
        <div className="flex-1 bg-[#111111]"></div>
        <div className="flex-1 bg-germany-red"></div>
        <div className="flex-1 bg-germany-gold"></div>
      </div>
    </footer>
  );
};

export default Footer;
