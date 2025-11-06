import { PortfolioStats as Stats } from '../types'
import PropTypes from 'prop-types'

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