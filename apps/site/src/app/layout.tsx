import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import './globals.css';

import Footer from '@/components/Footer';

import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'How many Chrome tabs does Joost have open right now?',
  description: 'There&apos;s no such thing as too many tabs, right?',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'flex flex-col h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <main className='grow'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
