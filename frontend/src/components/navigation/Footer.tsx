
import { Link } from 'react-router-dom'
import { Container, Logo } from '../common'

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#05080f]">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Personalized dynamic tour planning. Journeys shaped around budget,
            interests, and the way you actually travel.
          </p>
        </div>

        <div>
          <p className="text-xs tracking-[0.2em] text-gold uppercase">
            Navigation
          </p>

          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link className="text-cream/70 hover:text-cream" to="/">
                Home
              </Link>
            </li>

            <li>
              <Link className="text-cream/70 hover:text-cream" to="/what-if">
                What If
              </Link>
            </li>

            <li>
              <Link className="text-cream/70 hover:text-cream" to="/plan">
                Plan My Trip
              </Link>
            </li>

            <li>
              <Link className="text-cream/70 hover:text-cream" to="/my-trips">
                My Trips
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-[0.2em] text-gold uppercase">
            Account
          </p>

          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link className="text-cream/70 hover:text-cream" to="/profile">
                Profile
              </Link>
            </li>

            <li>
              <Link className="text-cream/70 hover:text-cream" to="/my-trips">
                My Trips
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-[0.2em] text-gold uppercase">
            Operations
          </p>

          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link
                to="/operator/login"
                className="text-cream/70 hover:text-cream transition-colors"
              >
                Operator Portal
              </Link>
            </li>
          </ul>

          <p className="text-xs tracking-[0.2em] text-gold uppercase mt-8">
            Legal
          </p>

          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link
                to="/license"
                className="text-muted transition-colors hover:text-cream"
              >
                License
              </Link>
            </li>
          </ul>
        </div>

        <p className="text-xs text-muted">
          © 2026 Tripora. All rights reserved.
        </p>
      </Container>

      <Container className="border-t border-white/5 py-6">
        <p className="text-xs text-muted">
          Tripora — travel, designed around you.
        </p>
      </Container>
    </footer>
  )
}
