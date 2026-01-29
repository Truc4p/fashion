import { Link } from 'react-router-dom'
import { collections } from '@/data/products'
import { ArrowRight } from 'lucide-react'

export function Collections() {
  return (
    <section className="section-spacing bg-gradient-to-b from-luxe-cream to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container-luxe">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block px-4 py-2 mb-4 text-xs font-medium uppercase tracking-ultra text-luxe-gray dark:text-gray-400 border border-luxe-silver/30 dark:border-gray-600">
            Signature Styles
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-6 dark:text-white">
            Curated Collections
          </h2>
          <p className="text-lg text-luxe-gray dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Discover our signature pieces, thoughtfully designed for the modern individual
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              to={collection.link}
              className={`group relative overflow-hidden rounded-sm hover:shadow-2xl transition-all duration-500 ${
                index === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  index === 0 ? 'aspect-[3/4] lg:aspect-auto lg:h-full' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                  <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                    <h3 className="text-2xl md:text-3xl font-display font-semibold text-white mb-3">
                      {collection.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/90 text-sm font-medium uppercase tracking-wider group-hover:text-accent-gold transition-colors duration-300">
                      <span>Discover More</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
