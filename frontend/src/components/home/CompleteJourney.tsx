import { journeyStages } from '../../data/home'
import { Container, Section } from '../common'

export function CompleteJourney() {
  return (
    <Section>
      <Container>
        <h2 className="max-w-xl font-serif text-4xl leading-tight text-cream sm:text-5xl">
          One journey. Every stage.
        </h2>
        <p className="mt-5 max-w-lg font-serif text-xl text-peach italic sm:text-2xl">
          Your journey, from first idea to final memory.
        </p>

        <div className="mt-12 overflow-x-auto pb-2">
          <ol className="flex min-w-max items-center gap-2 sm:gap-3">
            {journeyStages.map((stage, index) => (
              <li key={stage.id} className="flex items-center gap-2 sm:gap-3">
                <span className="font-serif text-lg text-cream sm:text-xl">{stage.name}</span>
                {index < journeyStages.length - 1 && (
                  <span className="text-amber/60" aria-hidden="true">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
