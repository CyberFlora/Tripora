import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { whatIfScenario } from '../../data/home'
import { Button, Container, Section } from '../common'

export function WhatIfMode() {
  const { original, question, adapted, outcomes } = whatIfScenario

  return (
    <Section id="what-if" className="overflow-hidden">
      <Container>
        <div className="max-w-2xl">
          <h2 className="font-serif text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl">
            What if your plans change?
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
          <ScenarioCard title="Original" values={original} tone="quiet" />

          <div className="flex flex-col items-center justify-center px-2 py-4 text-center lg:max-w-[220px]">
            <p className="font-serif text-2xl text-peach italic sm:text-3xl">{question}</p>
            <span className="mt-4 hidden h-16 w-px bg-amber/40 lg:block" />
          </div>

          <ScenarioCard title="Adapted" values={adapted} tone="warm">
            <ul className="mt-6 space-y-2">
              {outcomes.map((outcome) => (
                <li key={outcome} className="flex items-center gap-2 text-sm text-cream/85">
                  <Check size={16} className="text-amber" aria-hidden="true" />
                  {outcome}
                </li>
              ))}
            </ul>
          </ScenarioCard>
        </div>

        <div className="mt-10">
          <Button to="/plan" variant="secondary">
            Explore What-If Mode
          </Button>
        </div>
      </Container>
    </Section>
  )
}

function ScenarioCard({
  title,
  values,
  tone,
  children,
}: {
  title: string
  values: { budgetLabel: string; durationLabel: string; travelersLabel: string }
  tone: 'quiet' | 'warm'
  children?: ReactNode
}) {
  return (
    <article
      className={
        tone === 'warm'
          ? 'relative overflow-hidden border border-amber/25 bg-[radial-gradient(circle_at_100%_0%,rgba(244,168,58,0.16),transparent_45%)] px-7 py-8'
          : 'border border-white/10 px-7 py-8'
      }
    >
      <p className="text-[11px] tracking-[0.22em] text-gold uppercase">{title}</p>
      <p className="mt-5 font-serif text-4xl text-cream sm:text-5xl">{values.budgetLabel}</p>
      <p className="mt-4 text-sm text-muted">
        {values.durationLabel}
        <span className="mx-2 text-white/20">·</span>
        {values.travelersLabel}
      </p>
      {children}
    </article>
  )
}
