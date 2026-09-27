import { sampleTripDna } from '../../data/home'
import { Container, Section } from '../common'

export function PersonalizedTravel() {
  const { from, to, datesLabel, budgetLabel, travelers, interests, tripType, dna } =
    sampleTripDna

  return (
    <Section>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <h2 className="font-serif text-4xl leading-tight text-cream sm:text-5xl">
              Tell us what matters.
              <span className="mt-2 block italic text-peach">We&apos;ll shape the journey.</span>
            </h2>
            <p className="mt-5 max-w-md text-muted">
              A sample Trip DNA — structured the same way live trip data will
              arrive from the backend.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7">
              <Field label="From" value={from} />
              <Field label="To" value={to} />
              <Field label="Dates" value={datesLabel} />
              <Field label="Budget" value={budgetLabel} />
              <Field label="Travelers" value={String(travelers)} />
              <Field label="Occasion" value={tripType} />
            </dl>

            <div className="mt-8">
              <p className="text-[11px] tracking-[0.22em] text-gold uppercase">Interests</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="border border-white/10 px-3 py-1 text-sm text-cream/80"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside
            className="relative overflow-hidden px-8 py-10 sm:px-10"
            aria-label="Trip DNA preview"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(244,168,58,0.18),transparent_42%)]" />
            <div className="absolute inset-0 border border-white/10" />
            <p className="relative text-[11px] tracking-[0.28em] text-gold uppercase">
              Your Trip DNA
            </p>
            <ul className="relative mt-8 space-y-5">
              {dna.map((tag) => (
                <li key={tag} className="flex items-center gap-4">
                  <span className="h-px w-8 bg-amber/70" />
                  <span className="font-serif text-3xl text-cream italic sm:text-4xl">{tag}</span>
                </li>
              ))}
            </ul>
            <p className="relative mt-10 text-sm text-muted">
              Nature, food, and adventure held in one coherent journey.
            </p>
          </aside>
        </div>
      </Container>
    </Section>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] tracking-[0.22em] text-gold uppercase">{label}</dt>
      <dd className="mt-1 font-serif text-2xl text-cream">{value}</dd>
    </div>
  )
}
