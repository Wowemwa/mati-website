import { ReactNode, CSSProperties, HTMLAttributes } from 'react'
import clsx from 'clsx'

type BaseProps = { className?: string; children: ReactNode; style?: CSSProperties } & HTMLAttributes<HTMLDivElement>

export function Card({ className, children, style, ...rest }: BaseProps) {
  return (
    <div {...rest} style={style} className={clsx('group relative rounded-3xl backdrop-blur-xl bg-white/75 dark:bg-slate-800/70 border border-white/30 dark:border-white/15 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:rotate-1 overflow-hidden', className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export function SoftCard({ className, children, style, ...rest }: BaseProps) {
  return (
    <div {...rest} style={style} className={clsx('group relative rounded-3xl bg-gradient-to-br from-white/85 to-gray-50/50 dark:from-slate-800/75 dark:to-slate-700/50 border border-white/40 dark:border-white/20 backdrop-blur-xl shadow-xl transition-all duration-700 hover:shadow-2xl hover:-translate-y-1 overflow-hidden', className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 border border-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export function Badge({ className, children, tone = 'default' }: BaseProps & { tone?: 'marine' | 'terrestrial' | 'status' | 'default' }) {
  const toneClass: Record<string,string> = {
    marine: 'bg-gradient-to-r from-blue-100/90 to-cyan-100/90 text-blue-800 dark:from-blue-500/25 dark:to-cyan-500/25 dark:text-cyan-100 border-blue-200/50 dark:border-blue-400/30',
    terrestrial: 'bg-gradient-to-r from-emerald-100/90 to-green-100/90 text-emerald-800 dark:from-emerald-500/25 dark:to-green-500/25 dark:text-emerald-100 border-emerald-200/50 dark:border-emerald-400/30',
    status: 'bg-gradient-to-r from-purple-100/90 to-pink-100/90 text-purple-800 dark:from-purple-500/25 dark:to-pink-500/25 dark:text-pink-100 border-purple-200/50 dark:border-purple-400/30',
    default: 'bg-gradient-to-r from-gray-100/90 to-gray-200/90 text-gray-800 dark:from-slate-600/50 dark:to-slate-500/50 dark:text-slate-100 border-gray-200/50 dark:border-slate-500/30'
  }
  return (
    <span className={clsx('inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full tracking-wider backdrop-blur-md border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105', toneClass[tone], className)}>
      {children}
    </span>
  )
}

export function Button({ className, children, variant='primary', ...rest }: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary'|'ghost' }) {
  const variants: Record<string,string> = {
    primary: 'group relative overflow-hidden bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-500 hover:via-blue-500 hover:to-purple-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:-rotate-1 active:scale-95',
    secondary: 'group relative px-8 py-4 rounded-2xl font-semibold border-2 border-white/40 dark:border-white/20 bg-white/70 dark:bg-slate-700/50 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-slate-600/70 hover:border-green-400 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:rotate-1',
    ghost: 'group px-6 py-3 rounded-xl font-medium hover:bg-gradient-to-r hover:from-green-50/80 hover:to-blue-50/80 dark:hover:from-slate-700/50 dark:hover:to-slate-600/50 backdrop-blur-sm transition-all duration-300 hover:scale-105'
  }
  return (
    <button className={clsx(variants[variant], 'transform focus:outline-none focus:ring-4 focus:ring-green-500/50', className)} {...rest}>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export function SectionTitle({ icon, children, className }: { icon?: string; children: ReactNode; className?: string }) {
  return (
    <div className={clsx('flex items-center gap-4 mb-12', className)}>
      <div className="relative">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
          {children}
        </h2>
        <div className="absolute -bottom-1 left-0 h-1 w-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
      </div>
      {icon && (
        <span className="text-3xl animate-pulse hover:animate-bounce cursor-pointer transition-transform duration-300 hover:scale-110" aria-hidden>
          {icon}
        </span>
      )}
    </div>
  )
}

export function MediaThumb({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={clsx('relative overflow-hidden rounded-3xl group/media aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 shadow-lg hover:shadow-2xl transition-all duration-700', className)}>
      <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover transition-all duration-700 group-hover/media:scale-110 group-hover/media:rotate-2" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-60 group-hover/media:opacity-80 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover/media:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover/media:opacity-100 transition-all duration-500 transform translate-x-4 group-hover/media:translate-x-0">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </div>
    </div>
  )
}

export default { Card, SoftCard, Badge, Button, SectionTitle, MediaThumb }