import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jay Borad — Creative Developer',
  description: 'Full-stack developer crafting immersive digital experiences with cutting-edge technology.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
  },
  openGraph: {
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
