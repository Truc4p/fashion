import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react'

const footerLinks = {
  shop: [
    { label: 'Woman', href: '/category/woman' },
    { label: 'Man', href: '/category/man' },
    { label: 'Kids', href: '/category/kids' },
    { label: 'New Collection', href: '/category/new' },
    { label: 'Sale', href: '/category/sale' },
  ],
  help: [
    { label: 'Customer Service', href: '/help' },
    { label: 'Track Order', href: '/track-order' },
    { label: 'Returns & Exchanges', href: '/returns' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Contact Us', href: '/contact' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Press', href: '/press' },
    { label: 'Affiliates', href: '/affiliates' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
]

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-luxe-cream via-luxe-ivory to-luxe-cream dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-8 overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%232c2c2c" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      }} />
      
      <div className="container-luxe relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Shop */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-ultra mb-6 flex items-center gap-2 dark:text-white">
              <span className="w-6 h-0.5 bg-accent-gold"></span>
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-luxe-gray dark:text-gray-400 hover:text-primary dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-ultra mb-6 flex items-center gap-2 dark:text-white">
              <span className="w-6 h-0.5 bg-accent-gold"></span>
              Help
            </h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-luxe-gray dark:text-gray-400 hover:text-primary dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-ultra mb-6 flex items-center gap-2 dark:text-white">
              <span className="w-6 h-0.5 bg-accent-gold"></span>
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-luxe-gray dark:text-gray-400 hover:text-primary dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-ultra mb-6 flex items-center gap-2 dark:text-white">
              <span className="w-6 h-0.5 bg-accent-gold"></span>
              Follow Us
            </h3>
            <div className="flex gap-3 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 bg-white dark:bg-gray-800 text-luxe-gray dark:text-gray-400 hover:text-white hover:bg-primary transition-all duration-300 rounded-sm shadow-sm hover:shadow-lg hover:-translate-y-1"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 dark:text-white">
                Download Our App
              </h4>
              <div className="flex flex-col gap-2">
                <div className="px-4 py-2.5 bg-primary dark:bg-white text-white dark:text-primary text-xs font-semibold rounded-sm hover:bg-accent-gold dark:hover:bg-accent-gold dark:hover:text-white transition-colors cursor-pointer text-center">
                  App Store
                </div>
                <div className="px-4 py-2.5 bg-primary dark:bg-white text-white dark:text-primary text-xs font-semibold rounded-sm hover:bg-accent-gold dark:hover:bg-accent-gold dark:hover:text-white transition-colors cursor-pointer text-center">
                  Google Play
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t-2 border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="text-2xl font-display font-bold tracking-widest text-gradient hover:scale-105 transition-transform"
              >
                LUXE
              </Link>
              <p className="text-xs text-luxe-gray dark:text-gray-400 font-medium">
                © {new Date().getFullYear()} LUXE. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6 text-xs text-luxe-gray dark:text-gray-400 font-medium">
              <Link to="/" className="hover:text-primary dark:hover:text-white transition-colors relative group">
                Privacy Policy
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-white group-hover:w-full transition-all"></span>
              </Link>
              <Link to="/" className="hover:text-primary dark:hover:text-white transition-colors relative group">
                Terms of Service
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-white group-hover:w-full transition-all"></span>
              </Link>
              <Link to="/" className="hover:text-primary dark:hover:text-white transition-colors relative group">
                Cookie Settings
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-white group-hover:w-full transition-all"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
