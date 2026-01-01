import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <section className="relative section-spacing overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-luxe-charcoal to-primary">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
      </div>
      
      <div className="container-luxe relative">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-2 mb-6 text-xs font-medium uppercase tracking-ultra text-white/80 border border-white/30 backdrop-blur-sm">
            Join Our Community
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-6 text-white">
            Stay Connected
          </h2>
          <p className="text-lg md:text-xl text-white/80 font-light mb-12 leading-relaxed max-w-2xl mx-auto">
            Join our exclusive community for early access to new collections, 
            private events, and curated style inspiration.
          </p>

          {isSubmitted ? (
            <div className="flex items-center justify-center gap-3 py-6 text-accent-gold animate-fade-in">
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg font-medium">Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-6 py-5 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-accent-gold focus:bg-white/15 transition-all duration-300 rounded-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-primary font-semibold text-sm uppercase tracking-widest hover:bg-accent-gold hover:text-white hover:shadow-2xl hover:shadow-accent-gold/30 transition-all duration-300 group rounded-sm"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}

          <p className="text-sm text-white/60 mt-8">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
