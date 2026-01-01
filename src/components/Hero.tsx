import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { heroSlides } from '@/data/products'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => setCurrentSlide(index)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-all duration-1000',
            currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          )}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full container-luxe flex items-center">
            <div
              className={cn(
                'max-w-2xl transition-all duration-700 delay-300',
                isLoaded && currentSlide === index
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              )}
            >
              <span className="inline-block px-5 py-2.5 mb-8 text-xs font-medium uppercase tracking-ultra text-white/95 border-2 border-white/40 backdrop-blur-md hover:border-accent-gold hover:text-accent-gold transition-all duration-300">
                {slide.badge}
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-white mb-6 leading-[0.95] text-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-light mb-10 leading-relaxed max-w-xl text-shadow-sm">
                {slide.subtitle}
              </p>
              <a
                href="#products"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary text-sm font-semibold uppercase tracking-widest hover:bg-accent-gold hover:text-white hover:shadow-2xl hover:shadow-accent-gold/30 transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10">{slide.cta}</span>
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2 relative z-10" />
                <span className="absolute inset-0 bg-accent-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-primary hover:border-white hover:scale-110 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-primary hover:border-white hover:scale-110 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 backdrop-blur-sm bg-black/10 px-6 py-3 rounded-full">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative group"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className={cn(
              'w-14 h-1.5 rounded-full transition-all duration-300',
              currentSlide === index ? 'bg-white' : 'bg-white/30 group-hover:bg-white/50'
            )}>
              {currentSlide === index && (
                <div className="h-full bg-accent-gold rounded-full animate-pulse" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 right-8 hidden lg:flex flex-col items-center gap-3 text-white/70">
        <span className="text-xs font-medium tracking-widest rotate-90 translate-y-8 animate-pulse">SCROLL</span>
        <div className="w-0.5 h-16 bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  )
}
