import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Header, Footer, Cart } from '@/components'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { formatPrice } from '@/lib/utils'
import { ArrowLeft, CreditCard, Truck, ShieldCheck, Check } from 'lucide-react'

export function CheckoutPage() {
  const { state, totalPrice, clearCart } = useCart()
  const toast = useToast()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsProcessing(false)
    clearCart()
    toast.success('Order placed successfully! Thank you for your purchase.')
    navigate('/')
  }

  const shippingCost = totalPrice > 100 ? 0 : 9.99
  const tax = totalPrice * 0.1
  const orderTotal = totalPrice + shippingCost + tax

  if (state.items.length === 0) {
    return (
      <>
        <Header />
        <Cart />
        <main className="pt-20 min-h-screen">
          <div className="container-luxe py-20 text-center">
            <h1 className="text-3xl font-display font-semibold mb-4 dark:text-white">Your cart is empty</h1>
            <p className="text-luxe-gray dark:text-gray-400 mb-8">Add some items to your cart to checkout.</p>
            <Link to="/" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <Cart />
      <main className="pt-20 min-h-screen bg-luxe-ivory dark:bg-gray-900">
        <div className="container-luxe py-12">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-luxe-gray dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <h1 className="text-3xl md:text-4xl font-display font-semibold mb-10 dark:text-white">Checkout</h1>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <div className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 dark:text-white">Contact Information</h2>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>

                {/* Shipping Address */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 dark:text-white">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full mt-4 px-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Postal code"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4 dark:text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment
                  </h2>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Place Order - {formatPrice(orderTotal)}
                    </>
                  )}
                </button>
              </form>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-8 text-luxe-gray dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-sm">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  <span className="text-sm">Free Shipping over $100</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-28 h-fit">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-6 dark:text-white">Order Summary</h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                  {state.items.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                      <div className="w-16 h-20 bg-luxe-ivory dark:bg-gray-700 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium truncate dark:text-white">{item.name}</h3>
                        {(item.selectedSize || item.selectedColor) && (
                          <p className="text-xs text-luxe-gray dark:text-gray-400">
                            {item.selectedSize && `Size: ${item.selectedSize}`}
                            {item.selectedSize && item.selectedColor && ' / '}
                            {item.selectedColor && `Color: ${item.selectedColor}`}
                          </p>
                        )}
                        <p className="text-xs text-luxe-gray dark:text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium dark:text-white">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-luxe-gray dark:text-gray-400">Subtotal</span>
                    <span className="dark:text-white">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-luxe-gray dark:text-gray-400">Shipping</span>
                    <span className="dark:text-white">{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-luxe-gray dark:text-gray-400">Tax (10%)</span>
                    <span className="dark:text-white">{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-3 border-t border-gray-100 dark:border-gray-700">
                    <span className="dark:text-white">Total</span>
                    <span className="dark:text-white">{formatPrice(orderTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
