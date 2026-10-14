import React from "react";
import "./components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "./components/landing/fonts";
import LandingNavbar from "./components/landing/LandingNavbar";
import Hero from "./components/landing/Hero";
import UniversityStrip from "./components/landing/UniversityStrip";
import MapRoadmap from "./components/landing/MapRoadmap";
import ToolsIndex from "./components/landing/ToolsIndex";
import PartnerBand from "./components/landing/PartnerBand";
import Comparison from "./components/landing/Comparison";
import Testimonials from "./components/landing/Testimonials";
import ClosingCTA from "./components/landing/ClosingCTA";
import FAQ from "./components/landing/FAQ";
import SmoothScroll from "./components/landing/SmoothScroll";
import FlightOverCity from "./components/FlightOverCity";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <main className="bg-[#f4f1ea]">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        <LandingNavbar />
        <Hero />
        <UniversityStrip />
        <MapRoadmap />
        <ToolsIndex />
        <PartnerBand />
        <Comparison />
        <Testimonials />
        <ClosingCTA />
        <FAQ />
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
