'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { GradientButton } from '@/components/ui/GradientButton';
import { Coins, Users, Vote, Plus } from 'lucide-react';

export function Navigation() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering wallet components after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Vote className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DAO Community
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/communities"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <Users className="w-4 h-4" />
              <span>Communities</span>
            </Link>

            {mounted && isConnected && (
              <Link
                href="/communities/create"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Create</span>
              </Link>
            )}
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {!mounted ? (
              // Placeholder during SSR to prevent hydration mismatch
              <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse" />
            ) : isConnected ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-lg">
                  <Coins className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                </div>
                <w3m-button />
              </div>
            ) : (
              <w3m-button />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}