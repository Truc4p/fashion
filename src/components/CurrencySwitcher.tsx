import { Globe } from 'lucide-react'
import { Currency, useCurrency } from '@/context/CurrencyContext'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const currencies: { code: Currency; name: string; flag: string }[] = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
]

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency()
  const [isOpen, setIsOpen] = useState(false)

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        aria-label="Change currency"
      >
        <Globe className="w-4 h-4" />
        <span className="font-medium">{currency}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 py-2">
            {currencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => handleCurrencyChange(curr.code)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                  currency === curr.code && 'bg-gray-50 dark:bg-gray-700/50 font-semibold'
                )}
              >
                <span className="text-xl">{curr.flag}</span>
                <div className="text-left">
                  <div className="font-medium">{curr.code}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{curr.name}</div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
