import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../utils/cn'
import { Button, Container, Logo } from '../common'

function linkClasses(active: boolean) {
  return cn(
    'relative px-1 py-1 text-sm tracking-wide transition-colors',
    active ? 'text-cream' : 'text-cream/55 hover:text-cream',
  )
}

const links = [
  { label: 'Home', to: '/' },
  { label: 'Plan a Trip', to: '/plan' },
  { label: 'My Trips', to: '/my-trips' },
  { label: 'Profile', to: '/profile' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/70 backdrop-blur-md">
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <Logo />

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => linkClasses(isActive)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button to="/plan">Plan My Trip</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cream lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </Container>

      {/* Mobile Navigation */}
      {open && (
        <div
          id="mobile-nav"
          className="border-t border-white/5 bg-ink/95 lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-5">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-2 py-3 transition-colors',
                    isActive
                      ? 'bg-white/5 text-cream'
                      : 'text-cream/80 hover:bg-white/5 hover:text-cream',
                  )
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            <div className="mt-3">
              <Button
                to="/plan"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Plan My Trip
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}