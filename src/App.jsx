// ===== config.jsx =====
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


// ===== main.jsx =====
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import './index.css'
import { wagmiAdapter, queryClient } from './config.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)


// ===== utils/tokenService.jsx =====
// Mock token prices - In production, use CoinGecko, CoinMarketCap, or similar APIs
const TOKEN_PRICES = {
  'ETH': { price: 3200.50, change24h: 2.5 },
  'USDC': { price: 1.00, change24h: 0.01 },
  'USDT': { price: 0.999, change24h: -0.02 },
  'DAI': { price: 1.001, change24h: 0.05 },
  'WETH': { price: 3200.50, change24h: 2.5 },
  'LINK': { price: 14.75, change24h: -1.2 },
  'UNI': { price: 6.85, change24h: 3.8 },
  'AAVE': { price: 98.30, change24h: 1.5 },
  'MATIC': { price: 0.85, change24h: -0.8 },
  'ARB': { price: 1.15, change24h: 4.2 },
}

export async function fetchTokenBalances(address, chainId) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Mock tokens
  const mockTokens = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: '2.45678',
      decimals: 18,
      contractAddress: '0x0000000000000000000000000000000000000000',
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: '5000.00',
      decimals: 6,
      contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    },
    {
      symbol: 'USDT',
      name: 'Tether USD',
      balance: '3250.50',
      decimals: 6,
      contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    },
    {
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      balance: '1500.25',
      decimals: 18,
      contractAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    },
    {
      symbol: 'LINK',
      name: 'Chainlink',
      balance: '125.789',
      decimals: 18,
      contractAddress: '0x514910771af9ca656af840dff83e8264ecf986ca',
    },
    {
      symbol: 'UNI',
      name: 'Uniswap',
      balance: '450.50',
      decimals: 18,
      contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    },
  ]

  // Add price and value to tokens
  const tokensWithPrices = mockTokens.map(token => {
    const priceData = TOKEN_PRICES[token.symbol] || { price: 0, change24h: 0 }
    const balance = parseFloat(token.balance)
    
    return {
      ...token,
      price: priceData.price,
      change24h: priceData.change24h,
      value: balance * priceData.price,
    }
  })

  return tokensWithPrices
}

export function calculatePortfolioStats(tokens) {
  const totalValue = tokens.reduce((sum, token) => sum + (token.value || 0), 0)
  
  // Calculate weighted average of 24h changes
  const totalChange = tokens.reduce((sum, token) => {
    const weight = (token.value || 0) / totalValue
    return sum + (token.change24h || 0) * weight
  }, 0)

  return {
    totalValue,
    change24h: totalChange,
    tokenCount: tokens.length,
  }
}

export function getNativeTokenSymbol(chainId) {
  const symbols = {
    1: 'ETH',      // Ethereum Mainnet
    137: 'MATIC',  // Polygon
    42161: 'ETH',  // Arbitrum
    8453: 'ETH',   // Base
    10: 'ETH',     // Optimism
  }
  return symbols[chainId] || 'ETH'
}


// ===== components/Header.jsx =====
import { useAppKitAccount } from '@reown/appkit/react'

export default function Header() {
  const { address, isConnected } = useAppKitAccount()

  const formatAddress = (addr) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <header className="bg-dark-lighter border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💎</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Portfolio Tracker</h1>
            </div>
          </div>

          {/* Wallet Info */}
          <div className="flex items-center space-x-4">
            {isConnected && (
              <div className="hidden sm:flex items-center space-x-2 bg-dark px-4 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">{formatAddress(address)}</span>
              </div>
            )}
            
            <appkit-button />
          </div>
        </div>
      </div>
    </header>
  )
}


