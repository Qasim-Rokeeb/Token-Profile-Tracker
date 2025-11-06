export interface Token {
  symbol: string
  name: string
  balance: string
  decimals: number
  contractAddress: string
  price?: number
  value?: number
  logo?: string
  change24h?: number
}

export interface PortfolioStats {
  totalValue: number
  change24h: number
  tokenCount: number
}