import { useState, useEffect } from 'react'
import { X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface PromoBarProps {
  message: string
  link?: string
  linkText?: string
  expiresAt?: Date
  variant?: 'gold' | 'dark' | 'gradient'
}

export function PromoBar({
  message,
  link,
  linkText = 'Shop Now',
  expiresAt,
  variant = 'gold'
}: PromoBarProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState<{
    hours: number
    minutes: number
    seconds: number
  } | null>(null)

  useEffect(() => {
    if (!expiresAt) return

    const calculateTimeLeft = () => {
      const difference = expiresAt.getTime() - new Date().getTime()
      if (difference > 0) {
        return {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }
      return null
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft()
      setTimeLeft(remaining)
      if (!remaining) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [expiresAt])

  const variantClasses = {
    gold: 'bg-accent-gold text-white',
    dark: 'bg-primary text-white',
    gradient: 'bg-gradient-to-r from-primary via-accent-gold to-accent-rose text-white'
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className={cn('relative overflow-hidden', variantClasses[variant])}
      >
        <div className="container-luxe py-2.5">
          <div className="flex items-center justify-center gap-4 text-sm">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="font-medium">{message}</span>
            
            {timeLeft && (
              <div className="flex items-center gap-1 font-mono">
                <span className="bg-white/20 px-2 py-0.5 rounded">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span>:</span>
                <span className="bg-white/20 px-2 py-0.5 rounded">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span>:</span>
                <span className="bg-white/20 px-2 py-0.5 rounded">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            )}

            {link && (
              <a
                href={link}
                className="underline underline-offset-4 hover:opacity-80 transition-opacity font-semibold"
              >
                {linkText}
              </a>
            )}
          </div>
        </div>
        
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
          aria-label="Close promotion"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
