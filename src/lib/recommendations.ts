import { Product } from '@/types'

export function getRecommendedProducts(
  currentProduct: Product,
  allProducts: Product[],
  limit: number = 4
): Product[] {
  // Exclude the current product
  const otherProducts = allProducts.filter(p => p.id !== currentProduct.id)
  
  // Score-based recommendation
  const scoredProducts = otherProducts.map(product => {
    let score = 0
    
    // Same category gets high score
    if (product.category === currentProduct.category) {
      score += 10
    }
    
    // Similar price range (within 30%)
    const priceDiff = Math.abs(product.price - currentProduct.price) / currentProduct.price
    if (priceDiff < 0.3) {
      score += 5
    } else if (priceDiff < 0.5) {
      score += 2
    }
    
    // New products get bonus
    if (product.new) {
      score += 3
    }
    
    // Sale items get small bonus
    if (product.badge === 'sale') {
      score += 2
    }
    
    // Common colors
    if (currentProduct.colors && product.colors) {
      const commonColors = currentProduct.colors.filter(c1 =>
        product.colors?.some(c2 => c2.hex === c1.hex)
      )
      score += commonColors.length * 2
    }
    
    return { product, score }
  })
  
  // Sort by score and return top results
  return scoredProducts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.product)
}

export function getSimilarProducts(
  products: Product[],
  category: string,
  excludeId?: number,
  limit: number = 4
): Product[] {
  return products
    .filter(p => p.category === category && p.id !== excludeId)
    .slice(0, limit)
}

export function getTrendingProducts(products: Product[], limit: number = 6): Product[] {
  // Get new and sale items as "trending"
  const trending = products.filter(p => p.new || p.badge === 'sale')
  return trending.slice(0, limit)
}

export function getNewArrivals(products: Product[], limit: number = 8): Product[] {
  return products.filter(p => p.new).slice(0, limit)
}

export function getBestSellers(products: Product[], limit: number = 6): Product[] {
  // For demo, return products without sale badge as "best sellers"
  return products.filter(p => !p.badge || p.badge !== 'sale').slice(0, limit)
}
