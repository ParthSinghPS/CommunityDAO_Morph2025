import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Web3Provider } from '@/lib/web3/config';
import { Navigation } from '@/components/layout/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DAO Community Platform - Decentralized Governance',
  description: 'Create, fund, and govern communities through transparent voting and collective decision-making.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          <Navigation />
          <main>{children}</main>
        </Web3Provider>
      </body>
    </html>
  );
}