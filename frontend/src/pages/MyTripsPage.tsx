import { Link } from 'react-router-dom'
import { Button, Container, Eyebrow } from '../components/common'
import { useServiceData } from '../hooks/useServiceData'
import { listTrips } from '../services/tripService'

export function MyTripsPage() {
  const trips = useServiceData(listTrips, [])

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <Eyebrow>My Trips</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl text-cream sm:text-5xl">Journeys in motion.</h1>
        <p className="mt-4 max-w-xl text-muted">
          Mock trips for now. The trip service is the seam where a backend
          list will arrive later.
        </p>

        <ul className="mt-12 space-y-8">
          {trips.map((trip) => (
            <li key={trip.id} className="border-t border-white/10 pt-6">
              <p className="text-[11px] tracking-[0.2em] text-gold uppercase">{trip.status}</p>
              <h2 className="mt-2 font-serif text-3xl text-cream">
                <Link to={`/trip/${trip.id}`} className="hover:text-amber">
                  {trip.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted">
                {trip.from} → {trip.to} · {trip.travelers} travelers · ₹
                {trip.budgetInr.toLocaleString('en-IN')}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Button to="/plan">Plan My Trip</Button>
        </div>
      </Container>
    </div>
  )
}
