import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'ProhostAI - AI-Powered Property Management for Short-Term Rentals',
    template: '%s | ProhostAI'
  },
  description: 'Transform your short-term rental business with AI-powered guest communications, automated messaging, and intelligent property management.',
  keywords: 'property management, short-term rental, airbnb automation, vacation rental software, AI property manager',
  authors: [{ name: 'ProhostAI' }],
  creator: 'ProhostAI',
  publisher: 'ProhostAI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'ProhostAI - AI-Powered Property Management',
    description: 'Transform your short-term rental business with AI-powered guest communications and automation.',
    url: 'https://prohostai.com',
    siteName: 'ProhostAI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProhostAI - AI-Powered Property Management',
    description: 'Transform your short-term rental business with AI-powered guest communications and automation.',
    creator: '@prohostai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-white antialiased">
        {children}
      </body>
    </html>
  );
}