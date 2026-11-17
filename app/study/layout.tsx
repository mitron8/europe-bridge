import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Study in Germany Guide 2026: 0€ Tuition, APS & Visa Hub | EuropeBridge',
  description:
    'Comprehensive guide to studying in Germany: public university requirements, APS certification, blocked account requirements, student visa process, and post-study EU Blue Card PR.',
  keywords: [
    'study in germany guide',
    'free tuition germany',
    'masters in germany requirements',
    'aps certificate india',
    'german blocked account 2026',
    'german student visa requirements',
    'europebridge',
  ],
  alternates: {
    canonical: 'https://europebridge.in/study',
  },
  openGraph: {
    title: 'Study in Germany Guide 2026: 0€ Tuition, APS & Visa Hub | EuropeBridge',
    description:
      'Complete resource hub for studying in Germany: admissions, APS verification, blocked accounts, visas, and career pathways.',
    url: 'https://europebridge.in/study',
    siteName: 'EuropeBridge',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EuropeBridge - Study in Germany Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Germany Guide 2026: 0€ Tuition, APS & Visa Hub | EuropeBridge',
    description:
      'Complete resource hub for studying in Germany: admissions, APS verification, blocked accounts, and visas.',
    images: ['/og-image.png'],
  },
};

export default function StudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