// ===== components/PortfolioStats.jsx =====
export default function PortfolioStats({ stats, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-dark-lighter rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-24 mb-3"></div>
            <div className="h-8 bg-gray-700 rounded w-32"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Total Value */}
      <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 border border-primary/20 rounded-xl p-6">
        <p className="text-sm text-gray-400 mb-2">Total Portfolio Value</p>
        <h2 className="text-3xl font-bold text-white">
          ${stats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h2>
      </div>

      {/* 24h Change */}
      <div className="bg-dark-lighter rounded-xl p-6 border border-gray-800">
        <p className="text-sm text-gray-400 mb-2">24h Change</p>
        <div className="flex items-center space-x-2">
          <h2 className={`text-3xl font-bold ${stats.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {stats.change24h >= 0 ? '+' : ''}{stats.change24h.toFixed(2)}%
          </h2>
          <span className="text-2xl">
            {stats.change24h >= 0 ? '📈' : '📉'}
          </span>
        </div>
      </div>

      {/* Token Count */}
      <div className="bg-dark-lighter rounded-xl p-6 border border-gray-800">
        <p className="text-sm text-gray-400 mb-2">Total Tokens</p>
        <h2 className="text-3xl font-bold text-white">{stats.tokenCount}</h2>
      </div>
    </div>
  )
}


// ===== components/TokenList.jsx =====
export default function TokenList({ tokens, loading }) {
  if (loading) {
    return (
      <div className="bg-dark-lighter rounded-xl border border-gray-800 overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">Your Tokens</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-4 bg-dark rounded-lg animate-pulse">
                <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-32"></div>
                </div>
                <div className="h-6 bg-gray-700 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (tokens.length === 0) {
    return (
      <div className="bg-dark-lighter rounded-xl border border-gray-800 p-12 text-center">
        <div className="text-6xl mb-4">🪙</div>
        <h3 className="text-xl font-semibold text-white mb-2">No Tokens Found</h3>
        <p className="text-gray-400">Your wallet doesn't have any tokens yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-dark-lighter rounded-xl border border-gray-800 overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-4">Your Tokens</h3>
        
        {/* Table Header - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-4 pb-3 text-sm text-gray-400 border-b border-gray-800">
          <div className="col-span-4">Token</div>
          <div className="col-span-3 text-right">Balance</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-2 text-right">Value</div>
          <div className="col-span-1 text-right">24h</div>
        </div>

        {/* Token Rows */}
        <div className="space-y-2 mt-3">
          {tokens.map((token, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-dark hover:bg-dark/80 rounded-lg transition-colors"
            >
              {/* Token Info */}
              <div className="md:col-span-4 flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {token.symbol.slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-white">{token.symbol}</p>
                  <p className="text-sm text-gray-400">{token.name}</p>
                </div>
              </div>

              {/* Balance */}
              <div className="md:col-span-3 md:text-right">
                <p className="text-white font-medium">
                  {parseFloat(token.balance).toLocaleString('en-US', { 
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6 
                  })}
                </p>
                <p className="text-sm text-gray-400 md:hidden">Balance</p>
              </div>

              {/* Price */}
              <div className="md:col-span-2 md:text-right">
                <p className="text-white">
                  ${token.price?.toLocaleString('en-US', { 
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2 
                  }) || '0.00'}
                </p>
                <p className="text-sm text-gray-400 md:hidden">Price</p>
              </div>

              {/* Value */}
              <div className="md:col-span-2 md:text-right">
                <p className="text-white font-semibold">
                  ${token.value?.toLocaleString('en-US', { 
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2 
                  }) || '0.00'}
                </p>
                <p className="text-sm text-gray-400 md:hidden">Value</p>
              </div>

              {/* 24h Change */}
              <div className="md:col-span-1 md:text-right">
                <span className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${
                  (token.change24h || 0) >= 0 
                    ? 'bg-green-500/10 text-green-500' 
                    : 'bg-red-500/10 text-red-500'
                }`}>
                  {(token.change24h || 0) >= 0 ? '+' : ''}
                  {token.change24h?.toFixed(2) || '0.00'}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


// ===== App.jsx =====
import { useEffect, useState } from 'react'
import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react'
import { useBalance } from 'wagmi'
import Header from './components/Header'
import PortfolioStats from './components/PortfolioStats'
import TokenList from './components/TokenList'
import { fetchTokenBalances, calculatePortfolioStats, getNativeTokenSymbol } from './utils/tokenService'

function App() {
  const { address, isConnected } = useAppKitAccount()
  const { chainId } = useAppKitNetwork()
  const [tokens, setTokens] = useState([])
  const [stats, setStats] = useState({ totalValue: 0, change24h: 0, tokenCount: 0 })
  const [loading, setLoading] = useState(false)

  // Get native token balance (ETH, MATIC, etc)
  const { data: nativeBalance } = useBalance({
    address: address,
  })

  // Fetch tokens when wallet connects
  useEffect(() => {
    if (isConnected && address && chainId) {
      loadTokens()
    } else {
      setTokens([])
      setStats({ totalValue: 0, change24h: 0, tokenCount: 0 })
    }
  }, [isConnected, address, chainId])

  const loadTokens = async () => {
    if (!address || !chainId) return

    setLoading(true)
    try {
      // Fetch token balances
      const tokenBalances = await fetchTokenBalances(address, chainId)
      
      // Add native token balance
      if (nativeBalance) {
        const nativeSymbol = getNativeTokenSymbol(chainId)
        const nativeToken = {
          symbol: nativeSymbol,
          name: nativeSymbol === 'ETH' ? 'Ethereum' : nativeSymbol,
          balance: nativeBalance.formatted,
          decimals: nativeBalance.decimals,
          contractAddress: '0x0000000000000000000000000000000000000000',
          price: 3200.50,
          change24h: 2.5,
          value: parseFloat(nativeBalance.formatted) * 3200.50,
        }
        tokenBalances.unshift(nativeToken)
      }

      setTokens(tokenBalances)
      
      // Calculate stats
      const portfolioStats = calculatePortfolioStats(tokenBalances)
      setStats(portfolioStats)
    } catch (error) {
      console.error('Error loading tokens:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isConnected ? (
          // Welcome Screen
          <div className="text-center py-20">
            <div className="text-8xl mb-6">💼</div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Welcome to Portfolio Tracker
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Connect your wallet to view your token portfolio
            </p>
            <div className="flex justify-center">
              <appkit-button />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
              <div className="bg-dark-lighter rounded-xl p-6 border border-gray-800">
                <div className="text-4xl mb-3">🔗</div>
                <h3 className="text-lg font-semibold text-white mb-2">Multi-Chain Support</h3>
                <p className="text-gray-400 text-sm">
                  Track tokens across Ethereum, Polygon, Arbitrum, Base, and more
                </p>
              </div>
              
              <div className="bg-dark-lighter rounded-xl p-6 border border-gray-800">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="text-lg font-semibold text-white mb-2">Real-Time Prices</h3>
                <p className="text-gray-400 text-sm">
                  Get live token prices and 24-hour price changes
                </p>
              </div>
              
              <div className="bg-dark-lighter rounded-xl p-6 border border-gray-800">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="text-lg font-semibold text-white mb-2">Portfolio Analytics</h3>
                <p className="text-gray-400 text-sm">
                  View your total portfolio value and performance metrics
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Portfolio View
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">Your Portfolio</h2>
              <p className="text-gray-400">
                Connected to {chainId === 1 ? 'Ethereum' : chainId === 137 ? 'Polygon' : `Chain ${chainId}`}
              </p>
            </div>

            <PortfolioStats stats={stats} loading={loading} />
            
            <TokenList tokens={tokens} loading={loading} />

            {/* Refresh Button */}
            {!loading && tokens.length > 0 && (
              <div className="mt-6 text-center">
                <button
                  onClick={loadTokens}
                  className="px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-lg font-medium transition-colors"
                >
                  🔄 Refresh Portfolio
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-400 text-sm">
            Built with Reown AppKit • Mock data for demonstration
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App