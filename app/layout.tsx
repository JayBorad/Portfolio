import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jay Borad – Full Stack Developer Portfolio',
  description:
    'Portfolio of Jay Borad, a Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Explore projects, skills, and get in touch.',
  keywords: [
    'Jay Borad',
    'Full Stack Developer',
    'React Developer',
    'Next.js',
    'Node.js',
    'JavaScript',
    'Portfolio',
  ],
  authors: [{ name: 'Jay Borad' }],
  openGraph: {
    title: 'Jay Borad – Full Stack Developer',
    description:
      'Explore Jay Borad’s portfolio showcasing web applications built using React, Next.js, and Node.js.',
    url: 'https://portfolio-two-delta-67.vercel.app/',
    siteName: 'Jay Borad Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jay Borad Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
