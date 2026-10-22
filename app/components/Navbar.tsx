"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, User, LayoutDashboard, LogOut } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { logout } from '@/lib/auth';
import { playfair } from './landing/fonts';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const isMobileOpen = useAppStore((state) => state.isMobileMenuOpen);
  const setIsMobileOpen = useAppStore((state) => state.setIsMobileMenuOpen);
  const toggleMobileOpen = useAppStore((state) => state.toggleMobileMenu);
  const user = useAppStore((state) => state.user);
  const checkAuth = useAppStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const initials = user
    ? `${user.firstName?.[0] || user.name?.[0] || user.email[0] || 'U'}${user.lastName?.[0] || ''}`.toUpperCase()
    : 'U';

  const displayName = user
    ? user.firstName || user.name?.split(' ')[0] || user.email.split('@')[0]
    : '';

  const dashboardRoute = user
    ? `/dashboard/${user.role === 'superadmin' ? 'super-admin' : (user.role || 'student')}`
    : '/dashboard/student';

  type NavItem = {
    label: string;
    href: string;
    dropdown?: string[];
    groups?: {
      title: string;
      items: { title: string; desc?: string; badge?: string; href?: string }[];
      action?: { label: string; href: string };
    }[];
    footerLink?: { label: string; href: string };
    customWidth?: string;
  };

  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    {
      label: "Study",
      href: "/#our-process",
      groups: [
        {
          title: "Am I eligible?",
          items: [
            { title: "Admission requirements", desc: "Grades, tests and documents", href: "/study/requirements" },
            { title: "APS verification", desc: "Required for India and China", href: "/study/aps" },
            { title: "Admission chance", desc: "See where you stand", href: "/tools/admission-chance" }
          ]
        },
        {
          title: "What will it cost?",
          items: [
            { title: "Cost of living", desc: "What a month really costs", href: "/study/cost-of-living" },
            { title: "Blocked account", desc: "Your proof of funds", href: "/services/blocked-account" },
            { title: "Scholarships", desc: "Funding you can actually get", href: "/study/scholarships" },
            { title: "Education loan", desc: "Financing the degree", href: "/services/education-loan" }
          ]
        },
        {
          title: "Getting the visa",
          items: [
            { title: "Student visa", desc: "Application to appointment", href: "/study/student-visa" },
            { title: "Motivation letter", desc: "The letter that gets you in", href: "/study/motivation-letter" },
            { title: "Health insurance", desc: "Cover from day one", href: "/study/health-insurance" }
          ]
        },
        {
          title: "The full path",
          items: [
            { title: "Master's guide", desc: "Everything, start to finish", href: "/study/masters" },
            { title: "Application process", desc: "Step by step, in order", href: "/study/application-process" },
            { title: "Life after the offer", desc: "Arriving, careers & Blue Card", href: "/study/life-after-offer" }
          ]
        }
      ]
    },
    {
      label: "Courses",
      href: "/courses"
    },
    {
      label: "Free tools",
      href: "/tools",
      groups: [
        {
          title: "Most used",
          items: [
            { 
              title: "German grade calculator", 
              desc: "Convert your grade to the German 1.0 to 4.0 scale in seconds.",
              href: "/tools/german-grade-calculator"
            }
          ],
          action: { label: "Open Grade Calculator", href: "/tools/german-grade-calculator" }
        },
        {
          title: "Study & Admissions",
          items: [
            { title: "German grade calculator", desc: "Bavarian formula", href: "/tools/german-grade-calculator" },
            { title: "ECTS credit calculator", desc: "Convert course credits", href: "/tools/ects-credit-calculator" },
            { title: "Admission chance", desc: "Profile evaluation", href: "/tools/admission-chance" }
          ]
        },
        {
          title: "Finance & Living",
          items: [
            { title: "Blocked account calculator", desc: "Official €992/mo rate", href: "/tools/blocked-account-calculator" },
            { title: "Cost of living estimator", desc: "City-by-city budgets", href: "/tools/cost-of-living-estimator" },
            { title: "Net salary & Blue Card", desc: "Take-home pay & visa", href: "/tools/net-salary-calculator" }
          ]
        },
        {
          title: "Career & Visa",
          items: [
            { title: "Net salary & Blue Card", desc: "2026 thresholds", href: "/tools/net-salary-calculator" },
            { title: "APS verification guide", desc: "Mandatory cert", href: "/study/aps" },
            { title: "Post-study work guide", desc: "18-month visa", href: "/study/life-after-offer" }
          ]
        }
      ],
      footerLink: { label: "Browse all tools →", href: "/tools" }
    },
    {
      label: "Services",
      href: "/#our-process",
      groups: [
        {
          title: "Before you apply",
          items: [
            { title: "University shortlisting", href: "/services/university-shortlisting" },
            { title: "dMAT + APS Fast-Track", desc: "Registration before the deadline, or full refund.", href: "/services/dmat-aps-fast-track" },
            { title: "SOP writing", href: "/services/sop-writing" },
            { title: "LOR writing", href: "/services/lor-writing" },
            { title: "CV and Lebenslauf", href: "/services/cv-preparation" }
          ]
        },
        {
          title: "Applying and visa",
          items: [
            { title: "Student visa", href: "/services/german-student-visa-application" },
            { title: "Motivation letter", href: "/services/letter-of-motivation-for-german-student-visa" },
            { title: "Cover letter", href: "/services/cover-letter" },
            { title: "Document bundle", href: "/services/document-preparation-bundle" }
          ]
        },
        {
          title: "After admission",
          items: [
            { title: "Blocked account", href: "/services/blocked-account" },
            { title: "Health insurance", href: "/services/health-insurance" },
            { title: "Education loan", href: "/services/education-loan" },
            { title: "Money transfer", href: "/services/outward-remittance" },
            { title: "DHL Express", href: "/services/dhl-express" }
          ]
        },
        {
          title: "Done with you",
          items: [
            { title: "Counselors run it end to end", desc: "From 29,999 INR, admission handled start to finish." }
          ],
          action: { label: "See all packages", href: "/#cta" }
        }
      ]
    },
    {
      label: "Our Brands",
      href: "/#language-school",
      customWidth: "w-[620px]",
      groups: [
        {
          title: "Eurolingo Academy",
          items: [
            { title: "German Language Batches", desc: "Live A1 to C1 training with native German instructors.", badge: "25% Off", href: "/#language-school" },
            { title: "Goethe & TestDaF Prep", desc: "Specialized exam crash courses & mock evaluations.", href: "/#language-school" }
          ],
          action: { label: "Explore classes", href: "/#language-school" }
        },
        {
          title: "Student Housing",
          items: [
            { title: "Verified Apartments & Shared Flats", desc: "Furnished student rooms in Berlin, Munich, Aachen & Hamburg.", href: "/#our-process" },
            { title: "Address Registration Assistance", desc: "City address registration & lease agreement support.", href: "/#our-process" }
          ],
          action: { label: "Find housing", href: "/#our-process" }
        },
        {
          title: "Health Insurance",
          items: [
            { title: "Statutory Health Cover", desc: "Official TK & Barmer public health insurance for student visas.", href: "/#our-process" },
            { title: "Travel & Incoming Cover", desc: "Initial coverage before official university semester start.", href: "/#our-process" }
          ],
          action: { label: "Get insurance", href: "/#our-process" }
        }
      ],
      footerLink: { label: "Explore exclusive partner benefits & discounts", href: "/#language-school" }
    },
    { label: "Pricing", href: "/pricing" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 sm:px-8 lg:px-12 flex justify-between items-center transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-[#F4F1EA]/95 backdrop-blur-md border-b border-[#E2DDD3]/90 shadow-[0_4px_16px_rgba(210,205,195,0.35)]' 
        : 'py-3.5 sm:py-4 bg-[#F4F1EA]/55 backdrop-blur-md border-b border-[#E2DDD3]/40'
    }`}>
      {/* Left: Logo */}
      <div className="flex-1">
        <Link href="/" className="no-underline inline-flex items-center gap-2.5 group" aria-label="EuropeBridge Home">
          <span aria-hidden className="flex h-[18px] w-[5px] flex-col overflow-hidden rounded-[1px]">
            <span className="flex-1 bg-[#0d0d0f]" />
            <span className="flex-1 bg-[#e63946]" />
            <span className="flex-1 bg-[#c9a35b]" />
          </span>
          <span
            className={`text-[24px] leading-none tracking-[-0.01em] text-[#16161a] ${playfair.className}`}
          >
            Europe<span className="italic font-normal">Bridge</span>
          </span>
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div className="hidden lg:flex gap-1 xl:gap-2 items-center justify-center">
        {navItems.map((item, index) => (
          (item.dropdown || item.groups) ? (
            <div key={index} className="relative flex items-center group cursor-pointer h-full">
              <Link 
                href={item.href} 
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-gray-700 font-bold text-sm lg:text-[15px] transition-all hover:bg-black/[0.04] hover:text-germany-red"
              >
                <span>{item.label}</span>
                <ChevronDown size={14} className="text-gray-400 group-hover:text-germany-red transition-transform duration-200 group-hover:rotate-180" />
              </Link>
              <div className={`absolute top-full left-1/2 -translate-x-1/2 neu-card opacity-0 invisible translate-y-3 transition-all duration-300 mt-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-50 ${item.groups ? (item.customWidth || 'w-[800px]') + ' p-6' : 'min-w-[200px] py-3'}`}>
                {item.groups ? (
                  <div>
                    <div className={`grid ${item.groups.length === 3 ? 'grid-cols-3' : 'grid-cols-4'} gap-6`}>
                      {item.groups.map((group, gIndex) => (
                        <div key={gIndex}>
                          <h4 className="text-sm font-extrabold text-germany-black mb-3 border-b border-gray-100 pb-2">{group.title}</h4>
                          <div className="flex flex-col gap-4">
                            {group.items.map((gItem, gItemIndex) => (
                              <Link key={gItemIndex} href={gItem.href || item.href || "/#free-tools"} className="block group/link">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-sm font-bold text-gray-700 transition-colors group-hover/link:text-germany-red">{gItem.title}</span>
                                  {gItem.badge && (
                                    <span className="text-[9px] font-extrabold text-germany-red bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                                      {gItem.badge}
                                    </span>
                                  )}
                                </div>
                                {gItem.desc && <div className="text-[11px] text-gray-500 font-semibold leading-snug mt-0.5">{gItem.desc}</div>}
                              </Link>
                            ))}
                            {group.action && (
                              <Link href={group.action.href} className="text-xs font-bold text-germany-red hover:underline flex items-center gap-1 -mt-1">
                                {group.action.label} &rarr;
                              </Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {item.footerLink && (
                      <div className="mt-5 pt-4 border-t border-gray-100 text-center">
                        <Link href={item.footerLink.href} className="text-sm font-bold text-germany-red hover:underline inline-flex items-center gap-1">
                          {item.footerLink.label} &rarr;
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  item.dropdown?.map((dropItem, dIndex) => (
                    <Link key={dIndex} href="/#free-tools" className="block px-5 py-2 text-gray-600 font-bold transition-all duration-200 hover:text-germany-red hover:pl-7">
                      {dropItem}
                    </Link>
                  ))
                )}
              </div>
            </div>
          ) : (
            <Link 
              key={index} 
              href={item.href} 
              className="px-3.5 py-2 rounded-xl text-gray-700 font-bold text-sm lg:text-[15px] transition-all hover:bg-black/[0.04] hover:text-germany-red"
            >
              {item.label}
            </Link>
          )
        ))}
      </div>

      {/* Right: Auth & Primary Action */}
      <div className="hidden lg:flex flex-1 justify-end items-center gap-3">
        {user ? (
          <div className="relative group">
            <Link
              href={dashboardRoute}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-gray-200/90 shadow-[2px_2px_8px_rgba(210,205,195,0.4)] hover:shadow-md transition-all group-hover:border-germany-red/40"
              title="Go to Dashboard"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-germany-red to-rose-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {initials}
              </div>
              <span className="text-xs font-bold text-gray-800 max-w-[110px] truncate">
                {displayName}
              </span>
              <ChevronDown size={13} className="text-gray-400 group-hover:text-germany-red transition-colors" />
            </Link>

            {/* Dropdown Menu on hover/focus */}
            <div className="absolute right-0 top-full mt-2 w-56 neu-card bg-white p-3 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="px-3 py-2 border-b border-gray-100">
                <div className="font-bold text-sm text-germany-black truncate">
                  {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : (user.name || displayName)}
                </div>
                <div className="text-[11px] text-gray-500 truncate">{user.email}</div>
                <span className="inline-block mt-1 text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                  {user.role || 'Student'}
                </span>
              </div>
              <div className="py-1">
                <Link
                  href={dashboardRoute}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-700 hover:text-germany-red hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <LayoutDashboard size={14} />
                  <span>My Dashboard</span>
                </Link>
              </div>
              <div className="pt-1 border-t border-gray-100">
                <button
                  onClick={() => logout()}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Link href="/login" className="px-3.5 py-2 text-sm font-bold text-gray-700 hover:text-germany-red hover:bg-black/[0.04] rounded-xl transition-all whitespace-nowrap">
            Login
          </Link>
        )}
        <Link href="/#hero" className="neu-btn-primary px-6 py-2.5 text-sm font-extrabold tracking-wide cursor-pointer inline-flex items-center justify-center whitespace-nowrap shadow-md hover:shadow-lg transition-all">
          Consult Now
        </Link>
      </div>

      <div className="lg:hidden flex-1 flex justify-end">
        <button className="neu-btn p-2.5 text-gray-600 border-none cursor-pointer" onClick={toggleMobileOpen}>
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[110%] left-4 right-4 neu-card p-5 z-40 overflow-hidden md:hidden max-h-[80vh] overflow-y-auto"
          >
            {navItems.map((item, index) => (
              <div key={index} className="mb-3">
                <Link href={item.href} onClick={() => setIsMobileOpen(false)} className="block text-lg font-bold text-gray-700 no-underline hover:text-germany-red pb-2 border-b border-gray-300/50">
                  {item.label}
                </Link>
                {item.dropdown && (
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    {item.dropdown.map((dropItem, dIndex) => (
                      <Link key={dIndex} href="/#free-tools" onClick={() => setIsMobileOpen(false)} className="text-gray-500 font-semibold hover:text-germany-red">
                        {dropItem}
                      </Link>
                    ))}
                  </div>
                )}
                {item.groups && (
                  <div className="ml-4 mt-3 flex flex-col gap-5">
                    {item.groups.map((group, gIndex) => (
                      <div key={gIndex}>
                        <h4 className="text-sm font-extrabold text-germany-black mb-2">{group.title}</h4>
                        <div className="flex flex-col gap-3 pl-3 border-l-2 border-gray-100">
                          {group.items.map((gItem, gItemIndex) => (
                            <Link key={gItemIndex} href={gItem.href || item.href || "/#free-tools"} onClick={() => setIsMobileOpen(false)} className="block group/link">
                              <div className="text-sm font-bold text-gray-700 hover:text-germany-red">{gItem.title}</div>
                              {gItem.desc && <div className="text-[11px] text-gray-500 mt-0.5">{gItem.desc}</div>}
                            </Link>
                          ))}
                          {group.action && (
                            <Link href={group.action.href} onClick={() => setIsMobileOpen(false)} className="text-xs font-bold text-germany-red hover:underline flex items-center gap-1">
                              {group.action.label} &rarr;
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                    {item.footerLink && (
                      <div className="mt-2 pt-3 border-t border-gray-100 text-center">
                        <Link href={item.footerLink.href} onClick={() => setIsMobileOpen(false)} className="text-sm font-bold text-germany-red hover:underline inline-flex items-center gap-1">
                          {item.footerLink.label} &rarr;
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className="mt-6 flex flex-col gap-3 border-t border-gray-300/50 pt-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-germany-red text-white flex items-center justify-center font-bold text-sm shadow-sm">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-gray-800 truncate">
                        {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : (user.name || displayName)}
                      </div>
                      <div className="text-xs text-gray-500 truncate">{user.email}</div>
                    </div>
                  </div>
                  <Link
                    href={dashboardRoute}
                    onClick={() => setIsMobileOpen(false)}
                    className="neu-btn px-4 py-2.5 w-full text-center font-bold text-sm text-gray-800 flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard size={16} />
                    <span>Go to Dashboard</span>
                  </Link>
                  <button
                    onClick={() => { setIsMobileOpen(false); logout(); }}
                    className="px-4 py-1.5 text-xs font-bold text-red-600 hover:underline text-center"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsMobileOpen(false)} className="block text-base font-semibold text-gray-700 hover:text-germany-red text-center py-1">
                  Login
                </Link>
              )}
              <Link href="/#hero" onClick={() => setIsMobileOpen(false)} className="neu-btn-primary px-5 py-2.5 w-full cursor-pointer text-center font-semibold text-sm">
                Consult Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
