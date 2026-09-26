import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

type Variant = 'primary' | 'secondary' | 'ghost'

type Shared = {
  children: ReactNode
  className?: string
  variant?: Variant
}

const variants: Record<Variant, string> = {
  primary:
    'border-transparent bg-gradient-to-r from-amber to-orange text-ink shadow-[0_10px_30px_rgba(232,120,47,0.28)] hover:brightness-110',
  secondary:
    'border-cream/20 bg-transparent text-cream hover:border-cream/40 hover:bg-cream/5',
  ghost: 'border-transparent bg-transparent text-cream/80 hover:text-cream',
}

const base =
  'inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium tracking-wide transition duration-200'

type ButtonAsButton = Shared & {
  to?: undefined
  type?: 'button' | 'submit'
  onClick?: () => void
}

type ButtonAsLink = Shared & {
  to: string
  onClick?: () => void
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { children, className, variant = 'primary' } = props
  const classes = cn(base, variants[variant], className)

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes} onClick={props.onClick}>
        {children}
      </Link>
    )
  }

  const buttonProps = props as ButtonAsButton
  return (
    <button type={buttonProps.type ?? 'button'} className={classes} onClick={buttonProps.onClick}>
      {children}
    </button>
  )
}
