import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Germany University Admission Services & Packages | EuropeBridge',
  description:
    'Browse end-to-end German university admission services: university shortlisting, SOP & LOR drafting, APS verification fast-track, and National Visa D filing.',
  keywords: [
    'germany admission services',
    'study in germany consultants',
    'sop writing germany',
    'aps verification fast track',
    'german student visa assistance',
    'uni assist application service',
    'europebridge',
  ],
  alternates: {
    canonical: 'https://europebridge.in/services',
  },
  openGraph: {
    title: 'German University Admission Services & Packages | EuropeBridge',
    description:
      'Professional guidance for German public universities, document drafting, APS fast-track, and visa filing.',
    url: 'https://europebridge.in/services',
    siteName: 'EuropeBridge',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EuropeBridge - German Admission Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'German University Admission Services & Packages | EuropeBridge',
    description:
      'Professional guidance for German public universities, document drafting, APS fast-track, and visa filing.',
    images: ['/og-image.png'],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
