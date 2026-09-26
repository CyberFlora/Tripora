import { journeyStages } from '../../data/home'
import { Container, Eyebrow, Section } from '../common'

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="overflow-hidden">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-cream sm:text-5xl">
            From an idea to a journey.
          </h2>
        </div>

        <ol className="mt-12 hidden lg:grid lg:grid-cols-6 lg:gap-4">
          {journeyStages.slice(0, 6).map((stage, index) => (
            <li key={stage.id} className="relative">
              <StageNode index={index} name={stage.name} summary={stage.summary} />
            </li>
          ))}
        </ol>
        <ol className="mt-4 hidden lg:grid lg:grid-cols-5 lg:gap-4 lg:pl-[8.3%]">
          {journeyStages.slice(6).map((stage, index) => (
            <li key={stage.id}>
              <StageNode index={index + 6} name={stage.name} summary={stage.summary} />
            </li>
          ))}
        </ol>

        <ol className="relative mt-10 space-y-0 lg:hidden">
          <span
            className="absolute top-3 bottom-3 left-[11px] w-px bg-gradient-to-b from-amber/70 via-gold/30 to-transparent"
            aria-hidden="true"
          />
          {journeyStages.map((stage, index) => (
            <li key={stage.id} className="relative flex gap-4 py-3 pl-1">
              <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-amber shadow-[0_0_12px_rgba(244,168,58,0.7)]" />
              <div>
                <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-1 font-serif text-xl text-cream">{stage.name}</h3>
                <p className="mt-1 text-sm text-muted">{stage.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}

function StageNode({
  index,
  name,
  summary,
}: {
  index: number
  name: string
  summary: string
}) {
  return (
    <article className="group h-full border-t border-amber/25 pt-5">
      <p className="text-[11px] tracking-[0.22em] text-gold/80">{String(index + 1).padStart(2, '0')}</p>
      <h3 className="mt-2 font-serif text-2xl text-cream group-hover:text-amber">{name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{summary}</p>
    </article>
  )
}
