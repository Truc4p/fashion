import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ThumbsUp, ChevronDown, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Review {
  id: number
  author: string
  rating: number
  date: string
  title: string
  content: string
  verified: boolean
  helpful: number
  size?: string
  fit?: 'small' | 'true' | 'large'
}

interface ProductReviewsProps {
  productId: number
  productName: string
}

// Mock reviews data - In production this would come from an API
const mockReviews: Review[] = [
  {
    id: 1,
    author: 'Sarah M.',
    rating: 5,
    date: '2025-12-15',
    title: 'Absolutely stunning quality',
    content: 'The craftsmanship on this piece is exceptional. The fabric feels luxurious and the fit is perfect. Worth every penny.',
    verified: true,
    helpful: 24,
    size: 'M',
    fit: 'true'
  },
  {
    id: 2,
    author: 'James L.',
    rating: 4,
    date: '2025-12-10',
    title: 'Beautiful but runs slightly large',
    content: 'Love the design and quality. However, I would recommend sizing down if you prefer a more fitted look.',
    verified: true,
    helpful: 18,
    size: 'L',
    fit: 'large'
  },
  {
    id: 3,
    author: 'Emma K.',
    rating: 5,
    date: '2025-12-05',
    title: 'My new favorite piece',
    content: 'I have received so many compliments wearing this. The attention to detail is remarkable. Will definitely purchase more from LUXE.',
    verified: true,
    helpful: 31,
    size: 'S',
    fit: 'true'
  },
]

function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizeClasses[size],
            star <= rating
              ? 'text-accent-gold fill-accent-gold'
              : 'text-gray-200 fill-gray-200'
          )}
        />
      ))}
    </div>
  )
}

export function ProductReviews(_props: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'highest' | 'lowest'>('recent')
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [helpfulReviews, setHelpfulReviews] = useState<number[]>([])

  // In production, use props.productId to fetch reviews from API
  // const { productId, productName } = props

  // Calculate stats
  const averageRating = mockReviews.reduce((acc, r) => acc + r.rating, 0) / mockReviews.length
  const totalReviews = mockReviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: mockReviews.filter(r => r.rating === rating).length,
    percentage: (mockReviews.filter(r => r.rating === rating).length / totalReviews) * 100
  }))

  const sortedReviews = [...mockReviews].sort((a, b) => {
    switch (sortBy) {
      case 'helpful': return b.helpful - a.helpful
      case 'highest': return b.rating - a.rating
      case 'lowest': return a.rating - b.rating
      default: return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  })

  const displayedReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 3)

  const markHelpful = (reviewId: number) => {
    if (!helpfulReviews.includes(reviewId)) {
      setHelpfulReviews([...helpfulReviews, reviewId])
    }
  }

  return (
    <section className="section-spacing border-t border-gray-100 dark:border-gray-700">
      <div className="container-luxe">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Rating Summary */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-display font-semibold mb-6 dark:text-white">Customer Reviews</h2>
            
            {/* Average Rating */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl font-display font-semibold dark:text-white">{averageRating.toFixed(1)}</span>
              <div>
                <StarRating rating={Math.round(averageRating)} size="lg" />
                <p className="text-sm text-luxe-gray dark:text-gray-400 mt-1">
                  Based on {totalReviews} reviews
                </p>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2 mb-8">
              {ratingDistribution.map((item) => (
                <div key={item.rating} className="flex items-center gap-3">
                  <span className="text-sm text-luxe-gray dark:text-gray-400 w-12">{item.rating} star</span>
                  <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 0.5, delay: item.rating * 0.1 }}
                      className="h-full bg-accent-gold"
                    />
                  </div>
                  <span className="text-sm text-luxe-gray dark:text-gray-400 w-8">{item.count}</span>
                </div>
              ))}
            </div>

            {/* Write Review Button */}
            <button className="btn-secondary w-full">
              Write a Review
            </button>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2">
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
              <span className="text-sm text-luxe-gray dark:text-gray-400">{totalReviews} Reviews</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-luxe-gray dark:text-gray-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="text-sm font-medium bg-transparent border-none cursor-pointer focus:outline-none dark:text-white"
                >
                  <option value="recent">Most Recent</option>
                  <option value="helpful">Most Helpful</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                </select>
              </div>
            </div>

            {/* Reviews */}
            <AnimatePresence>
              <div className="space-y-8">
                {displayedReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="pb-8 border-b border-gray-100 dark:border-gray-700 last:border-0"
                  >
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-luxe-ivory dark:bg-gray-700 flex items-center justify-center">
                          <User className="w-5 h-5 text-luxe-gray dark:text-gray-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium dark:text-white">{review.author}</span>
                            {review.verified && (
                              <span className="text-xs text-accent-gold font-medium">✓ Verified Purchase</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-luxe-gray dark:text-gray-400">
                            <span>{new Date(review.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            {review.size && <span>Size: {review.size}</span>}
                          </div>
                        </div>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>

                    {/* Review Content */}
                    <h4 className="font-semibold mb-2 dark:text-white">{review.title}</h4>
                    <p className="text-luxe-gray dark:text-gray-400 leading-relaxed mb-4">{review.content}</p>

                    {/* Fit Indicator */}
                    {review.fit && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs text-luxe-gray dark:text-gray-400">Fit:</span>
                        <div className="flex gap-1">
                          {['small', 'true', 'large'].map((fit) => (
                            <span
                              key={fit}
                              className={cn(
                                'px-2 py-1 text-xs rounded',
                                review.fit === fit
                                  ? 'bg-primary text-white'
                                  : 'bg-gray-100 dark:bg-gray-700 text-luxe-gray dark:text-gray-400'
                              )}
                            >
                              {fit === 'true' ? 'True to size' : fit === 'small' ? 'Runs small' : 'Runs large'}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Helpful Button */}
                    <button
                      onClick={() => markHelpful(review.id)}
                      disabled={helpfulReviews.includes(review.id)}
                      className={cn(
                        'flex items-center gap-2 text-sm transition-colors',
                        helpfulReviews.includes(review.id)
                          ? 'text-accent-gold cursor-default'
                          : 'text-luxe-gray dark:text-gray-400 hover:text-primary dark:hover:text-white'
                      )}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>
                        Helpful ({review.helpful + (helpfulReviews.includes(review.id) ? 1 : 0)})
                      </span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            {/* Show More Button */}
            {totalReviews > 3 && (
              <motion.button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="flex items-center gap-2 mx-auto mt-8 text-sm font-medium hover:text-accent-gold transition-colors dark:text-white"
              >
                {showAllReviews ? 'Show Less' : `View All ${totalReviews} Reviews`}
                <ChevronDown className={cn(
                  'w-4 h-4 transition-transform',
                  showAllReviews && 'rotate-180'
                )} />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
