import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ECTS Credit Calculator & Converter for Germany | EuropeBridge',
  description:
    'Convert your university semester credits, credit hours, or contact hours into European Credit Transfer System (ECTS) points for German Master\'s degree eligibility checks.',
  keywords: [
    'ects credit calculator',
    'convert credits to ects',
    'german university credit requirements',
    'ects converter india',
    '180 ects masters germany',
    '210 ects germany',
    'europebridge',
  ],
  alternates: {
    canonical: 'https://europebridge.in/tools/ects-credit-calculator',
  },
  openGraph: {
    title: 'ECTS Credit Calculator & Converter for Germany | EuropeBridge',
    description:
      'Convert university credits to ECTS points for German Master\'s eligibility and course evaluation.',
    url: 'https://europebridge.in/tools/ects-credit-calculator',
    siteName: 'EuropeBridge',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ECTS Credit Calculator - EuropeBridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ECTS Credit Calculator & Converter for Germany | EuropeBridge',
    description:
      'Convert university credits to ECTS points for German Master\'s eligibility.',
    images: ['/og-image.png'],
  },
};

export default function EctsCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
