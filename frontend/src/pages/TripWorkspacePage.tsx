import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Container, Eyebrow } from '../components/common'
import { getTripById } from '../services/tripService'
import type { Trip } from '../types'

export function TripWorkspacePage() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!tripId) return
    let active = true
    void getTripById(tripId).then((result) => {
      if (!active) return
      setTrip(result)
      setReady(true)
    })
    return () => {
      active = false
    }
  }, [tripId])

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <Eyebrow>Trip workspace</Eyebrow>
        {!tripId && (
          <>
            <h1 className="mt-4 font-serif text-4xl text-cream">Trip not found.</h1>
            <div className="mt-8">
              <Button to="/my-trips" variant="secondary">
                Back to My Trips
              </Button>
            </div>
          </>
        )}
        {tripId && !ready && <p className="mt-6 text-muted">Loading journey…</p>}
        {ready && !trip && (
          <>
            <h1 className="mt-4 font-serif text-4xl text-cream">Trip not found.</h1>
            <p className="mt-4 text-muted">This mock catalog does not include that journey yet.</p>
            <div className="mt-8">
              <Button to="/my-trips" variant="secondary">
                Back to My Trips
              </Button>
            </div>
          </>
        )}
        {trip && (
          <>
            <h1 className="mt-4 font-serif text-4xl text-cream sm:text-5xl">{trip.title}</h1>
            <p className="mt-4 text-muted">
              {trip.from} → {trip.to}
            </p>
            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="text-[11px] tracking-[0.2em] text-gold uppercase">Budget</dt>
                <dd className="mt-1 font-serif text-2xl text-cream">
                  ₹{trip.budgetInr.toLocaleString('en-IN')}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.2em] text-gold uppercase">Travelers</dt>
                <dd className="mt-1 font-serif text-2xl text-cream">{trip.travelers}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.2em] text-gold uppercase">Trip DNA</dt>
                <dd className="mt-1 text-cream/80">{trip.dna.join(' · ')}</dd>
              </div>
            </dl>
            <p className="mt-10 max-w-xl text-sm text-muted">
              The full planner workspace will attach here. Data is already
              loaded through the trip service.
            </p>
            <div className="mt-8">
              <Button to="/plan">Continue planning</Button>
            </div>
          </>
        )}
      </Container>
    </div>
  )
}
