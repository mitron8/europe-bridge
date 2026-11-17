import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'German Working Student & Post-Grad Net Salary Calculator 2026 | EuropeBridge',
  description:
    'Calculate your take-home net salary in Germany for Werkstudent (working student), mini-job, academic internships, and post-study full-time jobs after taxes and social security deductions.',
  keywords: [
    'german working student salary calculator',
    'werkstudent net salary',
    'germany student tax calculator',
    'mini job calculator germany',
    'post study work salary germany',
    'europebridge',
  ],
  alternates: {
    canonical: 'https://europebridge.in/tools/net-salary-calculator',
  },
  openGraph: {
    title: 'German Working Student & Post-Grad Net Salary Calculator | EuropeBridge',
    description:
      'Calculate net take-home pay for Werkstudent jobs, internships, and post-study employment in Germany.',
    url: 'https://europebridge.in/tools/net-salary-calculator',
    siteName: 'EuropeBridge',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'German Salary Calculator - EuropeBridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'German Working Student & Post-Grad Net Salary Calculator | EuropeBridge',
    description:
      'Calculate net take-home pay for student jobs and post-study careers in Germany.',
    images: ['/og-image.png'],
  },
};

export default function NetSalaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
