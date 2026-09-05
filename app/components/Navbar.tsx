"use client";
import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const Navbar = () => {
  const isMobileOpen = useAppStore((state) => state.isMobileMenuOpen);
  const setIsMobileOpen = useAppStore((state) => state.setIsMobileMenuOpen);
  const toggleMobileOpen = useAppStore((state) => state.toggleMobileMenu);

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
            { title: "Student visa", desc: "Application to appointment" },
            { title: "Motivation letter", desc: "The letter that gets you in" },
            { title: "Health insurance", desc: "Cover from day one" }
          ]
        },
        {
          title: "The full path",
          items: [
            { title: "Master's guide", desc: "Everything, start to finish" },
            { title: "Application process", desc: "Step by step, in order", href: "/study/application-process" },
            { title: "Life after the offer", desc: "Arriving and settling in" }
          ]
        }
      ]
    },
    {
      label: "Courses",
      href: "/#free-tools",
      dropdown: ["MS in CS", "MS in Data Science", "MBA", "Engineering"]
    },
    {
      label: "Free tools",
      href: "/#free-tools",
      groups: [
        {
          title: "Most used",
          items: [
            { title: "German grade calculator", desc: "Convert your grade to the German 1.0 to 4.0 scale in seconds." }
          ],
          action: { label: "Open the calculator", href: "/#hero" }
        },
        {
          title: "Check yourself",
          items: [
            { title: "Admission chance" },
            { title: "APS eligibility quiz" },
            { title: "Anabin uni checker" }
          ]
        },
        {
          title: "Money",
          items: [
            { title: "Blocked account calculator", href: "/services/blocked-account" },
            { title: "Cost of living estimator", href: "/study/cost-of-living" },
            { title: "Loan EMI calculator" }
          ]
        },
        {
          title: "Apply",
          items: [
            { title: "ECTS credit calculator" },
            { title: "Uni-Assist VPD cost" },
            { title: "Course finder" }
          ]
        }
      ],
      footerLink: { label: "All free tools", href: "/#free-tools" }
    },
    {
      label: "Services",
      href: "/#our-process",
      groups: [
        {
          title: "Before you apply",
          items: [
            { title: "University shortlisting" },
            { title: "dMAT + APS Fast-Track", desc: "Registration before the deadline, or full refund." },
            { title: "SOP writing" },
            { title: "LOR writing" },
            { title: "CV and Lebenslauf" }
          ]
        },
        {
          title: "Applying and visa",
          items: [
            { title: "Student visa" },
            { title: "Motivation letter" },
            { title: "Cover letter" },
            { title: "Document bundle" }
          ]
        },
        {
          title: "After admission",
          items: [
            { title: "Blocked account", href: "/services/blocked-account" },
            { title: "Health insurance" },
            { title: "Education loan", href: "/services/education-loan" },
            { title: "Money transfer" },
            { title: "DHL Express" }
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
            { title: "Verified Apartments & WGs", desc: "Furnished student rooms in Berlin, Munich, Aachen & Hamburg.", href: "/#our-process" },
            { title: "Anmeldung Assistance", desc: "City address registration & lease agreement support.", href: "/#our-process" }
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
    { label: "Pricing", href: "/#cta" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-8 py-3 flex justify-between items-center neu-bg transition-all duration-300">
      {/* Left: Logo */}
      <div className="flex-1">
        <Link href="/" className="font-display text-lg lg:text-xl text-germany-black no-underline inline-flex items-center gap-2 drop-shadow-sm tracking-wide">
          <motion.img
            src="/doodles/happy.png"
            alt="Europe Bridge Logo"
            className="w-9 h-9 lg:w-10 lg:h-10 object-contain drop-shadow-md"
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <span>Europe <span className="text-germany-red">Bridge</span></span>
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div className="hidden lg:flex gap-5 lg:gap-7 items-center justify-center">
        {navItems.map((item, index) => (
          (item.dropdown || item.groups) ? (
            <div key={index} className="relative flex items-center gap-1 group cursor-pointer h-full">
              <Link href={item.href} className="text-gray-700 font-semibold text-sm lg:text-[15px] transition-colors group-hover:text-germany-red">
                {item.label}
              </Link>
              <ChevronDown size={14} className="text-gray-400 group-hover:text-germany-red transition-colors" />
              <div className={`absolute top-full left-1/2 -translate-x-1/2 neu-card opacity-0 invisible translate-y-4 transition-all duration-300 mt-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-50 ${item.groups ? (item.customWidth || 'w-[800px]') + ' p-6' : 'min-w-[200px] py-3'}`}>
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
            <Link key={index} href={item.href} className="text-gray-700 font-semibold text-sm lg:text-[15px] transition-colors hover:text-germany-red">
              {item.label}
            </Link>
          )
        ))}
      </div>

      {/* Right: Auth & Primary Action */}
      <div className="hidden lg:flex flex-1 justify-end items-center gap-5">
        <Link href="/login" className="text-gray-700 font-semibold text-sm hover:text-germany-red transition-colors whitespace-nowrap">
          Login
        </Link>
        <Link href="/#hero" className="neu-btn-primary px-5 py-2 text-sm tracking-wide cursor-pointer inline-flex items-center justify-center whitespace-nowrap font-semibold">
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
              <Link href="/login" onClick={() => setIsMobileOpen(false)} className="block text-base font-semibold text-gray-700 hover:text-germany-red text-center py-1">
                Login
              </Link>
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
