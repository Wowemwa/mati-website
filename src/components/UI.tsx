import { ReactNode, CSSProperties, HTMLAttributes } from 'react'
import clsx from 'clsx'

type BaseProps = { className?: string; children: ReactNode; style?: CSSProperties } & HTMLAttributes<HTMLDivElement>

export function Card({ className, children, style, ...rest }: BaseProps) {
  return (
    <div {...rest} style={style} className={clsx('gradient-border rounded-3xl backdrop-blur-md bg-white/70 dark:bg-slate-800/60 border border-white/20 dark:border-white/10 shadow-md hover:shadow-xl transition-all duration-500', className)}>      
      {children}
    </div>
  )
}

export function SoftCard({ className, children, style, ...rest }: BaseProps) {
  return (
    <div {...rest} style={style} className={clsx('rounded-3xl bg-gradient-to-br from-white/80 to-gray-50/40 dark:from-slate-800/60 dark:to-slate-700/40 border border-white/20 dark:border-white/10 backdrop-blur-md shadow-lg transition-all duration-500 hover:shadow-2xl', className)}>
      {children}
    </div>
  )
}

export function Badge({ className, children, tone = 'default' }: BaseProps & { tone?: 'marine' | 'terrestrial' | 'status' | 'default' }) {
  const toneClass: Record<string,string> = {
    marine: 'bg-gradient-to-r from-blue-100/80 to-cyan-100/80 text-blue-700 dark:from-blue-500/20 dark:to-cyan-500/20 dark:text-cyan-200',
    terrestrial: 'bg-gradient-to-r from-emerald-100/80 to-green-100/80 text-emerald-700 dark:from-emerald-500/20 dark:to-green-500/20 dark:text-emerald-200',
    status: 'bg-gradient-to-r from-purple-100/80 to-pink-100/80 text-purple-700 dark:from-purple-500/20 dark:to-pink-500/20 dark:text-pink-200',
    default: 'bg-gray-100 text-gray-700 dark:bg-slate-600/40 dark:text-slate-200'
  }
  return (
    <span className={clsx('inline-flex items-center text-xs font-medium px-3 py-1 rounded-full tracking-wide backdrop-blur-sm border border-white/40 dark:border-white/10', toneClass[tone], className)}>
      {children}
    </span>
  )
}

export function Button({ className, children, variant='primary', ...rest }: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary'|'ghost' }) {
  const variants: Record<string,string> = {
    primary: 'relative overflow-hidden bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-glow-blue transition-all duration-300 hover:scale-105',
    secondary: 'px-6 py-3 rounded-2xl font-medium border-2 border-gray-200 dark:border-white/10 bg-white/60 dark:bg-slate-700/40 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-600/50 hover:border-green-300 transition-all duration-300',
    ghost: 'px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-50 dark:hover:bg-slate-700/40 transition-colors'
  }
  return (
    <button className={clsx(variants[variant], className)} {...rest}>{children}</button>
  )
}

export function SectionTitle({ icon, children, className }: { icon?: string; children: ReactNode; className?: string }) {
  return (
    <div className={clsx('flex items-center gap-3 mb-8', className)}>
      <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
        {children}
      </h2>
      {icon && <span className="text-2xl animate-pulse" aria-hidden>{icon}</span>}
    </div>
  )
}

export function MediaThumb({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={clsx('relative overflow-hidden rounded-2xl group/media aspect-[4/3] bg-slate-200 dark:bg-slate-700', className)}>
      <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover/media:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  )
}

export default { Card, SoftCard, Badge, Button, SectionTitle, MediaThumb }