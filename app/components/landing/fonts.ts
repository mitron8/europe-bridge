import { Playfair_Display } from "next/font/google";
import localFont from "next/font/local";

// Luxury high-contrast serif for headings (matching the reference image's 'THE WOMEN'S')
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading-serif",
  display: "swap",
});

// Madison Sauvage Script for flowing calligraphy accents (matching 'Outsiders' & 'estd 1987')
export const madisonSauvage = localFont({
  src: "../../../public/fonts/Madison Sauvage Script.otf",
  variable: "--font-script",
  display: "swap",
});

// Celinda luxury display serif alternative
export const celinda = localFont({
  src: "../../../public/fonts/CelindaRegular-DY8ZD.otf",
  variable: "--font-celinda",
  display: "swap",
});

// Backward-compatible aliases
export const silveridge = playfair;
export const instrumentSerif = playfair;
