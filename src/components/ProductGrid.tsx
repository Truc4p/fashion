import { useState, useMemo } from 'react'
import { Product } from '@/types'
import { ProductCard } from './ProductCard'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

interface ProductGridProps {
  products: Product[]
}

const categories = [
  { value: 'all', label: 'All' },
  { value: 'woman', label: 'Woman' },
  { value: 'man', label: 'Man' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'new', label: 'New Arrivals' },
]

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
]

export function ProductGrid({ products }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (activeCategory !== 'all') {
      if (activeCategory === 'new') {
        filtered = products.filter((p) => p.new)
      } else {
        filtered = products.filter((p) => p.category === activeCategory)
      }
    }

    // Sort
    const sorted = [...filtered]
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        sorted.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0))
        break
      default:
        break
    }

    return sorted
  }, [products, activeCategory, sortBy])

  return (
    <section id="products" className="section-spacing bg-white">
      <div className="container-luxe">
        {/* Filters & Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={cn(
                  'px-4 py-2 text-xs font-medium uppercase tracking-widest transition-all duration-300',
                  activeCategory === category.value
                    ? 'bg-primary text-white'
                    : 'text-primary hover:text-accent-gold'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 text-xs font-medium uppercase tracking-wider border border-gray-200 bg-white cursor-pointer focus:outline-none focus:border-primary transition-colors"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-luxe-gray" />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
          {filteredAndSortedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-luxe-gray">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
