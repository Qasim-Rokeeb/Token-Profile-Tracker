import { Token } from '../types'

// Mock token prices - In production, use CoinGecko, CoinMarketCap, or similar APIs
const TOKEN_PRICES: Record<string, { price: number; change24h: number }> = {
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

/**
 * Fetch token balances for a given address
 * In production, use services like:
 * - Alchemy: alchemy.com/sdk
 * - Moralis: moralis.io
 * - Covalent: covalenthq.com
 * - Etherscan API: etherscan.io/apis
 */
export async function fetchTokenBalances(address: string, chainId: number): Promise<Token[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Mock tokens - In production, fetch real token balances from blockchain
  const mockTokens: Token[] = [
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

/**
 * Calculate portfolio statistics
 */
export function calculatePortfolioStats(tokens: Token[]) {
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

/**
 * Get native token symbol for chain
 */
export function getNativeTokenSymbol(chainId: number): string {
  const symbols: Record<number, string> = {
    1: 'ETH',      // Ethereum Mainnet
    137: 'MATIC',  // Polygon
    42161: 'ETH',  // Arbitrum
    8453: 'ETH',   // Base
    10: 'ETH',     // Optimism
  }
  return symbols[chainId] || 'ETH'
}