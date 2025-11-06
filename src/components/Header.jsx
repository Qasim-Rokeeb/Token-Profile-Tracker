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
                <span className="text-sm text-gray-300">{address && formatAddress(address)}</span>
              </div>
            )}
            
            <appkit-button />
          </div>
        </div>
      </div>
    </header>
  )
}