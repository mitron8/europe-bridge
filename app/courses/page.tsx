import React from "react";
import { Metadata } from "next";
import "@/app/components/landing/landing.css";
import { playfair, madisonSauvage, celinda } from "@/app/components/landing/fonts";
import LandingNavbar from "@/app/components/landing/LandingNavbar";
import Footer from "@/app/components/Footer";
import { CoursesExplorer } from "./components/CoursesExplorer";

export const metadata: Metadata = {
  title: "Explore 400+ English-Taught Master's & Bachelor's Programs in Germany | EuropeBridge",
  description: "Comprehensive database of English-taught degree programs at TU9 and German public research universities. Filter by 0€ tuition, non-NC admission, minimum GPA, and application deadlines for 2026/2027.",
  keywords: [
    "study in germany",
    "english taught masters in germany",
    "tu9 universities",
    "free education in germany",
    "tum informatics",
    "rwth aachen automotive",
    "bavarian grade scale",
    "german university admission requirements",
    "daad course catalogue"
  ],
  openGraph: {
    title: "Explore 400+ English-Taught German University Degree Programs | EuropeBridge",
    description: "Verified database of English-taught programs at TU9 and public German universities with 0€ tuition, non-NC criteria, and minimum German GPA cutoffs.",
    type: "website",
  }
};

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#16161a] selection:bg-[#e63946] selection:text-white">
      <div className={`lp ${playfair.variable} ${madisonSauvage.variable} ${celinda.variable}`}>
        {/* Navigation Bar without dropdown on Courses */}
        <LandingNavbar />

        {/* Dynamic Courses Explorer with full filters, search, modal & database connection */}
        <CoursesExplorer />

        {/* Standard EuropeBridge Footer */}
        <div className="relative z-[40] mt-16">
          <Footer />
        </div>
      </div>
    </main>
  );
}
