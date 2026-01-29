import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  convertPrice: (price: number) => number
  formatPrice: (price: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

const exchangeRates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 148.5,
}

const currencySymbols: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('luxe-currency') as Currency
    return saved || 'USD'
  })

  useEffect(() => {
    localStorage.setItem('luxe-currency', currency)
  }, [currency])

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency)
  }

  const convertPrice = (price: number): number => {
    const converted = price * exchangeRates[currency]
    return Math.round(converted * 100) / 100
  }

  const formatPrice = (price: number): string => {
    const converted = convertPrice(price)
    const symbol = currencySymbols[currency]
    
    if (currency === 'JPY') {
      return `${symbol}${Math.round(converted).toLocaleString()}`
    }
    
    return `${symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
