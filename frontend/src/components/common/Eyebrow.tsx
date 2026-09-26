import { cn } from '../../utils/cn'

type EyebrowProps = {
  children: string
  className?: string
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'text-[11px] font-medium tracking-[0.28em] text-gold uppercase',
        className,
      )}
    >
      {children}
    </p>
  )
}
