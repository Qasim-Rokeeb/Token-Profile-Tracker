import { Token } from '../types'

interface Props {
  tokens: Token[]
  loading: boolean
}

export default function TokenList({ tokens, loading }: Props) {
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