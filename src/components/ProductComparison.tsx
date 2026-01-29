import { useState } from 'react'
import { Scale, X } from 'lucide-react'
import { useComparison } from '@/context/ComparisonContext'
import { useCurrency } from '@/context/CurrencyContext'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

export function ProductComparison() {
  const [isOpen, setIsOpen] = useState(false)
  const { comparisonItems, removeFromComparison, clearComparison } = useComparison()
  const { formatPrice } = useCurrency()

  if (comparisonItems.length === 0) return null

  const attributes = [
    { key: 'price', label: 'Price' },
    { key: 'category', label: 'Category' },
    { key: 'sizes', label: 'Available Sizes' },
    { key: 'colors', label: 'Colors' },
    { key: 'badge', label: 'Status' },
  ]

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-8 z-40 flex items-center gap-2 px-4 py-3 bg-accent-gold text-white rounded-full shadow-lg hover:scale-105 transition-transform"
      >
        <Scale className="w-5 h-5" />
        <span className="font-medium">Compare ({comparisonItems.length})</span>
      </button>

      {/* Comparison Modal */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-2xl z-50 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Product Comparison</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={clearComparison}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${comparisonItems.length}, 1fr)` }}>
                {/* Product Images & Names */}
                {comparisonItems.map((product) => (
                  <div key={product.id} className="relative">
                    <button
                      onClick={() => removeFromComparison(product.id)}
                      className="absolute top-2 right-2 z-10 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <Link to={`/product/${product.id}`} onClick={() => setIsOpen(false)}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full aspect-[3/4] object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Comparison Table */}
              <div className="mt-8 space-y-4">
                {attributes.map((attr) => (
                  <div key={attr.key} className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                      {attr.label}
                    </h4>
                    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${comparisonItems.length}, 1fr)` }}>
                      {comparisonItems.map((product) => (
                        <div key={product.id} className="text-center">
                          {attr.key === 'price' && (
                            <div>
                              <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
                              {product.originalPrice && (
                                <span className="ml-2 text-sm text-gray-500 line-through">
                                  {formatPrice(product.originalPrice)}
                                </span>
                              )}
                            </div>
                          )}
                          {attr.key === 'category' && (
                            <span className="capitalize">{product.category}</span>
                          )}
                          {attr.key === 'sizes' && (
                            <div className="flex flex-wrap gap-1 justify-center">
                              {product.sizes?.map((size) => (
                                <span
                                  key={size}
                                  className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded"
                                >
                                  {size}
                                </span>
                              )) || <span className="text-gray-400">N/A</span>}
                            </div>
                          )}
                          {attr.key === 'colors' && (
                            <div className="flex gap-2 justify-center">
                              {product.colors?.map((color) => (
                                <div
                                  key={color.hex}
                                  className="w-6 h-6 rounded-full border border-gray-300"
                                  style={{ backgroundColor: color.hex }}
                                  title={color.name}
                                />
                              )) || <span className="text-gray-400">N/A</span>}
                            </div>
                          )}
                          {attr.key === 'badge' && (
                            <span
                              className={cn(
                                'inline-block px-3 py-1 text-xs font-semibold rounded-full',
                                product.badge === 'new' && 'bg-blue-100 text-blue-800',
                                product.badge === 'sale' && 'bg-red-100 text-red-800',
                                !product.badge && 'text-gray-400'
                              )}
                            >
                              {product.badge ? product.badge.toUpperCase() : 'Regular'}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
