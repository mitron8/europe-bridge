import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cost of Living in Germany Estimator for International Students 2026 | EuropeBridge',
  description:
    'Estimate your monthly living expenses across German student cities (Berlin, Munich, Aachen, Stuttgart). Calculate rent, health insurance, food, public transit, and semester tickets.',
  keywords: [
    'cost of living in germany for students',
    'student monthly expenses germany',
    'living cost berlin munich',
    'german student budget calculator',
    'rent health insurance germany students',
    'europebridge',
  ],
  alternates: {
    canonical: 'https://europebridge.in/tools/cost-of-living-estimator',
  },
  openGraph: {
    title: 'Cost of Living in Germany Estimator for Students | EuropeBridge',
    description:
      'Estimate monthly student expenses for rent, insurance, food, and public transit across German universities.',
    url: 'https://europebridge.in/tools/cost-of-living-estimator',
    siteName: 'EuropeBridge',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cost of Living Estimator Germany - EuropeBridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cost of Living in Germany Estimator for Students | EuropeBridge',
    description:
      'Estimate monthly student expenses across German university cities.',
    images: ['/og-image.png'],
  },
};

export default function CostOfLivingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
