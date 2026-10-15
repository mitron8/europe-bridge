"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, LayoutDashboard, LogOut, Menu, Plus, X } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { logout } from "@/lib/auth";
import { navItems, type NavItem } from "./navData";
import { playfair } from "./fonts";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span aria-hidden className="flex h-[18px] w-[5px] flex-col overflow-hidden rounded-[1px]">
        <span className={`flex-1 ${light ? "bg-white" : "bg-[#0d0d0f]"}`} />
        <span className="flex-1 bg-[#e63946]" />
        <span className="flex-1 bg-[#c9a35b]" />
      </span>
      <span
        className={`lp-serif ${playfair.className} text-[24px] leading-none tracking-[-0.01em] ${light ? "text-white" : "text-[#16161a]"}`}
      >
        Europe<span className="italic font-normal">Bridge</span>
      </span>
    </span>
  );
}

function MegaPanel({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  if (item.dropdown) {
    return (
      <div className="lp-mega w-[260px] p-2">
        {item.dropdown.map((d) => (
          <Link
            key={d}
            href="/#free-tools"
            onClick={onNavigate}
            className="group flex items-center justify-between rounded-xl px-4 py-3 text-[14px] font-medium text-[#16161a] transition-colors hover:bg-[#ece7dd]"
          >
            {d}
            <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-60" />
          </Link>
        ))}
      </div>
    );
  }
  const groups = item.groups ?? [];
  const width = item.customWidth === "w-[620px]" ? "w-[720px]" : "w-[880px]";
  return (
    <div className={`lp-mega ${width} p-3`}>
      <div className={`grid gap-1 ${groups.length === 3 ? "grid-cols-3" : "grid-cols-4"}`}>
        {groups.map((g) => (
          <div key={g.title} className="rounded-2xl p-4">
            <div className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#9a958c]">{g.title}</div>
            <div className="flex flex-col gap-0.5">
              {g.items.map((gi, i) => (
                <Link
                  key={gi.title + i}
                  href={gi.href || item.href}
                  onClick={onNavigate}
                  className="group -mx-2 rounded-lg px-2 py-2 transition-colors hover:bg-[#ece7dd]"
                >
                  <div className="flex items-center gap-2 text-[14px] font-medium text-[#16161a]">
                    {gi.title}
                    {gi.badge && (
                      <span className="rounded-full bg-[#e63946] px-1.5 py-[1px] text-[9.5px] font-semibold text-white">
                        {gi.badge}
                      </span>
                    )}
                  </div>
                  {gi.desc && <div className="mt-0.5 text-[12.5px] leading-snug text-[#6b6760]">{gi.desc}</div>}
                </Link>
              ))}
              {g.action && (
                <Link
                  href={g.action.href}
                  onClick={onNavigate}
                  className="mt-2 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#e63946]"
                >
                  {g.action.label} <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      {item.footerLink && (
        <div className="mt-2 flex items-center justify-between rounded-xl bg-[#ece7dd] px-5 py-3.5">
          <span className="text-[13px] text-[#6b6760]">Everything is free to explore before you sign up.</span>
          <Link
            href={item.footerLink.href}
            onClick={onNavigate}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#16161a]"
          >
            {item.footerLink.label.replace(/\s*→\s*$/, "")} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default function LandingNavbar() {
  const user = useAppStore((s) => s.user);
  const checkAuth = useAppStore((s) => s.checkAuth);

  const [, setOnDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const hero = document.getElementById("hero");
      const heroH = hero ? hero.offsetHeight : window.innerHeight;
      setOnDark(y < heroH - 72);
      setScrolled(y > 24);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > heroH * 0.9);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = window.__lpLenis;
    if (mobileOpen) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  const enter = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(i);
  };
  const leave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  // The hero is light, so the bar always uses dark text; it only gains a backdrop once scrolled.
  const light: boolean = false;
  const items = navItems.filter((n) => n.label !== "Home");

  const initials = user
    ? `${user.firstName?.[0] || user.name?.[0] || user.email[0] || "U"}${user.lastName?.[0] || ""}`.toUpperCase()
    : "U";
  const displayName = user ? user.firstName || user.name?.split(" ")[0] || user.email.split("@")[0] : "";
  const dashboardRoute = user
    ? `/dashboard/${user.role === "superadmin" ? "super-admin" : user.role || "student"}`
    : "/dashboard/student";

  return (
    <div id="landing-navbar-root">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ${
          hidden && open === null && !mobileOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          light
            ? scrolled
              ? "border-b border-white/10 bg-[#0d0d0f]/55 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
            : scrolled || open !== null
              ? "border-b border-[rgba(22,22,26,0.1)] bg-[#f4f1ea]/85 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
        onMouseLeave={leave}
      >
        <div className="lp-container flex h-[72px] items-center justify-between gap-6">
          <Link href="/" aria-label="EuropeBridge home" className="shrink-0">
            <Wordmark light={light} />
          </Link>

          <nav className="hidden items-center lg:flex" aria-label="Primary">
            {items.map((item, i) => {
              const hasMenu = !!(item.groups || item.dropdown);
              const active = open === i;
              return (
                <div key={item.label} className="relative" onMouseEnter={() => (hasMenu ? enter(i) : leave())}>
                  <Link
                    href={item.href}
                    onFocus={() => hasMenu && enter(i)}
                    className={`relative inline-flex h-[72px] items-center gap-1 px-3.5 text-[14px] font-medium transition-colors xl:px-4 ${
                      light ? "text-white/80 hover:text-white" : "text-[#16161a]/75 hover:text-[#16161a]"
                    } ${active ? (light ? "text-white" : "!text-[#16161a]") : ""}`}
                  >
                    {item.label}
                    {hasMenu && (
                      <ChevronDown
                        className={`h-3.5 w-3.5 opacity-60 transition-transform duration-300 ${active ? "rotate-180" : ""}`}
                      />
                    )}
                    <span
                      className={`absolute inset-x-4 bottom-[22px] h-px origin-left bg-current transition-transform duration-500 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                      style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {user ? (
              <div className="group relative">
                <Link
                  href={dashboardRoute}
                  className={`flex items-center gap-2 rounded-full py-1 pl-1 pr-3 transition-colors ${
                    light ? "bg-white/10 text-white hover:bg-white/15" : "bg-[#16161a]/[0.06] text-[#16161a] hover:bg-[#16161a]/10"
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e63946] text-[12px] font-semibold text-white">
                    {initials}
                  </span>
                  <span className="max-w-[110px] truncate text-[13px] font-medium">{displayName}</span>
                </Link>
                <div className="invisible absolute right-0 top-full mt-2 w-60 translate-y-1 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="lp-mega p-2">
                    <div className="border-b border-[rgba(22,22,26,0.1)] px-3 pb-3 pt-2">
                      <div className="truncate text-[14px] font-semibold text-[#16161a]">
                        {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.name || displayName}
                      </div>
                      <div className="truncate text-[12px] text-[#6b6760]">{user.email}</div>
                    </div>
                    <Link
                      href={dashboardRoute}
                      className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-[13px] font-medium text-[#16161a] hover:bg-[#ece7dd]"
                    >
                      <LayoutDashboard className="h-4 w-4" /> My dashboard
                    </Link>
                    <button
                      onClick={() => logout()}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium text-[#b4232f] hover:bg-[#e63946]/[0.07]"
                    >
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className={`px-3 text-[14px] font-medium transition-colors ${
                  light ? "text-white/80 hover:text-white" : "text-[#16161a]/75 hover:text-[#16161a]"
                }`}
              >
                Log in
              </Link>
            )}
            <Link
              href="/#cta"
              onClick={() => window.dispatchEvent(new CustomEvent("open-offer-modal"))}
              className={`lp-btn lp-btn--sm ${light ? "lp-btn--light" : "lp-btn--dark"}`}
            >
              Book a consultation
            </Link>
          </div>

          <button
            className={`flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${
              light ? "bg-white/10 text-white" : "bg-[#16161a]/[0.06] text-[#16161a]"
            }`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Desktop mega menu */}
        <AnimatePresence>
          {open !== null && (items[open].groups || items[open].dropdown) && (
            <motion.div
              key={open}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute left-0 right-0 top-[64px] hidden justify-center lg:flex"
              onMouseEnter={() => enter(open)}
              onMouseLeave={leave}
            >
              <MegaPanel item={items[open]} onNavigate={() => setOpen(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#0d0d0f] text-white lg:hidden"
            data-lenis-prevent
          >
            <div className="lp-container flex h-[72px] shrink-0 items-center justify-between">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <Wordmark light />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="lp-container flex-1 overflow-y-auto pb-10 pt-4">
              {items.map((item, i) => {
                const expandable = !!(item.groups || item.dropdown);
                const isOpen = mobileSection === i;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.05 + i * 0.05, ease: EASE }}
                    className="border-b border-white/10"
                  >
                    {expandable ? (
                      <button
                        onClick={() => setMobileSection(isOpen ? null : i)}
                        className="flex w-full items-center justify-between py-5 text-left"
                      >
                        <span className="lp-serif text-[34px] leading-none">{item.label}</span>
                        <Plus className={`h-5 w-5 transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`} />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between py-5"
                      >
                        <span className="lp-serif text-[34px] leading-none">{item.label}</span>
                        <ArrowRight className="h-5 w-5 opacity-60" />
                      </Link>
                    )}
                    <div className="lp-acc" data-open={isOpen}>
                      <div>
                        <div className="space-y-6 pb-6">
                          {item.dropdown && (
                            <div className="flex flex-col gap-3 pl-1">
                              {item.dropdown.map((d) => (
                                <Link key={d} href="/#free-tools" onClick={() => setMobileOpen(false)} className="text-white/75">
                                  {d}
                                </Link>
                              ))}
                            </div>
                          )}
                          {item.groups?.map((g) => (
                            <div key={g.title}>
                              <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/40">
                                {g.title}
                              </div>
                              <div className="flex flex-col gap-2.5">
                                {g.items.map((gi, k) => (
                                  <Link
                                    key={gi.title + k}
                                    href={gi.href || item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-[15px] text-white/80"
                                  >
                                    {gi.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <div className="mt-8 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link href={dashboardRoute} onClick={() => setMobileOpen(false)} className="lp-btn lp-btn--ghost-light w-full">
                      <LayoutDashboard className="h-4 w-4" /> Go to dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        logout();
                      }}
                      className="py-2 text-[13px] text-white/50"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="lp-btn lp-btn--ghost-light w-full">
                    Log in
                  </Link>
                )}
                <Link
                  href="/#cta"
                  onClick={() => {
                    setMobileOpen(false);
                    window.dispatchEvent(new CustomEvent("open-offer-modal"));
                  }}
                  className="lp-btn lp-btn--light w-full"
                >
                  Book a consultation <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
