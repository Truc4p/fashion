import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useComparison } from '@/context/ComparisonContext'
import { useCurrency } from '@/context/CurrencyContext'
import { cn } from '@/lib/utils'
import { ShoppingBag, Heart, Scale } from 'lucide-react'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addToComparison, isInComparison } = useComparison()
  const { formatPrice } = useCurrency()
  const inWishlist = isInWishlist(product.id)
  const inComparison = isInComparison(product.id)

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: (index % 4) * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <motion.div 
          className="relative aspect-product overflow-hidden bg-luxe-ivory dark:bg-gray-800 mb-5 rounded-sm shadow-sm group-hover:shadow-luxe-lg transition-all duration-500"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Badge */}
          {product.badge && (
            <span
              className={cn(
                'absolute top-4 left-4 px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm',
                product.badge === 'new'
                  ? 'bg-primary/90 text-white'
                  : 'bg-accent-rose/90 text-white'
              )}
            >
              {product.badge === 'new' ? 'New' : 'Sale'}
            </span>
          )}

          {/* Quick Actions - Appear on Hover */}
          <div className="absolute inset-x-4 bottom-4 flex gap-2 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                addItem(product)
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/95 backdrop-blur-md text-primary text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
            <motion.button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleWishlist(product)
              }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "p-3 backdrop-blur-md transition-colors shadow-lg",
                inWishlist
                  ? "bg-accent-rose text-white"
                  : "bg-white/95 text-primary hover:bg-primary hover:text-white"
              )}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("w-4 h-4", inWishlist && "fill-current")} />
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                addToComparison(product)
              }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "p-3 backdrop-blur-md transition-colors shadow-lg",
                inComparison
                  ? "bg-accent-gold text-white"
                  : "bg-white/95 text-primary hover:bg-primary hover:text-white"
              )}
              aria-label={inComparison ? "In comparison" : "Add to comparison"}
              disabled={inComparison}
            >
              <Scale className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Product Info */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-ultra text-luxe-gray dark:text-gray-400">
            {product.category}
          </span>
          <h3 className="text-base font-semibold text-primary dark:text-white group-hover:text-accent-gold transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
          <div className="flex items-center gap-3 pt-1">
            <span className="text-base font-bold dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-luxe-silver line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
