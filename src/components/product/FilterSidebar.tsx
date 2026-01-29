import { useState } from 'react'
import { X, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  priceRange: [number, number]
  sizes: string[]
  colors: string[]
  inStock: boolean
  onSale: boolean
  newArrivals: boolean
}

const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const availableColors = [
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Navy', hex: '#1e3a5f' },
  { name: 'Gray', hex: '#6b7280' },
  { name: 'Beige', hex: '#d4c5b9' },
  { name: 'Brown', hex: '#8b4513' },
]

export function FilterSidebar({ isOpen, onClose, filters, onFilterChange }: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters)

  const handleSizeToggle = (size: string) => {
    const newSizes = localFilters.sizes.includes(size)
      ? localFilters.sizes.filter((s) => s !== size)
      : [...localFilters.sizes, size]
    setLocalFilters({ ...localFilters, sizes: newSizes })
  }

  const handleColorToggle = (colorName: string) => {
    const newColors = localFilters.colors.includes(colorName)
      ? localFilters.colors.filter((c) => c !== colorName)
      : [...localFilters.colors, colorName]
    setLocalFilters({ ...localFilters, colors: newColors })
  }

  const handleApply = () => {
    onFilterChange(localFilters)
    onClose()
  }

  const handleReset = () => {
    const resetFilters: FilterState = {
      priceRange: [0, 2000],
      sizes: [],
      colors: [],
      inStock: false,
      onSale: false,
      newArrivals: false,
    }
    setLocalFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 z-50 transition-transform duration-300 overflow-y-auto',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-4 uppercase tracking-wider">Price Range</h3>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={localFilters.priceRange[1]}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    priceRange: [0, parseInt(e.target.value)],
                  })
                }
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm">
                <span>${localFilters.priceRange[0]}</span>
                <span>${localFilters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-4 uppercase tracking-wider">Sizes</h3>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  className={cn(
                    'px-4 py-2 border rounded-md text-sm font-medium transition-all',
                    localFilters.sizes.includes(size)
                      ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-4 uppercase tracking-wider">Colors</h3>
            <div className="grid grid-cols-3 gap-3">
              {availableColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorToggle(color.name)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all',
                    localFilters.colors.includes(color.name)
                      ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                  )}
                >
                  <div
                    className="w-8 h-8 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-4 uppercase tracking-wider">Quick Filters</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.inStock}
                  onChange={(e) =>
                    setLocalFilters({ ...localFilters, inStock: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-gray-300"
                />
                <span className="text-sm">In Stock Only</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.onSale}
                  onChange={(e) =>
                    setLocalFilters({ ...localFilters, onSale: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-gray-300"
                />
                <span className="text-sm">On Sale</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.newArrivals}
                  onChange={(e) =>
                    setLocalFilters({ ...localFilters, newArrivals: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-gray-300"
                />
                <span className="text-sm">New Arrivals</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
