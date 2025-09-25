import { useEffect, useMemo } from 'react'
import clsx from 'clsx'

interface AnimatedTextProps {
  text: string
  className?: string
  as?: keyof JSX.IntrinsicElements
  stagger?: number // ms between chars
  delay?: number
}

// Splits text into individually animated characters for a subtle typographic entrance.
export default function AnimatedText({ text, className, as = 'span', stagger = 28, delay = 0 }: AnimatedTextProps) {
  const Tag: any = as
  const chars = useMemo(() => text.split(''), [text])
  useEffect(() => { /* no-op hook reserved for future intersection observer */ }, [])
  return (
    <Tag className={clsx('animated-text inline-block', className)} aria-label={text}>
      {chars.map((c, i) => (
        <span
          key={i + c + i}
          className={clsx('char inline-block will-change-transform')}
          style={{ animationDelay: `${delay + i * stagger}ms` }}
        >
          {c === ' ' ? '\u00A0' : c}
        </span>
      ))}
    </Tag>
  )
}
