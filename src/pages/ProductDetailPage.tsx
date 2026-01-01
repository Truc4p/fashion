import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Header, Footer, Cart, ProductCard, ProductGallery, SizeGuide, SEO, ProductReviews } from '@/components'
import { products } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { formatPrice, cn } from '@/lib/utils'
import { ChevronLeft, Heart, Share2, Truck, RotateCcw, Shield, Minus, Plus } from 'lucide-react'

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const product = products.find((p) => p.id === Number(id))
  const { addItem } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()

  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  const inWishlist = product ? isInWishlist(product.id) : false

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
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor)
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
        <div className="bg-gradient-to-r from-luxe-cream to-luxe-ivory border-b border-gray-100">
          <div className="container-luxe py-5">
            <nav className="flex items-center gap-3 text-sm">
              <Link to="/" className="text-luxe-gray hover:text-primary transition-colors font-medium">
                Home
              </Link>
              <span className="text-luxe-silver">/</span>
              <span className="text-luxe-gray capitalize font-medium">{product.category}</span>
              <span className="text-luxe-silver">/</span>
              <span className="text-primary font-semibold">{product.name}</span>
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
                  className="inline-flex items-center gap-2 text-sm text-luxe-gray hover:text-primary transition-colors mb-6"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Collection
                </Link>

                {/* Category */}
                <p className="text-xs font-bold uppercase tracking-ultra text-luxe-gray mb-3 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-accent-gold"></span>
                  {product.category}
                </p>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-center gap-4 mb-8 pb-8 border-b-2 border-gray-100">
                  <span className="text-3xl font-bold">
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
                <p className="text-luxe-gray text-lg leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-8 p-6 bg-luxe-cream/50 rounded-sm">
                    <label className="block text-sm font-bold uppercase tracking-wider mb-4">
                      Color: <span className="font-normal text-luxe-gray">{selectedColor}</span>
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
                      <label className="text-sm font-medium uppercase tracking-wider">
                        Size: <span className="font-normal text-luxe-gray">{selectedSize}</span>
                      </label>
                      <button 
                        onClick={() => setShowSizeGuide(true)}
                        className="text-xs text-luxe-gray underline hover:text-primary transition-colors"
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
                              : 'border-gray-200 hover:border-primary'
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
                  <div className="flex items-center border border-gray-200">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-16 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-4 hover:bg-gray-50 transition-colors"
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
                        : "border-gray-200 hover:border-primary hover:text-accent-rose"
                    )}
                    aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className={cn("w-5 h-5", inWishlist && "fill-current")} />
                  </motion.button>

                  {/* Share */}
                  <button
                    className="p-4 border border-gray-200 hover:border-primary transition-colors"
                    aria-label="Share product"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 py-8 border-t border-gray-100">
                  <div className="text-center">
                    <Truck className="w-6 h-6 mx-auto mb-2 text-luxe-gray" />
                    <p className="text-xs text-luxe-gray">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="w-6 h-6 mx-auto mb-2 text-luxe-gray" />
                    <p className="text-xs text-luxe-gray">Easy Returns</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 mx-auto mb-2 text-luxe-gray" />
                    <p className="text-xs text-luxe-gray">Secure Payment</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <ProductReviews productId={product.id} productName={product.name} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="section-spacing bg-luxe-cream">
            <div className="container-luxe">
              <h2 className="text-2xl md:text-3xl font-display font-semibold mb-8 text-center">
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />

      {/* Size Guide Modal */}
      <SizeGuide 
        isOpen={showSizeGuide} 
        onClose={() => setShowSizeGuide(false)}
        category={product.category}
      />
    </>
  )
}
