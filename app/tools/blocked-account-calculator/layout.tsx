import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blocked Account Calculator Germany 2026/2027 | Calculate Total Costs & Monthly Payouts',
  description:
    'Calculate the exact blocked account amount required for your German student visa (992€/month, 11,904€/year). Compare setup fees, buffer amounts, and monthly payout breakdowns across approved providers.',
  keywords: [
    'blocked account calculator germany',
    'sperrkonto calculator',
    'german student visa blocked account amount 2026',
    'blocked account monthly payout',
    'expatrio coracle fintiba comparison',
    'europebridge',
  ],
  alternates: {
    canonical: 'https://europebridge.in/tools/blocked-account-calculator',
  },
  openGraph: {
    title: 'Blocked Account Calculator Germany 2026/2027 | EuropeBridge',
    description:
      'Calculate mandatory blocked account amounts, setup fees, and monthly payouts for your German student visa.',
    url: 'https://europebridge.in/tools/blocked-account-calculator',
    siteName: 'EuropeBridge',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Blocked Account Calculator Germany - EuropeBridge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blocked Account Calculator Germany 2026/2027 | EuropeBridge',
    description:
      'Calculate mandatory blocked account amounts, setup fees, and monthly payouts for your German student visa.',
    images: ['/og-image.png'],
  },
};

export default function BlockedAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
