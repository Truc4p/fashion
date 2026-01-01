import { useParams } from 'react-router-dom'
import { Header, Footer, Cart, ProductCard } from '@/components'
import { products } from '@/data/products'
import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react'

type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'name'

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
]

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const colorOptions = [
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Navy', hex: '#1e3a5f' },
  { name: 'Cream', hex: '#faf8f5' },
  { name: 'Camel', hex: '#c9a87c' },
]

export function CategoryPage() {
  const { category } = useParams<{ category: string }>()
  
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [showFilters, setShowFilters] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  // Get category title
  const getCategoryTitle = () => {
    switch (category) {
      case 'woman': return 'Women\'s Collection'
      case 'man': return 'Men\'s Collection'
      case 'kids': return 'Kids\' Collection'
      case 'new': return 'New Arrivals'
      case 'sale': return 'Sale'
      default: return 'All Products'
    }
  }

  const getCategoryDescription = () => {
    switch (category) {
      case 'woman': return 'Discover our curated selection of timeless pieces designed for the modern woman.'
      case 'man': return 'Refined essentials and statement pieces for the contemporary gentleman.'
      case 'kids': return 'Playful yet sophisticated styles for the little ones.'
      case 'new': return 'Be the first to explore our latest arrivals and seasonal must-haves.'
      case 'sale': return 'Exceptional pieces at exceptional prices. Limited availability.'
      default: return 'Explore our complete collection of luxury fashion.'
    }
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by category
    if (category === 'woman' || category === 'man') {
      result = result.filter(p => p.category === category)
    } else if (category === 'new') {
      result = result.filter(p => p.new === true)
    } else if (category === 'sale') {
      result = result.filter(p => p.badge === 'sale')
    }

    // Filter by size
    if (selectedSizes.length > 0) {
      result = result.filter(p => 
        p.sizes?.some(size => selectedSizes.includes(size))
      )
    }

    // Filter by color
    if (selectedColors.length > 0) {
      result = result.filter(p => 
        p.colors?.some(color => selectedColors.includes(color.name))
      )
    }

    // Filter by price
    result = result.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    // Sort
    switch (sortBy) {
      case 'newest':
        result = result.filter(p => p.new).concat(result.filter(p => !p.new))
        break
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return result
  }, [category, sortBy, selectedSizes, selectedColors, priceRange])

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    )
  }

  const clearFilters = () => {
    setSelectedSizes([])
    setSelectedColors([])
    setPriceRange([0, 5000])
  }

  const activeFiltersCount = selectedSizes.length + selectedColors.length + (priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0)

  return (
    <>
      <Header />
      <Cart />
      <main className="pt-20">
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-br from-luxe-cream via-luxe-ivory to-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%232c2c2c" fill-opacity="1" fill-rule="evenodd"/%3E%3C/svg%3E")',
          }} />
          <div className="container-luxe text-center relative">
            <span className="inline-block px-4 py-2 mb-6 text-xs font-medium uppercase tracking-ultra text-luxe-gray border border-luxe-silver/30">
              Premium Selection
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-primary via-luxe-charcoal to-accent-gold bg-clip-text text-transparent">
              {getCategoryTitle()}
            </h1>
            <p className="text-luxe-gray max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              {getCategoryDescription()}
            </p>
          </div>
        </section>

        {/* Toolbar */}
        <div className="border-b border-gray-200 sticky top-16 md:top-20 bg-white/95 backdrop-blur-md z-30 shadow-sm">
          <div className="container-luxe py-5">
            <div className="flex items-center justify-between">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold hover:text-accent-gold transition-colors border border-gray-200 hover:border-accent-gold rounded-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="w-6 h-6 flex items-center justify-center bg-primary text-white text-xs font-bold rounded-full animate-pulse">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Results Count */}
              <span className="text-sm font-medium text-luxe-gray">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </span>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 text-sm font-medium hover:text-accent-gold transition-colors"
                >
                  Sort by: {sortOptions.find(o => o.value === sortBy)?.label}
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform",
                    showSortDropdown && "rotate-180"
                  )} />
                </button>
                {showSortDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowSortDropdown(false)} 
                    />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 shadow-lg z-20">
                      {sortOptions.map(option => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value)
                            setShowSortDropdown(false)
                          }}
                          className={cn(
                            "w-full px-4 py-3 text-left text-sm hover:bg-luxe-cream transition-colors",
                            sortBy === option.value && "font-medium text-accent-gold"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <div className={cn(
          "border-b border-gray-200 overflow-hidden transition-all duration-300",
          showFilters ? "max-h-96" : "max-h-0"
        )}>
          <div className="container-luxe py-6">
            <div className="flex flex-wrap gap-8">
              {/* Size Filter */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={cn(
                        "w-10 h-10 flex items-center justify-center text-sm border transition-all",
                        selectedSizes.includes(size)
                          ? "border-primary bg-primary text-white"
                          : "border-gray-300 hover:border-primary"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map(color => (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-all",
                        selectedColors.includes(color.name)
                          ? "border-primary scale-110"
                          : "border-transparent hover:scale-110"
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">Price Range</h4>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-24 px-3 py-2 border border-gray-300 text-sm"
                    placeholder="Min"
                  />
                  <span className="text-luxe-gray">—</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-24 px-3 py-2 border border-gray-300 text-sm"
                    placeholder="Max"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-sm text-luxe-gray hover:text-primary transition-colors self-end"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <section className="section-spacing">
          <div className="container-luxe">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-luxe-gray mb-4">No products found</p>
                <p className="text-luxe-silver mb-6">Try adjusting your filters to find what you're looking for.</p>
                <button onClick={clearFilters} className="btn-primary">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
