'use client';

import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { WagmiProvider } from 'wagmi';
import { arbitrum, mainnet, polygon, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

// Fix the projectId fallback logic - only use one fallback
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "16d00e15c073bb2a6e3d31746c3c19aa";

// 2. Create wagmiConfig
const metadata = {
  name: 'DAO Community Platform',
  description: 'Web3 Community Governance Platform',
  url: 'https://dao-community.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet, polygon, arbitrum, sepolia] as const;
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableWalletConnect: true, // Explicitly enable WalletConnect
  enableInjected: true, // Enable injected wallets
  enableCoinbase: true, // Enable Coinbase wallet
});

// 3. Create modal with better error handling
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false,
  enableOnramp: false,
  themeMode: 'light',
  themeVariables: {
    '--w3m-z-index': 1000
  }
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: 1000,
    }
  }
});

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}