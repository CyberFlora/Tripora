import { whyTriporaPoints } from '../../data/home'
import { Container, Eyebrow, Section } from '../common'

export function WhyTripora() {
  return (
    <Section>
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Why Tripora</Eyebrow>
          <h2
            id="why-heading"
            className="mt-4 font-serif text-4xl leading-tight text-cream sm:text-5xl"
          >
            Travel planning should feel personal.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Every journey is different. Tripora brings your destination,
            budget, interests, companions and purpose together to create
            a trip built around you.
          </p>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {whyTriporaPoints.map((point, index) => (
            <article
              key={point.id}
              className="relative border-t border-white/10 pt-6"
            >
              <span className="font-serif text-sm text-gold/80">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="mt-3 text-[11px] tracking-[0.22em] text-gold uppercase">
                {point.eyebrow}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-cream">{point.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{point.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
