import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { products } from '@/data/products'
import { useCurrency } from '@/context/CurrencyContext'
import { ArrowRight, Sparkles } from 'lucide-react'
import { CountdownTimer } from './CountdownTimer'

export function FlashSale() {
  const { formatPrice } = useCurrency()
  
  // Get sale items
  const saleProducts = products.filter(p => p.badge === 'sale').slice(0, 4)
  
  // Sale ends in 24 hours from now (for demo)
  const saleEndDate = new Date()
  saleEndDate.setHours(saleEndDate.getHours() + 24)

  if (saleProducts.length === 0) return null

  return (
    <section className="py-16 bg-gradient-to-br from-accent-rose/10 via-white to-accent-gold/10 dark:from-accent-rose/5 dark:via-gray-900 dark:to-accent-gold/5">
      <div className="container-luxe">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-rose/10 dark:bg-accent-rose/20 rounded-full mb-4"
          >
            <Sparkles className="w-4 h-4 text-accent-rose" />
            <span className="text-sm font-semibold text-accent-rose uppercase tracking-wider">
              Flash Sale
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold mb-6"
          >
            Limited Time Offers
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <CountdownTimer endDate={saleEndDate} title="Hurry! Sale ends in" />
          </motion.div>
        </div>

        {/* Sale Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          {saleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/product/${product.id}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 px-3 py-1.5 bg-accent-rose text-white text-xs font-bold rounded-full">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <h3 className="font-medium text-sm mb-2 line-clamp-1 group-hover:text-accent-gold transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-accent-rose">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/category/sale"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent-rose text-white font-medium uppercase tracking-wider hover:bg-accent-rose/90 transition-colors rounded-sm"
          >
            View All Sale Items
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
