import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'German Grade Calculator (Modified Bavarian Formula) | Convert GPA to German Scale',
  description:
    'Instantly convert your Indian CGPA, GPA, or percentage to the official German university grade scale (1.0 to 4.0) using the Modified Bavarian Formula. Check TU9 & public university cutoffs.',
  keywords: [
    'german grade calculator',
    'bavarian formula calculator',
    'modified bavarian formula',
    'convert gpa to german grade',
    'cgpa to german grade converter',
    'uni assist grade conversion',
    'percentage to german grade',
    'europebridge',
  ],
  alternates: {
    canonical: 'https://europebridge.in/tools/german-grade-calculator',
  },
  openGraph: {
    title: 'German Grade Calculator (Modified Bavarian Formula) | EuropeBridge',
    description:
      'Convert your GPA/CGPA or percentage to the German grading scale (1.0 to 4.0) using the official Modified Bavarian Formula.',
    url: 'https://europebridge.in/tools/german-grade-calculator',
    siteName: 'EuropeBridge',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'German Grade Calculator - EuropeBridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'German Grade Calculator (Modified Bavarian Formula) | EuropeBridge',
    description:
      'Convert your GPA/CGPA or percentage to the German grading scale using the official Bavarian Formula.',
    images: ['/og-image.png'],
  },
};

export default function GermanGradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
