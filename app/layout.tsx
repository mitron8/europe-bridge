import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const superThree = localFont({
  src: "../public/fonts/SuperThree-LVx44.ttf",
  variable: "--font-super-three",
});

export const metadata: Metadata = {
  title: "EuropeBridge - Germany Admissions & Visa",
  description: "Built by alumni from top German universities. Admissions, APS, and visa support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${superThree.variable}`}>
      <body className="min-h-full flex flex-col font-sans text-gray-800 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
