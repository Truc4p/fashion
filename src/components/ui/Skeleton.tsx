import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-r from-luxe-ivory via-luxe-cream to-luxe-ivory bg-[length:200%_100%]',
        className
      )}
      style={{
        animation: 'shimmer 1.5s ease-in-out infinite',
      }}
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-fade-in">
      {/* Image */}
      <Skeleton className="aspect-product mb-4" />
      
      {/* Category */}
      <Skeleton className="h-3 w-16 mb-2" />
      
      {/* Title */}
      <Skeleton className="h-4 w-3/4 mb-2" />
      
      {/* Price */}
      <Skeleton className="h-4 w-20" />
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 animate-fade-in">
      {/* Image Gallery */}
      <div className="space-y-4">
        <Skeleton className="aspect-product" />
        <div className="flex gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="w-20 aspect-product" />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="lg:py-8 space-y-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-32" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        <div className="flex gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="w-10 h-10 rounded-full" />
          ))}
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="w-12 h-12" />
          ))}
        </div>
        <Skeleton className="h-14 w-full" />
      </div>
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="relative h-screen min-h-[600px] bg-luxe-ivory animate-fade-in">
      <div className="absolute inset-0 flex items-center">
        <div className="container-luxe">
          <div className="max-w-xl space-y-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-3/4" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-14 w-48" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function CollectionsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="aspect-[4/5]" />
      ))}
    </div>
  )
}

// Add the shimmer animation to the global CSS or here as a style tag
const ShimmerStyle = () => (
  <style>{`
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `}</style>
)

export { ShimmerStyle }
