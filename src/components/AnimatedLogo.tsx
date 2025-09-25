import { useState, useEffect } from 'react'
import clsx from 'clsx'

interface AnimatedLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function AnimatedLogo({ className, size = 'md' }: AnimatedLogoProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 2000)
    }, 8000)
    
    return () => clearInterval(interval)
  }, [])

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  return (
    <div
      className={clsx(
        'relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/20 via-ocean-500/15 to-accent-500/20 backdrop-blur-md border border-white/30 dark:border-white/15 shadow-soft hover:shadow-medium transition-transform duration-500 ease-out cursor-pointer group',
        sizeClasses[size],
        {
          'animate-pulse-soft': isAnimating,
          'group-hover:scale-[1.03]': !isAnimating,
        },
        className
      )}
      onClick={() => setIsAnimating(true)}
    >
      {/* Rotating rings */}
      <div className={clsx(
        'absolute inset-1 rounded-xl border-2 border-dashed border-brand-400/40 transition-transform duration-700 ease-out',
        {
          'animate-spin-slow': isAnimating,
          'group-hover:border-brand-500/60': !isAnimating,
        }
      )} />
      
      <div className={clsx(
        'absolute inset-2 rounded-lg border border-ocean-400/30 transition-transform duration-800 ease-out delay-200',
        {
          'animate-spin-slow': isAnimating,
          'group-hover:border-ocean-500/50': !isAnimating,
        }
      )} style={{ animationDirection: 'reverse' }} />
      
      {/* Center icon */}
      <div className={clsx(
  'relative z-10 text-brand-600 dark:text-brand-400 transition-transform duration-300 ease-out',
        {
          'animate-pop-soft': isAnimating,
          'group-hover:text-brand-700 dark:group-hover:text-brand-300': !isAnimating,
        }
      )}>
        {size === 'xl' ? (
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
          </svg>
        )}
      </div>
      
      {/* Glow effect */}
      <div className={clsx(
        'absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-400/0 via-ocean-400/0 to-accent-400/0 transition-all duration-700',
        {
          'from-brand-400/30 via-ocean-400/20 to-accent-400/30': isAnimating,
          'group-hover:from-brand-400/20 group-hover:via-ocean-400/10 group-hover:to-accent-400/20': !isAnimating,
        }
      )} />
    </div>
  )
}