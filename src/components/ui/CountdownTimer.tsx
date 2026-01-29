import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  endDate: Date
  title?: string
  onExpire?: () => void
}

export function CountdownTimer({ endDate, title = 'Sale Ends In', onExpire }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime()
      
      if (difference <= 0) {
        setIsExpired(true)
        onExpire?.()
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate, onExpire])

  if (isExpired) {
    return (
      <div className="text-center py-4">
        <p className="text-lg font-medium text-gray-500 dark:text-gray-400">Sale has ended</p>
      </div>
    )
  }

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-primary dark:bg-white text-white dark:text-primary rounded-lg shadow-lg">
        <span className="text-2xl md:text-3xl font-bold font-mono">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 font-medium">
        {label}
      </span>
    </div>
  )

  return (
    <div className="text-center">
      {title && (
        <h3 className="text-lg md:text-xl font-display font-semibold mb-6 text-gray-800 dark:text-white">
          {title}
        </h3>
      )}
      <div className="flex justify-center gap-3 md:gap-4">
        <TimeBlock value={timeLeft.days} label="Days" />
        <div className="flex items-center text-2xl font-bold text-gray-400 pt-4">:</div>
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <div className="flex items-center text-2xl font-bold text-gray-400 pt-4">:</div>
        <TimeBlock value={timeLeft.minutes} label="Mins" />
        <div className="flex items-center text-2xl font-bold text-gray-400 pt-4">:</div>
        <TimeBlock value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  )
}
