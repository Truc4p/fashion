import { Link } from 'react-router-dom'
import { Header, Footer, Cart, ProductCard } from '@/components'
import { useWishlist } from '@/context/WishlistContext'
import { Heart, ArrowRight } from 'lucide-react'

export function WishlistPage() {
  const { wishlistItems, clearWishlist } = useWishlist()

  return (
    <>
      <Header />
      <Cart />
      <main className="pt-20">
        {/* Header */}
        <section className="relative bg-gradient-to-br from-luxe-cream via-luxe-ivory to-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23b88e8d" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />
          <div className="container-luxe text-center relative">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-gradient-to-br from-accent-rose to-accent-rose/70 rounded-full shadow-lg animate-pulse">
              <Heart className="w-10 h-10 text-white fill-current" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-accent-rose via-primary to-accent-gold bg-clip-text text-transparent">
              My Wishlist
            </h1>
            <p className="text-luxe-gray max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
              Your curated collection of favorites. Items you love, saved for later.
            </p>
          </div>
        </section>

        {/* Wishlist Content */}
        <section className="section-spacing">
          <div className="container-luxe">
            {wishlistItems.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-200">
                  <p className="text-lg font-medium text-primary">
                    {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
                  </p>
                  <button
                    onClick={clearWishlist}
                    className="text-sm font-medium text-luxe-gray hover:text-accent-rose transition-colors flex items-center gap-2 group"
                  >
                    Clear all
                    <span className="w-4 h-0.5 bg-luxe-gray group-hover:bg-accent-rose transition-colors" />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                  {wishlistItems.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20 max-w-lg mx-auto">
                <div className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-luxe-ivory rounded-full">
                  <Heart className="w-12 h-12 text-luxe-silver" />
                </div>
                <h2 className="text-3xl font-display font-semibold mb-4">
                  Your wishlist is empty
                </h2>
                <p className="text-luxe-gray mb-10 text-lg leading-relaxed">
                  Start adding items you love to your wishlist by clicking the heart icon on any product.
                </p>
                <Link to="/" className="btn-primary inline-flex items-center gap-2 group">
                  Explore Collection
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
