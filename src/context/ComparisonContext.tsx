import { createContext, useContext, useState, ReactNode } from 'react'
import { Product } from '@/types'

interface ComparisonContextType {
  comparisonItems: Product[]
  addToComparison: (product: Product) => void
  removeFromComparison: (productId: number) => void
  clearComparison: () => void
  isInComparison: (productId: number) => boolean
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

const MAX_COMPARISON_ITEMS = 4

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparisonItems, setComparisonItems] = useState<Product[]>([])

  const addToComparison = (product: Product) => {
    if (comparisonItems.length >= MAX_COMPARISON_ITEMS) {
      alert(`You can only compare up to ${MAX_COMPARISON_ITEMS} items`)
      return
    }
    if (!comparisonItems.find((item) => item.id === product.id)) {
      setComparisonItems((prev) => [...prev, product])
    }
  }

  const removeFromComparison = (productId: number) => {
    setComparisonItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const clearComparison = () => {
    setComparisonItems([])
  }

  const isInComparison = (productId: number) => {
    return comparisonItems.some((item) => item.id === productId)
  }

  return (
    <ComparisonContext.Provider
      value={{
        comparisonItems,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider')
  }
  return context
}
