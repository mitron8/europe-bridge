import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free German University Student Calculators & Tools | EuropeBridge',
  description:
    'Free interactive tools for students planning to study in Germany: German Grade Bavarian Calculator, Blocked Account Calculator, ECTS Credit Converter, Cost of Living Estimator, and Net Salary Calculator.',
  keywords: [
    'german university tools',
    'study in germany calculators',
    'bavarian formula calculator',
    'blocked account calculator germany',
    'ects calculator',
    'cost of living germany estimator',
    'europebridge',
  ],
  alternates: {
    canonical: 'https://europebridge.in/tools',
  },
  openGraph: {
    title: 'Free German University Student Calculators & Tools | EuropeBridge',
    description:
      'Evaluate your admission chances, convert grades using the Modified Bavarian Formula, and estimate blocked accounts & student expenses.',
    url: 'https://europebridge.in/tools',
    siteName: 'EuropeBridge',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EuropeBridge - German University Calculators & Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free German University Student Calculators & Tools | EuropeBridge',
    description:
      'Evaluate your admission chances, convert grades using the Modified Bavarian Formula, and estimate blocked accounts & student expenses.',
    images: ['/og-image.png'],
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
