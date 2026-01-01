import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'product' | 'article'
  product?: {
    price: number
    currency?: string
    availability?: 'in stock' | 'out of stock' | 'preorder'
    brand?: string
    category?: string
  }
}

const DEFAULT_TITLE = 'LUXE - Premium Fashion & Designer Clothing'
const DEFAULT_DESCRIPTION = 'Discover timeless elegance with LUXE. Shop our curated collection of premium fashion, designer clothing, and luxury accessories for men and women.'
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&q=80'
const SITE_NAME = 'LUXE'

export function SEO({ 
  title, 
  description = DEFAULT_DESCRIPTION, 
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  product
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Product specific meta (for product pages) */}
      {product && (
        <>
          <meta property="product:price:amount" content={product.price.toString()} />
          <meta property="product:price:currency" content={product.currency || 'USD'} />
          {product.availability && (
            <meta property="product:availability" content={product.availability} />
          )}
          {product.brand && (
            <meta property="product:brand" content={product.brand} />
          )}
          {product.category && (
            <meta property="product:category" content={product.category} />
          )}
        </>
      )}

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#1a1a1a" />
    </Helmet>
  )
}
