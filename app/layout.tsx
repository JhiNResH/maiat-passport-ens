import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PrivyProvider } from '@/components/PrivyProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Maiat Protocol',
  description: "Your agent's verifiable identity. One name. Trust score. On-chain reputation.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased bg-[#F9F9F7] text-[#141414]">
        <PrivyProvider>
          {children}
        </PrivyProvider>
      </body>
    </html>
  );
}
