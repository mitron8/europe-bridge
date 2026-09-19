import type { Metadata } from "next";
import { Nunito, Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { PerformanceGuard } from "@/components/PerformanceGuard";
import { ThemeRouteGuard } from "@/components/ThemeRouteGuard";
import { Providers } from "./providers";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
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
    <html lang="en" suppressHydrationWarning className={`${nunito.variable} ${celinda.variable} ${geist.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (window.location.pathname.startsWith('/dashboard')) {
                  var stored = localStorage.getItem('europebridge-app-store');
                  if (stored) {
                    var parsed = JSON.parse(stored);
                    if (parsed && parsed.state && parsed.state.isDarkMode) {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  }
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans text-gray-800 antialiased overflow-x-hidden">
        <PerformanceGuard />
        <Providers>
          <ThemeRouteGuard />
          {children}
        </Providers>
      </body>
    </html>
  );
}
