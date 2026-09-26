import { Button, Container, Eyebrow } from '../components/common'
import { useServiceData } from '../hooks/useServiceData'
import { listDestinations } from '../services/destinationService'

export function ExplorePage() {
  const destinations = useServiceData(listDestinations, [])

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <Eyebrow>Explore</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl text-cream sm:text-5xl">Destinations with a pulse.</h1>
        <p className="mt-4 max-w-xl text-muted">
          A preview catalog. Live destination data will replace this mock list
          through the destination service.
        </p>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2">
          {destinations.map((destination) => (
            <li key={destination.id} className="border-t border-white/10 pt-6">
              <p className="text-[11px] tracking-[0.2em] text-gold uppercase">{destination.region}</p>
              <h2 className="mt-2 font-serif text-3xl text-cream">{destination.name}</h2>
              <p className="mt-3 text-sm text-muted">{destination.summary}</p>
              <p className="mt-4 text-xs tracking-wide text-cream/50">{destination.vibe.join(' · ')}</p>
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
