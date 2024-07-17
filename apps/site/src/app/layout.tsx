import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import './globals.css';

import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'How many Chrome tabs does Joost have open right now?',
  description: "There's no such thing as too many tabs, right?",
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
          'flex flex-col min-h-screen bg-background font-sans antialiased items-center justify-center',
          fontSans.variable
        )}
      >
        <div className='max-w-5xl mx-auto w-full'>{children}</div>
      </body>
    </html>
  );
}
