import { smartFeatures } from '../../data/home'
import { Container, Eyebrow, Section } from '../common'

export function SmartFeatures() {
  const [lead, ...rest] = smartFeatures

  return (
    <Section>
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>More than an itinerary</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-cream sm:text-5xl">
            More than an itinerary.
          </h2>
          <p className="mt-5 max-w-xl text-muted">
            Tripora helps you make better decisions before and during
            your journey.
          </p>
        </div>

        {lead && (
          <article className="mt-12 grid gap-8 border-y border-white/10 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h3 className="font-serif text-3xl text-cream sm:text-4xl">{lead.name}</h3>
            <p className="max-w-xl text-muted">{lead.summary}</p>
          </article>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((feature, index) => (
            <article
              key={feature.id}
              className="border-white/10 py-8 pr-8 sm:border-b lg:[&:nth-child(3n)]:pr-0 lg:[&:nth-child(n+5)]:border-b-0 max-sm:border-b"
            >
              <p className="text-[11px] tracking-[0.2em] text-gold/70">
                {String(index + 2).padStart(2, '0')}
              </p>
              <h3 className="mt-3 font-serif text-xl text-cream">{feature.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{feature.summary}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
