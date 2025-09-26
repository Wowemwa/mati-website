import { ReactNode } from 'react'
import Atmosphere from './Atmosphere'
import { SoftCard, Badge } from './UI'

export type ComingSoonStatus = 'done' | 'in-progress' | 'queued'

interface ComingSoonItem {
  label: string
  detail?: string
  status?: ComingSoonStatus
}

interface ComingSoonProps {
  icon?: ReactNode
  title: string
  description: string
  highlight?: string
  items?: ComingSoonItem[]
  actions?: ReactNode
  footer?: ReactNode
  children?: ReactNode
}

const STATUS_STYLES: Record<ComingSoonStatus, string> = {
  done: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/40 dark:text-emerald-200',
  'in-progress': 'bg-amber-500/15 text-amber-700 border-amber-500/40 dark:text-amber-200',
  queued: 'bg-slate-500/15 text-slate-600 border-slate-500/30 dark:text-slate-300',
}

const STATUS_LABEL: Record<ComingSoonStatus, string> = {
  done: 'Done',
  'in-progress': 'In progress',
  queued: 'Queued',
}

export default function ComingSoon({
  icon,
  title,
  description,
  highlight,
  items,
  actions,
  footer,
  children,
}: ComingSoonProps) {
  return (
    <div className="space-y-10">
      <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/85 p-10 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-900/75">
        <Atmosphere variant="soft" className="opacity-80" />
        <div className="absolute inset-0 rounded-3xl border border-white/30" />
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:text-left">
            {icon && (
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/15 via-blue-500/20 to-purple-500/20 text-3xl">
                {icon}
              </span>
            )}
            <div className="space-y-3">
              <Badge tone="status" className="mx-auto w-fit bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600 sm:mx-0 dark:bg-slate-900/70 dark:text-emerald-300">
                Coming soon
              </Badge>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">{title}</h1>
              <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">{description}</p>
              {highlight && (
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">{highlight}</p>
              )}
            </div>
          </div>

          {actions && <div className="flex flex-wrap justify-center gap-3 sm:justify-start">{actions}</div>}

          {items && items.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {items.map((item) => (
                <SoftCard
                  key={item.label}
                  className="flex items-start gap-3 border border-white/50 bg-white/80 p-4 dark:border-white/10 dark:bg-slate-900/70"
                >
                  <span className="mt-1 text-lg">✨</span>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{item.label}</p>
                      {item.status && (
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${STATUS_STYLES[item.status]}`}>
                          {STATUS_LABEL[item.status]}
                        </span>
                      )}
                    </div>
                    {item.detail && <p className="text-sm text-slate-600 dark:text-slate-300/90 break-words">{item.detail}</p>}
                  </div>
                </SoftCard>
              ))}
            </div>
          )}

          {children}
        </div>
      </div>

      {footer && (
        <SoftCard className="border border-white/60 bg-white/80 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300">
          {footer}
        </SoftCard>
      )}
    </div>
  )
}
