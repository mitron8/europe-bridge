import type { Metadata } from "next";
import { Nunito, Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeRouteGuard } from "@/components/ThemeRouteGuard";
import { Providers } from "./providers";
import Script from "next/script";
import { playfair } from "./components/landing/fonts";

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
  metadataBase: new URL("https://europebridge.in"),
  title: {
    default: "EuropeBridge | Study in Germany Consultants, Admissions & Visa",
    template: "%s | EuropeBridge",
  },
  description:
    "EuropeBridge is a premier German university admission and visa consultancy built by alumni from top German universities (TU9). End-to-end guidance for 0€ tuition public universities, APS verification, SOP/LOR drafting, and German student visa.",
  keywords: [
    "Study in Germany consultants",
    "Germany education consultants",
    "MS in Germany",
    "Masters in Germany 2026",
    "German public university admissions",
    "TU9 universities Germany",
    "APS Certificate Germany",
    "German student visa consultants",
    "SOP writing for Germany",
    "German grade calculator",
    "Blocked account Germany",
    "0 tuition fees Germany",
    "EuropeBridge",
  ],
  authors: [{ name: "EuropeBridge Admissions Team", url: "https://europebridge.in" }],
  creator: "EuropeBridge",
  publisher: "EuropeBridge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://europebridge.in",
  },
  openGraph: {
    title: "EuropeBridge | Study in Germany Consultants, Admissions & Visa",
    description:
      "Premier German university admission and visa consultancy built by top German university alumni. End-to-end guidance for 0€ tuition public universities, APS fast-track, and visas.",
    url: "https://europebridge.in",
    siteName: "EuropeBridge",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EuropeBridge - Study in Germany Consultants & Visa Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EuropeBridge | Study in Germany Consultants, Admissions & Visa",
    description:
      "Premier German university admission and visa consultancy built by top German university alumni. 0€ tuition public universities, APS, and visa support.",
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/Europe Bridge Phoenix Emblem.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${nunito.variable} ${ibmPlexSans.variable} ${geist.variable} ${playfair.variable}`}>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
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
        <Providers>
          <ThemeRouteGuard />
          {children}
        </Providers>
      </body>
    </html>
  );
}
