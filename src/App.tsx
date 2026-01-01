import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { HomePage, ProductDetailPage, CategoryPage, WishlistPage, AboutPage } from '@/pages'

function App() {
  return (
    <HelmetProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/new" element={<CategoryPage />} />
              <Route path="/sale" element={<CategoryPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </HelmetProvider>
  )
}

export default App
