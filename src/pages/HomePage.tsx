import { Header, Hero, Collections, ProductGrid, Newsletter, Footer, Cart, SEO } from '@/components'
import { products } from '@/data/products'

export function HomePage() {
  return (
    <>
      <SEO />
      <Header />
      <Cart />
      <main>
        <Hero />
        <Collections />
        <ProductGrid products={products} />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
