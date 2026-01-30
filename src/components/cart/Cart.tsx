import { useNavigate } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { formatPrice, cn } from '@/lib/utils'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'

export function Cart() {
  const { state, closeCart, removeItem, updateQuantity, totalPrice, totalItems } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    closeCart()
    navigate('/checkout')
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-50 transition-opacity duration-300',
          state.isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeCart}
      />

      {/* Cart Sidebar */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-gray-900 z-50 shadow-2xl dark:shadow-gray-900/50 transition-transform duration-500 ease-luxe flex flex-col',
          state.isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="text-lg font-display font-semibold dark:text-white">Shopping Cart</h2>
            <span className="text-sm text-luxe-gray dark:text-gray-400">({totalItems})</span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:opacity-70 transition-opacity"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {state.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <ShoppingBag className="w-16 h-16 text-luxe-silver mb-4" />
              <p className="text-luxe-gray mb-6">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="btn-secondary"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {state.items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 aspect-product flex-shrink-0 bg-luxe-ivory overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium mb-1 truncate dark:text-white">{item.name}</h3>
                    {(item.selectedSize || item.selectedColor) && (
                      <p className="text-xs text-luxe-gray dark:text-gray-400 mb-2">
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                        {item.selectedSize && item.selectedColor && ' / '}
                        {item.selectedColor && `Color: ${item.selectedColor}`}
                      </p>
                    )}
                    <p className="text-sm font-semibold mb-3 dark:text-white">{formatPrice(item.price)}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 dark:border-gray-600">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center text-sm dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-luxe-gray hover:text-primary underline transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-gray-100 dark:border-gray-700 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-luxe-gray dark:text-gray-400">Subtotal</span>
              <span className="text-lg font-semibold dark:text-white">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-luxe-gray dark:text-gray-400">
              Shipping and taxes calculated at checkout.
            </p>
            <button 
              onClick={handleCheckout}
              className="btn-primary w-full"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={closeCart}
              className="btn-ghost w-full"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
