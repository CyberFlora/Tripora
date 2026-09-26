import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

type LogoProps = {
  className?: string
  compact?: boolean
}

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn('inline-flex items-center gap-2.5 text-cream no-underline', className)}
      aria-label="Tripora home"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="16" cy="16" r="15" stroke="rgba(243,234,216,0.12)" strokeWidth="1" />
        <path
          d="M16 6.5c5.2 3.8 7.8 7.6 7.8 11.2 0 4.3-3.5 7.8-7.8 7.8S8.2 22 8.2 17.7c0-1.6.5-3.2 1.4-4.6"
          stroke="#F4A83A"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M10.2 11.2c2.1-1.4 4-1.8 5.8-1.6"
          stroke="#3F8F68"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="16" cy="16.5" r="3.1" fill="#2C6B4E" />
      </svg>
      {!compact && (
        <span className="font-serif text-[22px] leading-none tracking-tight">Tripora</span>
      )}
    </Link>
  )
}
