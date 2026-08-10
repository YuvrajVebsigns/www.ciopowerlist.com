import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/providers/QueryProvider';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import ScrollAnimator from '@/components/ScrollAnimator';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CIO POWERLIST',
  // description: 'Core Media Administration Dashboard — Manage users, media, and system settings.',
  keywords: ['admin', 'dashboard', 'core media', 'management'],
  robots: 'noindex, nofollow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        <Preloader />
        <ScrollProgress />
        <ScrollAnimator />
        <QueryProvider>{children}</QueryProvider>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
