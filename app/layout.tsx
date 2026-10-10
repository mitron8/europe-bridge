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

const ibmPlexSans = localFont({
  src: [
    {
      path: "../public/fonts/ibm-plex-sans/IBMPlexSans-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/ibm-plex-sans/IBMPlexSans-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/ibm-plex-sans/IBMPlexSans-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/ibm-plex-sans/IBMPlexSans-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/ibm-plex-sans/IBMPlexSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/ibm-plex-sans/IBMPlexSans-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/ibm-plex-sans/IBMPlexSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ibm-plex-sans/IBMPlexSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/ibm-plex-sans/IBMPlexSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/ibm-plex-sans/IBMPlexSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/ibm-plex-sans/IBMPlexSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/ibm-plex-sans/IBMPlexSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/ibm-plex-sans/IBMPlexSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/ibm-plex-sans/IBMPlexSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/ibm-plex-sans/IBMPlexSans-Bold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/ibm-plex-sans/IBMPlexSans-Bold.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-sans",
  display: "swap",
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
    <html lang="en" suppressHydrationWarning className={`${nunito.variable} ${ibmPlexSans.variable} ${geist.variable}`}>
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
