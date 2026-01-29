import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, ShoppingBag, Share2, ZoomIn } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice, cn } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useToast } from '@/context/ToastContext'
import { Link } from 'react-router-dom'

interface QuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { addItem } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const toast = useToast()

  useEffect(() => {
    if (product && isOpen) {
      setSelectedSize(product.sizes?.[0] || '')
      setSelectedColor(product.colors?.[0]?.name || '')
      setCurrentImageIndex(0)
    }
  }, [product, isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!product) return null

  const productImages = product.images || [product.image]
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor)
    toast.success('Added to cart!')
  }

  const handleWishlistToggle = () => {
    toggleWishlist(product)
    if (inWishlist) {
      toast.info('Removed from wishlist')
    } else {
      toast.success('Added to wishlist!')
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.origin + `/product/${product.id}`
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      navigator.clipboard.writeText(window.location.origin + `/product/${product.id}`)
      toast.success('Link copied to clipboard!')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8 overflow-y-auto max-h-[90vh]">
                {/* Left: Images */}
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden group">
                    <img
                      src={productImages[currentImageIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {product.badge && (
                      <span className={cn(
                        'absolute top-4 left-4 px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full',
                        product.badge === 'new' ? 'bg-black text-white' : 'bg-red-500 text-white'
                      )}>
                        {product.badge}
                      </span>
                    )}
                    <Link
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                      title="View full details"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </Link>
                  </div>

                  {/* Thumbnail Gallery */}
                  {productImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {productImages.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={cn(
                            'flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-all',
                            currentImageIndex === index
                              ? 'border-black ring-2 ring-black ring-offset-2'
                              : 'border-gray-200 hover:border-gray-400'
                          )}
                        >
                          <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Details */}
                <div className="flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-display font-semibold mb-2">
                        {product.name}
                      </h2>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-semibold">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-400 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {product.description && (
                    <p className="text-gray-600 mb-6">{product.description}</p>
                  )}

                  {/* Color Selection */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-3">
                        Color: {selectedColor}
                      </label>
                      <div className="flex gap-2">
                        {product.colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => setSelectedColor(color.name)}
                            className={cn(
                              'w-10 h-10 rounded-full border-2 transition-all',
                              selectedColor === color.name
                                ? 'border-black ring-2 ring-black ring-offset-2'
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
                      <label className="block text-sm font-medium mb-3">
                        Size: {selectedSize}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={cn(
                              'px-4 py-2 border rounded-lg text-sm font-medium transition-all',
                              selectedSize === size
                                ? 'border-black bg-black text-white'
                                : 'border-gray-300 hover:border-black'
                            )}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto pt-6 border-t">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 btn-primary flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      Add to Cart
                    </button>
                    <button
                      onClick={handleWishlistToggle}
                      className={cn(
                        'p-3 border rounded-xl transition-all',
                        inWishlist
                          ? 'border-red-500 bg-red-50 text-red-500'
                          : 'border-gray-300 hover:border-black'
                      )}
                    >
                      <Heart className={cn('w-5 h-5', inWishlist && 'fill-current')} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-3 border border-gray-300 hover:border-black rounded-xl transition-all"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  <Link
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="mt-4 text-sm text-center text-gray-600 hover:text-black transition-colors underline"
                  >
                    View full product details
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
