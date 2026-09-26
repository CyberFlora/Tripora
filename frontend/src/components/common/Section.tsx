import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

type SectionProps = {
  id?: string
  children: ReactNode
  className?: string
}

export function Section({ id, children, className }: SectionProps) {
  return (
    <section id={id} className={cn('relative scroll-mt-24 py-20 sm:py-24 lg:py-28', className)}>
      {children}
    </section>
  )
}
