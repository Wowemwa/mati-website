import { memo } from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'dots' | 'pulse' | 'bars'
  className?: string
}

// Optimized loading spinner with different variants
const LoadingSpinner = memo(function LoadingSpinner({ 
  size = 'md', 
  variant = 'default',
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const baseClassName = `${sizeClasses[size]} ${className}`

  switch (variant) {
    case 'dots':
      return (
        <div className={`flex space-x-1 ${className}`}>
          <div className={`${sizeClasses[size]} bg-current rounded-full animate-pulse`} style={{ animationDelay: '0ms' }} />
          <div className={`${sizeClasses[size]} bg-current rounded-full animate-pulse`} style={{ animationDelay: '150ms' }} />
          <div className={`${sizeClasses[size]} bg-current rounded-full animate-pulse`} style={{ animationDelay: '300ms' }} />
        </div>
      )

    case 'pulse':
      return (
        <div className={`${baseClassName} bg-current rounded-full animate-ping opacity-75`} />
      )

    case 'bars':
      return (
        <div className={`flex space-x-0.5 ${className}`}>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-1 bg-current animate-pulse`}
              style={{
                height: size === 'sm' ? '16px' : size === 'md' ? '24px' : size === 'lg' ? '32px' : '40px',
                animationDelay: `${i * 150}ms`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      )

    default:
      return (
        <svg
          className={`${baseClassName} animate-spin text-current`}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )
  }
})

// Page loading fallback with skeleton
export const PageLoadingFallback = memo(function PageLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50/30 via-green-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
      <div className="text-center space-y-4">
        <LoadingSpinner size="xl" className="text-emerald-600 mx-auto" />
        <div className="space-y-2">
          <div className="h-4 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mx-auto" />
          <div className="h-3 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mx-auto" />
        </div>
      </div>
    </div>
  )
})

// Component loading fallback
export const ComponentLoadingFallback = memo(function ComponentLoadingFallback() {
  return (
    <div className="flex items-center justify-center p-8">
      <LoadingSpinner size="lg" className="text-emerald-500" />
    </div>
  )
})

// Map loading fallback with skeleton
export const MapLoadingFallback = memo(function MapLoadingFallback() {
  return (
    <div className="relative w-full h-96 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
      {/* Map skeleton */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 dark:from-slate-700 dark:to-slate-600 animate-pulse" />
      
      {/* Fake markers */}
      <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
      <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
      
      {/* Loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-lg flex items-center space-x-3">
          <LoadingSpinner size="md" className="text-emerald-600" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Loading map data...</span>
        </div>
      </div>
    </div>
  )
})

// Data loading skeleton
export const DataLoadingSkeleton = memo(function DataLoadingSkeleton({ 
  rows = 3, 
  className = '' 
}: { 
  rows?: number
  className?: string 
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
})

export default LoadingSpinner