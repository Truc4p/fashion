import { Header, Hero, Collections, ProductGrid, Newsletter, Footer, Cart, SEO, ScrollToTop, ProductComparison, RecommendedProducts, PromoBar, FlashSale, SocialProof } from '@/components'
import { products } from '@/data/products'
import { useRecentlyViewed } from '@/context/RecentlyViewedContext'
import { getTrendingProducts } from '@/lib/recommendations'

export function HomePage() {
  const { recentlyViewed } = useRecentlyViewed()
  const trendingProducts = getTrendingProducts(products, 6)

  return (
    <>
      <SEO />
      <PromoBar 
        message="✨ New Season Collection - Free Shipping on Orders $200+" 
        link="/category/new"
        linkText="Shop Now"
        variant="gradient"
      />
      <Header />
      <Cart />
      <ProductComparison />
      <ScrollToTop />
      <main>
        <Hero />
        <Collections />
        <FlashSale />
        {trendingProducts.length > 0 && (
          <RecommendedProducts products={trendingProducts} title="Trending Now" />
        )}
        <ProductGrid products={products} />
        <SocialProof />
        {recentlyViewed.length > 0 && (
          <RecommendedProducts products={recentlyViewed} title="Recently Viewed" />
        )}
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
