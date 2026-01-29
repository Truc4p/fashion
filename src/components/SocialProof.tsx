import { motion } from 'framer-motion'
import { Star, Users, Package, Award } from 'lucide-react'

const stats = [
  { icon: Users, value: '50K+', label: 'Happy Customers', color: 'text-blue-500' },
  { icon: Star, value: '4.9', label: 'Average Rating', color: 'text-yellow-500' },
  { icon: Package, value: '100K+', label: 'Products Delivered', color: 'text-green-500' },
  { icon: Award, value: '10+', label: 'Years of Excellence', color: 'text-purple-500' },
]

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Fashion Blogger',
    content: 'LUXE has completely transformed my wardrobe. The quality is unmatched and the customer service is exceptional.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
  },
  {
    name: 'James L.',
    role: 'Business Executive',
    content: 'Finally found a brand that understands modern elegance. Every piece feels luxurious and fits perfectly.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
  },
  {
    name: 'Emma K.',
    role: 'Creative Director',
    content: 'The attention to detail in every garment is remarkable. LUXE has become my go-to for all occasions.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5,
  },
]

export function SocialProof() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container-luxe">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-lg mb-4 ${stat.color}`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div className="text-3xl md:text-4xl font-display font-bold mb-2 dark:text-white">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-ultra text-accent-gold mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold dark:text-white">
            What Our Customers Say
          </h2>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold dark:text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          <div className="text-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-8 mx-auto opacity-50 dark:invert" />
          </div>
          <div className="text-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 mx-auto opacity-50 dark:invert" />
          </div>
          <div className="text-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-10 mx-auto opacity-50" />
          </div>
          <div className="text-center opacity-50 dark:opacity-30">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Award className="w-6 h-6" />
              <span className="text-sm font-medium">SSL Secured</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
