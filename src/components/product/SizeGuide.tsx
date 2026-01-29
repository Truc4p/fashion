import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Ruler } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SizeGuideProps {
  isOpen: boolean
  onClose: () => void
  category?: 'woman' | 'man' | 'accessories'
}

const womenSizes = {
  headers: ['Size', 'US', 'UK', 'EU', 'Bust (in)', 'Waist (in)', 'Hips (in)'],
  rows: [
    ['XS', '0-2', '4-6', '32-34', '32-33', '24-25', '34-35'],
    ['S', '4-6', '8-10', '36-38', '34-35', '26-27', '36-37'],
    ['M', '8-10', '12-14', '40-42', '36-37', '28-29', '38-39'],
    ['L', '12-14', '16-18', '44-46', '38-40', '30-32', '40-42'],
    ['XL', '16-18', '20-22', '48-50', '41-43', '33-35', '43-45'],
  ]
}

const menSizes = {
  headers: ['Size', 'US/UK', 'EU', 'Chest (in)', 'Waist (in)', 'Neck (in)', 'Sleeve (in)'],
  rows: [
    ['S', '34-36', '44-46', '34-36', '28-30', '14-14.5', '32-33'],
    ['M', '38-40', '48-50', '38-40', '32-34', '15-15.5', '33-34'],
    ['L', '42-44', '52-54', '42-44', '36-38', '16-16.5', '34-35'],
    ['XL', '46-48', '56-58', '46-48', '40-42', '17-17.5', '35-36'],
    ['XXL', '50-52', '60-62', '50-52', '44-46', '18-18.5', '36-37'],
  ]
}

export function SizeGuide({ isOpen, onClose, category = 'woman' }: SizeGuideProps) {
  const [activeTab, setActiveTab] = useState<'women' | 'men'>(
    category === 'man' ? 'men' : 'women'
  )

  const currentSizes = activeTab === 'women' ? womenSizes : menSizes

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl md:max-h-[90vh] bg-white z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Ruler className="w-5 h-5" />
                <h2 className="text-xl font-display font-semibold">Size Guide</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 transition-colors rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              {/* Tabs */}
              <div className="flex gap-4 mb-6 border-b border-gray-100">
                <button
                  onClick={() => setActiveTab('women')}
                  className={cn(
                    'pb-3 text-sm font-medium uppercase tracking-wider transition-colors border-b-2 -mb-px',
                    activeTab === 'women'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-luxe-gray hover:text-primary'
                  )}
                >
                  Women
                </button>
                <button
                  onClick={() => setActiveTab('men')}
                  className={cn(
                    'pb-3 text-sm font-medium uppercase tracking-wider transition-colors border-b-2 -mb-px',
                    activeTab === 'men'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-luxe-gray hover:text-primary'
                  )}
                >
                  Men
                </button>
              </div>

              {/* Size Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-luxe-cream">
                      {currentSizes.headers.map((header, index) => (
                        <th
                          key={header}
                          className={cn(
                            'py-3 px-4 font-medium text-left',
                            index === 0 && 'bg-primary text-white'
                          )}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentSizes.rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="border-b border-gray-100 hover:bg-luxe-cream/50 transition-colors"
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className={cn(
                              'py-3 px-4',
                              cellIndex === 0 && 'font-semibold bg-luxe-ivory'
                            )}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Measurement Tips */}
              <div className="mt-8 p-6 bg-luxe-cream rounded">
                <h3 className="font-semibold mb-4">How to Measure</h3>
                <ul className="space-y-2 text-sm text-luxe-gray">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    <span><strong>Bust/Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    <span><strong>Waist:</strong> Measure around your natural waistline, keeping the tape comfortably loose.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    <span><strong>Hips:</strong> Measure around the fullest part of your hips, about 8" below your waist.</span>
                  </li>
                </ul>
              </div>

              {/* Note */}
              <p className="mt-6 text-xs text-luxe-silver text-center">
                Note: If you're between sizes, we recommend sizing up for a more comfortable fit.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
