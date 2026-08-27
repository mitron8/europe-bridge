"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  type NavItem = {
    label: string;
    href: string;
    dropdown?: string[];
    groups?: { 
      title: string; 
      items: { title: string; desc?: string }[];
      action?: { label: string; href: string };
    }[];
    footerLink?: { label: string; href: string };
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
            { title: "Admission requirements", desc: "Grades, tests and documents" },
            { title: "APS verification", desc: "Required for India and China" },
            { title: "Admission chance", desc: "See where you stand" }
          ]
        },
        {
          title: "What will it cost?",
          items: [
            { title: "Cost of living", desc: "What a month really costs" },
            { title: "Blocked account", desc: "Your proof of funds" },
            { title: "Scholarships", desc: "Funding you can actually get" },
            { title: "Education loan", desc: "Financing the degree" }
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
            { title: "Application process", desc: "Step by step, in order" },
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
            { title: "Blocked account calculator" },
            { title: "Cost of living estimator" },
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
            { title: "Blocked account" },
            { title: "Health insurance" },
            { title: "Education loan" },
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
    { label: "Pricing", href: "/#cta" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-8 py-4 flex justify-between items-center neu-bg transition-all duration-300">
      {/* Left: Logo */}
      <div className="flex-1">
        <Link href="/" className="font-display text-2xl lg:text-3xl text-germany-black no-underline inline-flex items-center drop-shadow-sm tracking-wide">
          <motion.img 
            src="/doodles/happy.png" 
            alt="Europe Bridge Logo" 
            className="w-14 h-14 lg:w-16 lg:h-16 object-contain drop-shadow-md"
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <span>Europe <span className="text-germany-red">Bridge</span></span>
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div className="hidden lg:flex gap-4 lg:gap-6 items-center justify-center">
        {navItems.map((item, index) => (
          (item.dropdown || item.groups) ? (
            <div key={index} className="relative flex items-center gap-1 group cursor-pointer h-full">
              <Link href={item.href} className="text-gray-600 font-bold text-sm lg:text-base transition-colors group-hover:text-germany-red">
                {item.label}
              </Link>
              <ChevronDown size={14} className="text-gray-400 group-hover:text-germany-red transition-colors" />
              <div className={`absolute top-full left-1/2 -translate-x-1/2 neu-card opacity-0 invisible translate-y-4 transition-all duration-300 mt-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-50 ${item.groups ? 'w-[800px] p-6' : 'min-w-[200px] py-3'}`}>
                {item.groups ? (
                  <div>
                    <div className="grid grid-cols-4 gap-6">
                      {item.groups.map((group, gIndex) => (
                        <div key={gIndex}>
                          <h4 className="text-sm font-extrabold text-germany-black mb-3 border-b border-gray-100 pb-2">{group.title}</h4>
                          <div className="flex flex-col gap-4">
                            {group.items.map((gItem, gItemIndex) => (
                              <Link key={gItemIndex} href={item.href || "/#free-tools"} className="block group/link">
                                <div className="text-sm font-bold text-gray-700 transition-colors group-hover/link:text-germany-red">{gItem.title}</div>
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
            <Link key={index} href={item.href} className="text-gray-600 font-bold text-sm lg:text-base transition-colors hover:text-germany-red">
              {item.label}
            </Link>
          )
        ))}
      </div>
      
      {/* Right: Auth Links */}
      <div className="hidden lg:flex flex-1 justify-end items-center gap-4">
        <Link href="/login" className="text-gray-600 font-bold text-[0.95rem] hover:text-germany-red transition-colors whitespace-nowrap">
          Login
        </Link>
        <Link href="/login" className="neu-btn px-5 py-2.5 font-bold text-germany-black text-[0.95rem] hover:text-germany-red transition-colors whitespace-nowrap">
          Sign Up
        </Link>
        <Link href="/#cta" className="neu-btn-primary px-6 py-2.5 text-[0.95rem] tracking-wide cursor-pointer hidden xl:inline-flex items-center justify-center whitespace-nowrap">
          Consult Now
        </Link>
      </div>

      <div className="lg:hidden flex-1 flex justify-end">
        <button className="neu-btn p-2.5 text-gray-600 border-none cursor-pointer" onClick={() => setIsMobileOpen(!isMobileOpen)}>
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
                            <Link key={gItemIndex} href={item.href || "/#free-tools"} onClick={() => setIsMobileOpen(false)} className="block group/link">
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
              <Link href="/login" onClick={() => setIsMobileOpen(false)} className="block text-lg font-bold text-gray-700 hover:text-germany-red text-center">
                Login
              </Link>
              <Link href="/login" onClick={() => setIsMobileOpen(false)} className="neu-btn px-5 py-3 font-bold text-germany-black hover:text-germany-red text-center">
                Sign Up
              </Link>
              <Link href="/#cta" onClick={() => setIsMobileOpen(false)} className="neu-btn-primary px-5 py-3 w-full mt-2 cursor-pointer text-center">
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
