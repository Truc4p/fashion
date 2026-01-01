import { motion } from 'framer-motion'
import { Header, Footer, Cart, SEO, FadeIn } from '@/components'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const values = [
  {
    title: 'Craftsmanship',
    description: 'Every piece is meticulously crafted by skilled artisans using time-honored techniques passed down through generations.',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80'
  },
  {
    title: 'Sustainability',
    description: 'We are committed to ethical sourcing and sustainable practices, ensuring our impact on the planet is minimal.',
    image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=600&q=80'
  },
  {
    title: 'Timelessness',
    description: 'Our designs transcend seasonal trends, creating pieces that remain elegant and relevant for years to come.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80'
  }
]

const timeline = [
  { year: '2010', event: 'LUXE was founded in Paris with a vision to redefine modern elegance.' },
  { year: '2014', event: 'Opened our flagship atelier in Milan, home to our master craftsmen.' },
  { year: '2017', event: 'Launched our sustainable fashion initiative with 100% traceable materials.' },
  { year: '2020', event: 'Expanded globally with boutiques in New York, Tokyo, and London.' },
  { year: '2024', event: 'Introduced our digital-first experience while maintaining artisanal quality.' },
]

export function AboutPage() {
  return (
    <>
      <SEO 
        title="About Us"
        description="Discover the story behind LUXE. Our commitment to craftsmanship, sustainability, and timeless elegance defines everything we create."
      />
      <Header />
      <Cart />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[75vh] min-h-[500px] max-h-[800px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
              alt="LUXE Atelier"
              className="w-full h-full object-cover scale-105 animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          
          <div className="relative h-full container-luxe flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="inline-block px-5 py-2.5 mb-8 text-xs font-bold uppercase tracking-ultra text-white/95 border-2 border-white/40 backdrop-blur-md">
                Our Story
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-white mb-8 leading-[0.95] text-shadow-lg">
                Where Artistry
                <br />
                Meets Elegance
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed text-shadow-sm">
                For over a decade, LUXE has been synonymous with uncompromising quality and timeless design.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="section-spacing">
          <div className="container-luxe">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="left">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                    alt="Craftsmanship"
                    className="w-full aspect-[4/5] object-cover"
                  />
                  <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent-gold/10 -z-10" />
                </div>
              </FadeIn>
              
              <FadeIn direction="right" delay={0.2}>
                <div className="lg:pl-8">
                  <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
                    A Philosophy of Excellence
                  </h2>
                  <p className="text-luxe-gray leading-relaxed mb-6">
                    At LUXE, we believe that true luxury lies in the details. Every stitch, every seam, every choice of fabric is a deliberate act of creation. Our pieces are not merely garments—they are expressions of artistry, designed to elevate the everyday into the extraordinary.
                  </p>
                  <p className="text-luxe-gray leading-relaxed mb-8">
                    Founded on the principles of quality over quantity, we take pride in our slow fashion approach. Each collection is thoughtfully curated, ensuring that every piece that bears our name meets the highest standards of craftsmanship.
                  </p>
                  <div className="flex items-center gap-8 pt-6 border-t border-gray-100">
                    <div>
                      <span className="block text-3xl font-display font-semibold text-accent-gold">15+</span>
                      <span className="text-sm text-luxe-gray">Years of Excellence</span>
                    </div>
                    <div>
                      <span className="block text-3xl font-display font-semibold text-accent-gold">50+</span>
                      <span className="text-sm text-luxe-gray">Master Artisans</span>
                    </div>
                    <div>
                      <span className="block text-3xl font-display font-semibold text-accent-gold">12</span>
                      <span className="text-sm text-luxe-gray">Global Boutiques</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-spacing bg-gradient-to-b from-luxe-cream to-white">
          <div className="container-luxe">
            <FadeIn>
              <div className="text-center mb-20">
                <span className="inline-block px-4 py-2 mb-4 text-xs font-bold uppercase tracking-ultra text-luxe-gray border border-luxe-silver/30">
                  What We Stand For
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-6">
                  Our Values
                </h2>
                <p className="text-lg text-luxe-gray max-w-3xl mx-auto leading-relaxed">
                  The principles that guide everything we create
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
              {values.map((value, index) => (
                <FadeIn key={value.title} delay={index * 0.15}>
                  <div className="group hover-lift bg-white rounded-sm overflow-hidden shadow-lg">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={value.image}
                        alt={value.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-display font-semibold mb-4 group-hover:text-accent-gold transition-colors">{value.title}</h3>
                      <p className="text-luxe-gray leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="section-spacing">
          <div className="container-luxe">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
                  Our Journey
                </h2>
                <p className="text-luxe-gray max-w-2xl mx-auto">
                  From a small Parisian atelier to a global presence
                </p>
              </div>
            </FadeIn>

            <div className="max-w-3xl mx-auto">
              {timeline.map((item, index) => (
                <FadeIn key={item.year} delay={index * 0.1}>
                  <div className="flex gap-8 mb-8 last:mb-0">
                    <div className="flex-shrink-0 w-20">
                      <span className="text-2xl font-display font-semibold text-accent-gold">
                        {item.year}
                      </span>
                    </div>
                    <div className="flex-1 pb-8 border-b border-gray-100 last:border-0">
                      <p className="text-luxe-gray">{item.event}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80"
              alt="Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/80" />
          </div>
          
          <div className="relative container-luxe text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-white mb-6">
                Experience the LUXE Difference
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                Discover our curated collection of timeless pieces, crafted for those who appreciate the finest things in life.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary text-sm font-medium uppercase tracking-widest hover:bg-accent-gold hover:text-white transition-all duration-300 group"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
