import React from "react";
import type { Metadata } from "next";
import "./components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "./components/landing/fonts";
import LandingNavbar from "./components/landing/LandingNavbar";
import Hero from "./components/landing/Hero";
import UniversityStrip from "./components/landing/UniversityStrip";
import MapRoadmap from "./components/landing/MapRoadmap";
import ToolsIndex from "./components/landing/ToolsIndex";
import Comparison from "./components/landing/Comparison";
import Testimonials from "./components/landing/Testimonials";
import ClosingCTA from "./components/landing/ClosingCTA";
import FAQ from "./components/landing/FAQ";
import OfferConsultationPopup from "./components/landing/OfferConsultationPopup";
import SmoothScroll from "./components/landing/SmoothScroll";
import FlightOverCity from "./components/FlightOverCity";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "EuropeBridge | Study in Germany Consultants, Admissions & Visa Support",
  description:
    "Germany is not a dream anymore with EuropeBridge. Get alumni-backed guidance for German public universities, 0€ tuition degrees, APS fast-track, and German student visa.",
  keywords: [
    "Germany is not a dream anymore",
    "Study in Germany consultants",
    "Germany education consultants",
    "MS in Germany 2026",
    "Masters in Germany free tuition",
    "German public university admissions",
    "TU9 universities Germany",
    "APS Certificate Germany fast track",
    "German student visa consultants",
    "SOP writing for Germany",
    "EuropeBridge",
  ],
  alternates: {
    canonical: "https://europebridge.in",
  },
  openGraph: {
    title: "Germany is Not a Dream Anymore with EuropeBridge",
    description:
      "Alumni-guided admissions for 0€ tuition German public universities, APS fast-track, SOP/LOR drafting, and 100% student visa guidance.",
    url: "https://europebridge.in",
    siteName: "EuropeBridge",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Germany is not a dream anymore with EuropeBridge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Germany is Not a Dream Anymore with EuropeBridge",
    description:
      "Alumni-guided admissions for 0€ tuition German public universities, APS fast-track, and 100% student visa guidance.",
    images: ["/og-image.png"],
    creator: "@europebridge",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "EuropeBridge",
  alternateName: "EuropeBridge Education Consultants",
  url: "https://europebridge.in",
  logo: "https://europebridge.in/logo.png",
  image: "https://europebridge.in/og-image.png",
  description:
    "Premier German university admission counseling, APS fast-track registration, and visa support founded by alumni of top German universities.",
  sameAs: [
    "https://www.linkedin.com/company/europebridge",
    "https://www.instagram.com/europebridge",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Admissions Counseling",
    areaServed: ["IN", "DE"],
    availableLanguage: ["English", "Hindi", "German"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "EuropeBridge",
  url: "https://europebridge.in",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://europebridge.in/courses?search={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function Page() {
  return (
    <main className="bg-[#f4f1ea]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />
        <Hero />
        <UniversityStrip />
        <MapRoadmap />
        <ToolsIndex />
        <Comparison />
        <Testimonials />
        <ClosingCTA />
        <FAQ />
        <OfferConsultationPopup />
      </div>
      {/* Kept exactly as before — sits flush on the footer */}
      <div className="relative z-[40]">
        <FlightOverCity />
        <Footer />
      </div>
      {/* mounted last so its ScrollTriggers are created after the pinned roadmap */}
      <SmoothScroll />
    </main>
  );
}
