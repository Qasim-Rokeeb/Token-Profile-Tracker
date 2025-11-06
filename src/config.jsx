import { createAppKit } from '@reown/appkit/react'
import { mainnet, polygon, arbitrum, base, optimism } from '@reown/appkit/networks'
import { QueryClient } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// Get your Project ID from https://cloud.reown.com
export const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || 'YOUR_PROJECT_ID_HERE'

// Configure networks
export const networks = [mainnet, polygon, arbitrum, base, optimism]

// Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false
})

// Create AppKit instance
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'Token Portfolio Tracker',
    description: 'Track your crypto portfolio across multiple chains',
    url: 'https://myportfolio.app',
    icons: ['https://avatars.githubusercontent.com/u/179229932']
  },
  features: {
    analytics: true,
  }
})

// Create React Query client
export const queryClient = new QueryClient()