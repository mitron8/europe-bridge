import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { PerformanceGuard } from "@/components/PerformanceGuard";
import { Providers } from "./providers";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const celinda = localFont({
  src: "../public/fonts/CelindaRegular-DY8ZD.otf",
  variable: "--font-celinda",
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
    <html lang="en" className={`${nunito.variable} ${celinda.variable}`}>
      <body className="min-h-full flex flex-col font-sans text-gray-800 antialiased overflow-x-hidden">
        <PerformanceGuard />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
