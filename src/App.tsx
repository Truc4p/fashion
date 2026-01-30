import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { ComparisonProvider } from '@/context/ComparisonContext'
import { RecentlyViewedProvider } from '@/context/RecentlyViewedContext'
import { CurrencyProvider } from '@/context/CurrencyContext'
import { ToastProvider } from '@/context/ToastContext'
import { ScrollRestoration } from '@/components'
import { HomePage, ProductDetailPage, CategoryPage, WishlistPage, AboutPage, CheckoutPage } from '@/pages'

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ToastProvider>
          <CurrencyProvider>
            <RecentlyViewedProvider>
              <ComparisonProvider>
                <WishlistProvider>
                  <CartProvider>
                    <BrowserRouter>
                      <ScrollRestoration />
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/category/:category" element={<CategoryPage />} />
                        <Route path="/new" element={<CategoryPage />} />
                        <Route path="/sale" element={<CategoryPage />} />
                        <Route path="/wishlist" element={<WishlistPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                      </Routes>
                    </BrowserRouter>
                  </CartProvider>
                </WishlistProvider>
              </ComparisonProvider>
            </RecentlyViewedProvider>
          </CurrencyProvider>
        </ToastProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
