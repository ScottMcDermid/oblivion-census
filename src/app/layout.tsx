import React from 'react';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Oblivion Census',
  description:
    'A reference and tracking tool for NPCs in The Elder Scrolls IV: Oblivion. Browse NPC details including quests, responsibility, routines, unique items, and trainer information.',
  openGraph: {
    title: 'Oblivion Census',
    description:
      'A reference and tracking tool for NPCs in The Elder Scrolls IV: Oblivion. Browse NPC details including quests, responsibility, routines, unique items, and trainer information.',
    url: 'https://census.oblivion.tools',
    siteName: 'Oblivion Census',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oblivion Census',
    description:
      'A reference and tracking tool for NPCs in The Elder Scrolls IV: Oblivion. Browse NPC details including quests, responsibility, routines, unique items, and trainer information.',
  },
  alternates: {
    canonical: 'https://census.oblivion.tools',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1e1e1e',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="root" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
