import clsx from 'clsx'
import { CSSProperties } from 'react'

interface AtmosphereProps {
  variant?: 'hero' | 'cta' | 'soft'
  className?: string
}

const CONFIGS: Record<Required<AtmosphereProps>['variant'], Array<{ className: string; style: CSSProperties }>> = {
  hero: [
    {
      className: 'aurora-blob from-emerald-400/45 via-green-400/25 to-teal-400/20',
      style: { width: '42%', height: '42%', top: '-12%', left: '-6%', animationDelay: '0s' },
    },
    {
      className: 'aurora-blob from-blue-500/35 via-blue-400/25 to-purple-500/25',
      style: { width: '38%', height: '38%', bottom: '-18%', right: '-10%', animationDelay: '4s' },
    },
    {
      className: 'aurora-blob from-emerald-400/25 via-cyan-400/15 to-blue-500/25',
      style: { width: '26%', height: '26%', top: '30%', right: '10%', animationDelay: '7s' },
    },
  ],
  cta: [
    {
      className: 'aurora-blob from-white/25 via-white/15 to-transparent',
      style: { width: '55%', height: '55%', top: '-25%', right: '-15%', animationDelay: '2s' },
    },
    {
      className: 'aurora-blob from-green-400/30 via-teal-400/25 to-cyan-400/15',
      style: { width: '35%', height: '35%', bottom: '-15%', left: '-10%', animationDelay: '6s' },
    },
  ],
  soft: [
    {
      className: 'aurora-blob from-emerald-300/20 via-teal-200/15 to-blue-300/20',
      style: { width: '60%', height: '60%', top: '-30%', left: '-20%', animationDelay: '0s' },
    },
    {
      className: 'aurora-blob from-blue-300/15 via-purple-200/10 to-transparent',
      style: { width: '45%', height: '45%', bottom: '-25%', right: '-15%', animationDelay: '3s' },
    },
  ],
}

export default function Atmosphere({ variant = 'hero', className }: AtmosphereProps) {
  return (
    <div className={clsx('aurora-container', className)} aria-hidden>
      <div className="aurora-noise" />
      {CONFIGS[variant].map((shape, index) => (
        <div
          key={`${variant}-${index}`}
          className={clsx('aurora-shape', shape.className)}
          style={shape.style}
        />
      ))}
    </div>
  )
}
