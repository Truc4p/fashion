import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useComparison } from '@/context/ComparisonContext'
import { cn } from '@/lib/utils'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { Search, User, ShoppingBag, Menu, X, Heart, Scale } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { CurrencySwitcher } from '@/components/ui/CurrencySwitcher'

const navLinks = [
  { href: '/category/woman', label: 'Woman' },
  { href: '/category/man', label: 'Man' },
  { href: '/category/kids', label: 'Kids' },
  { href: '/category/new', label: 'New Collection' },
  { href: '/category/sale', label: 'Sale' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { toggleCart, totalItems } = useCart()
  const { totalWishlistItems } = useWishlist()
  const { comparisonItems } = useComparison()
  const navigate = useNavigate()

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const query = searchQuery.toLowerCase()
    return products
      .filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      )
      .slice(0, 6)
  }, [searchQuery])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchClose = () => {
    setIsSearchOpen(false)
    setSearchQuery('')
  }

  const handleProductClick = (productId: number) => {
    handleSearchClose()
    navigate(`/product/${productId}`)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm dark:shadow-gray-900/50'
            : 'bg-white dark:bg-gray-900'
        )}
      >
        <div className="container-luxe">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:opacity-70 transition-opacity dark:text-white"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="text-2xl md:text-3xl font-display font-bold tracking-widest text-gradient"
            >
              LUXE
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="relative text-xs font-medium uppercase tracking-widest text-primary/80 dark:text-white/80 hover:text-primary dark:hover:text-white transition-colors group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <CurrencySwitcher />
              <ThemeToggle />
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:opacity-70 transition-opacity dark:text-white"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                to="/wishlist"
                className="relative p-2 hover:opacity-70 transition-opacity dark:text-white"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-2xs font-medium bg-accent-rose text-white rounded-full">
                    {totalWishlistItems}
                  </span>
                )}
              </Link>
              {comparisonItems.length > 0 && (
                <div className="relative p-2 hover:opacity-70 transition-opacity dark:text-white">
                  <Scale className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-2xs font-medium bg-accent-gold text-white rounded-full">
                    {comparisonItems.length}
                  </span>
                </div>
              )}
              <button
                className="hidden sm:block p-2 hover:opacity-70 transition-opacity dark:text-white"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={toggleCart}
                className="relative p-2 hover:opacity-70 transition-opacity dark:text-white"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-2xs font-medium bg-primary text-white rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <div
        className={cn(
          'fixed inset-0 z-[60] transition-all duration-300',
          isSearchOpen ? 'visible' : 'invisible'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 bg-black/50 transition-opacity duration-300',
            isSearchOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={handleSearchClose}
        />
        <div
          className={cn(
            'absolute top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-900/50 transition-transform duration-300',
            isSearchOpen ? 'translate-y-0' : '-translate-y-full'
          )}
        >
          <div className="container-luxe py-6">
            <div className="flex items-center gap-4">
              <Search className="w-5 h-5 text-luxe-gray" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-3 text-lg font-light border-none outline-none placeholder:text-luxe-silver dark:text-white dark:placeholder:text-gray-500 bg-transparent"
                autoFocus={isSearchOpen}
              />
              <button
                onClick={handleSearchClose}
                className="p-2 hover:opacity-70 transition-opacity"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search Results */}
            {searchQuery.trim() && (
              <div className="mt-6 border-t border-gray-100 dark:border-gray-700 pt-6">
                {searchResults.length > 0 ? (
                  <>
                    <p className="text-sm text-luxe-gray mb-4">
                      {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {searchResults.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleProductClick(product.id)}
                          className="group text-left"
                        >
                          <div className="aspect-product bg-luxe-ivory mb-2 overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <h4 className="text-sm font-medium line-clamp-1 group-hover:text-accent-gold transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-sm text-luxe-gray">
                            {formatPrice(product.price)}
                          </p>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-luxe-gray mb-2">No results found for "{searchQuery}"</p>
                    <p className="text-sm text-luxe-silver">Try searching for something else</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-[60] lg:hidden transition-all duration-300',
          isMobileMenuOpen ? 'visible' : 'invisible'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 bg-black/50 transition-opacity duration-300',
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={cn(
            'absolute top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-xl dark:shadow-gray-900/50 transition-transform duration-300',
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <span className="text-2xl font-display font-bold tracking-widest text-gradient">
                LUXE
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:opacity-70 transition-opacity"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 text-sm font-medium uppercase tracking-widest text-primary/80 dark:text-white/80 hover:text-primary dark:hover:text-white border-b border-gray-100 dark:border-gray-700 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
