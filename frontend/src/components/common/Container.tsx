import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

type ContainerProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav'
}

export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-10', className)}>
      {children}
    </Tag>
  )
}
