import { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Header, Footer, Cart, ProductGallery, SizeGuide, SEO, ProductReviews, ScrollToTop, ProductComparison, RecommendedProducts } from '@/components'
import { products } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useRecentlyViewed } from '@/context/RecentlyViewedContext'
import { useComparison } from '@/context/ComparisonContext'
import { formatPrice, cn } from '@/lib/utils'
import { getRecommendedProducts } from '@/lib/recommendations'
import { ChevronLeft, Heart, Share2, Truck, RotateCcw, Shield, Minus, Plus, Scale } from 'lucide-react'

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const product = products.find((p) => p.id === Number(id))
  const { addItem } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addToRecentlyViewed } = useRecentlyViewed()
  const { addToComparison, isInComparison } = useComparison()

  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  const inWishlist = product ? isInWishlist(product.id) : false
  const inComparison = product ? isInComparison(product.id) : false

  useEffect(() => {
    console.log('ProductDetailPage: component mounted, id =', id)
    console.log('ProductDetailPage: location =', location.pathname)
    return () => {
      console.log('ProductDetailPage: component unmounted')
    }
  }, [])

  useEffect(() => {
    console.log('ProductDetailPage: id changed to', id)
    console.log('ProductDetailPage: current pathname', location.pathname)
  }, [id, location.pathname])

  console.log('ProductDetailPage: rendering with id =', id)

  // Add to recently viewed when product loads
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id])

  // Reset selections when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || '')
      setSelectedColor(product.colors?.[0]?.name || '')
      setQuantity(1)
    }
  }, [product])

  if (!product) {
    return (
      <>
        <Header />
        <Cart />
        <ScrollToTop />
        <ProductComparison />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-display font-semibold mb-4">Product Not Found</h1>
            <Link to="/" className="btn-primary">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const productImages = product.images || [product.image]
  const recommendedProducts = getRecommendedProducts(product, products, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <>
      <SEO 
        title={product.name}
        description={product.description}
        image={product.image}
        type="product"
        product={{
          price: product.price,
          currency: 'USD',
          availability: 'in stock',
          brand: 'LUXE',
          category: product.category
        }}
      />
      <Header />
      <Cart />
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-gradient-to-r from-luxe-cream to-luxe-ivory dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-700">
          <div className="container-luxe py-5">
            <nav className="flex items-center gap-3 text-sm">
              <Link to="/" className="text-luxe-gray dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors font-medium">
                Home
              </Link>
              <span className="text-luxe-silver dark:text-gray-600">/</span>
              <span className="text-luxe-gray dark:text-gray-400 capitalize font-medium">{product.category}</span>
              <span className="text-luxe-silver dark:text-gray-600">/</span>
              <span className="text-primary dark:text-white font-semibold">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Detail */}
        <section className="section-spacing">
          <div className="container-luxe">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Product Images with Zoom Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <ProductGallery 
                  images={productImages} 
                  productName={product.name}
                  badge={product.badge}
                />
              </motion.div>

              {/* Product Info */}
              <motion.div 
                className="lg:py-8"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Back Link */}
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm text-luxe-gray dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors mb-6"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Collection
                </Link>

                {/* Category */}
                <p className="text-xs font-bold uppercase tracking-ultra text-luxe-gray dark:text-gray-400 mb-3 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-accent-gold"></span>
                  {product.category}
                </p>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight dark:text-white">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-center gap-4 mb-8 pb-8 border-b-2 border-gray-100 dark:border-gray-700">
                  <span className="text-3xl font-bold dark:text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-luxe-silver line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="px-3 py-1.5 text-xs font-bold bg-accent-rose text-white rounded-sm">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-luxe-gray dark:text-gray-400 text-lg leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-8 p-6 bg-luxe-cream/50 dark:bg-gray-800/50 rounded-sm">
                    <label className="block text-sm font-bold uppercase tracking-wider mb-4 dark:text-white">
                      Color: <span className="font-normal text-luxe-gray dark:text-gray-400">{selectedColor}</span>
                    </label>
                    <div className="flex gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={cn(
                            'w-12 h-12 rounded-full border-3 transition-all duration-300 hover:scale-110',
                            selectedColor === color.name
                              ? 'border-primary scale-110 shadow-lg'
                              : 'border-gray-300 hover:border-gray-400'
                          )}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium uppercase tracking-wider dark:text-white">
                        Size: <span className="font-normal text-luxe-gray dark:text-gray-400">{selectedSize}</span>
                      </label>
                      <button 
                        onClick={() => setShowSizeGuide(true)}
                        className="text-xs text-luxe-gray dark:text-gray-400 underline hover:text-primary dark:hover:text-white transition-colors"
                      >
                        Size Guide
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={cn(
                            'min-w-[3rem] px-4 py-3 text-sm font-medium border transition-all',
                            selectedSize === size
                              ? 'bg-primary text-white border-primary'
                              : 'border-gray-200 dark:border-gray-600 hover:border-primary dark:text-white'
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  {/* Quantity */}
                  <div className="flex items-center border border-gray-200 dark:border-gray-600">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-16 text-center font-medium dark:text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="btn-primary flex-1"
                  >
                    Add to Cart
                  </button>

                  {/* Wishlist */}
                  <motion.button
                    onClick={() => toggleWishlist(product)}
                    whileTap={{ scale: 0.9 }}
                    className={cn(
                      "p-4 border transition-colors",
                      inWishlist
                        ? "border-accent-rose bg-accent-rose text-white"
                        : "border-gray-200 dark:border-gray-600 hover:border-primary hover:text-accent-rose dark:text-white"
                    )}
                    aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className={cn("w-5 h-5", inWishlist && "fill-current")} />
                  </motion.button>

                  {/* Compare */}
                  <motion.button
                    onClick={() => addToComparison(product)}
                    whileTap={{ scale: 0.9 }}
                    className={cn(
                      "p-4 border transition-colors",
                      inComparison
                        ? "border-accent-gold bg-accent-gold text-white"
                        : "border-gray-200 dark:border-gray-600 hover:border-primary hover:text-accent-gold dark:text-white"
                    )}
                    aria-label={inComparison ? "In comparison" : "Add to comparison"}
                    disabled={inComparison}
                  >
                    <Scale className="w-5 h-5" />
                  </motion.button>

                  {/* Share */}
                  <button
                    onClick={handleShare}
                    className="p-4 border border-gray-200 dark:border-gray-600 hover:border-primary transition-colors dark:text-white"
                    aria-label="Share product"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 py-8 border-t border-gray-100 dark:border-gray-700">
                  <div className="text-center">
                    <Truck className="w-6 h-6 mx-auto mb-2 text-luxe-gray dark:text-gray-400" />
                    <p className="text-xs text-luxe-gray dark:text-gray-400">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="w-6 h-6 mx-auto mb-2 text-luxe-gray dark:text-gray-400" />
                    <p className="text-xs text-luxe-gray dark:text-gray-400">Easy Returns</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 mx-auto mb-2 text-luxe-gray dark:text-gray-400" />
                    <p className="text-xs text-luxe-gray dark:text-gray-400">Secure Payment</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <ProductReviews productId={product.id} productName={product.name} />

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <RecommendedProducts products={recommendedProducts} title="You May Also Like" />
        )}
      </main>
      <Footer />
      <ScrollToTop />
      <ProductComparison />

      {/* Size Guide Modal */}
      <SizeGuide 
        isOpen={showSizeGuide} 
        onClose={() => setShowSizeGuide(false)}
        category={product.category}
      />
    </>
  )
}
