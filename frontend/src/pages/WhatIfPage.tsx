import { ArrowLeft, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { Container } from '../components/common'

const scenarios = {
  25000: {
    stay: 'Premium stay',
    activities: 'Full experience plan',
    food: 'Comfort dining',
    daily: '₹5,000',
  },
  22000: {
    stay: 'Comfort stay',
    activities: 'Experience optimized',
    food: 'Balanced dining',
    daily: '₹4,400',
  },
  18000: {
    stay: 'Optimized stay',
    activities: 'Priority experiences',
    food: 'Smart dining',
    daily: '₹3,600',
  },
  15000: {
    stay: 'Value stay',
    activities: 'Essential experiences',
    food: 'Budget balanced',
    daily: '₹3,000',
  },
} as const

type Budget = keyof typeof scenarios

export function WhatIfPage() {
  const [budget, setBudget] = useState<Budget>(25000)

  const scenario = useMemo(() => scenarios[budget], [budget])
  const changed = budget !== 25000

  return (
    <section className="relative min-h-[calc(100svh-72px)] overflow-hidden py-16 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 grid-backdrop opacity-60"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#c45a28]/15 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#1b4d5c]/20 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-cream"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber/20 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.16em] text-gold">
            <Sparkles size={14} />
            Adaptive planning
          </div>

          <h1 className="font-serif text-5xl leading-tight tracking-tight text-cream sm:text-6xl lg:text-7xl">
            What{' '}
            <span className="text-gradient-warm italic">If?</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            See how your journey changes when your plans change.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] shadow-2xl backdrop-blur-sm">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              {/* Current Trip */}
              <div className="border-b border-white/10 p-7 lg:border-b-0 lg:border-r lg:p-10">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                  Current trip
                </p>

                <h2 className="mt-4 font-serif text-3xl text-cream">
                  Goa Escape
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Demo trip for 4 travelers over 5 days.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <InfoCard label="Budget" value="₹25,000" />
                  <InfoCard label="Duration" value="5 Days" />
                  <InfoCard label="Travelers" value="4" />
                  <InfoCard label="Destination" value="Goa" />
                </div>

                <div className="mt-6 rounded-2xl border border-white/8 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-muted">
                    Demo data
                  </p>

                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    These figures are illustrative mock data used to
                    demonstrate Tripora's adaptive planning concept.
                  </p>
                </div>
              </div>

              {/* What If Controls */}
              <div className="p-7 lg:p-10">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                  Change your plan
                </p>

                <h2 className="mt-4 font-serif text-3xl text-cream">
                  What if your budget changes?
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                  Choose a new budget and see how the journey adapts while
                  preserving the core travel experience.
                </p>

                <div className="mt-9">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs text-muted">New budget</p>

                      <p className="mt-1 font-serif text-4xl text-gradient-warm">
                        ₹{budget.toLocaleString('en-IN')}
                      </p>
                    </div>

                    {changed && (
                      <span className="rounded-full border border-amber/20 bg-amber/5 px-3 py-1.5 text-xs text-gold">
                        Journey adapted
                      </span>
                    )}
                  </div>

                  <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {(Object.keys(scenarios) as unknown as Budget[]).map(
                      (value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setBudget(value)}
                          className={`rounded-xl border px-3 py-3 text-sm transition-all ${
                            budget === value
                              ? 'border-amber/50 bg-amber/10 text-gold shadow-[0_0_25px_rgba(196,90,40,0.12)]'
                              : 'border-white/10 bg-white/[0.02] text-muted hover:border-white/20 hover:text-cream'
                          }`}
                        >
                          ₹{(value / 1000).toFixed(0)}k
                        </button>
                      ),
                    )}
                  </div>

                  <input
                    type="range"
                    min="15000"
                    max="25000"
                    step="1000"
                    value={budget}
                    onChange={(event) =>
                      setBudget(Number(event.target.value) as Budget)
                    }
                    className="mt-7 w-full accent-[#c45a28]"
                    aria-label="Adjust trip budget"
                  />
                </div>

                {/* Adapted Journey */}
                <div className="mt-10 rounded-2xl border border-amber/15 bg-gradient-to-br from-amber/[0.07] to-transparent p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-gold">
                        Adapted journey
                      </p>

                      <p className="mt-1 text-sm text-muted">
                        {changed
                          ? 'Tripora has adjusted the plan'
                          : 'Original trip configuration'}
                      </p>
                    </div>

                    <span className="rounded-full bg-amber/10 px-3 py-1 text-xs text-gold">
                      {changed ? 'Updated' : 'Baseline'}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <AdaptationCard
                      label="Stay"
                      value={scenario.stay}
                    />

                    <AdaptationCard
                      label="Activities"
                      value={scenario.activities}
                    />

                    <AdaptationCard
                      label="Food"
                      value={scenario.food}
                    />

                    <AdaptationCard
                      label="Estimated daily spending"
                      value={scenario.daily}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Before / After */}
            <div className="border-t border-white/10 p-7 lg:p-10">
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.15em] text-gold">
                  Before & after
                </p>

                <h2 className="mt-2 font-serif text-2xl text-cream">
                  Your journey adapts with you.
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <ComparisonCard
                  title="Before"
                  budget="₹25,000"
                  stay="Premium stay"
                  activities="Full experience plan"
                  daily="₹5,000"
                />

                <ComparisonCard
                  title="After"
                  budget={`₹${budget.toLocaleString('en-IN')}`}
                  stay={scenario.stay}
                  activities={scenario.activities}
                  daily={scenario.daily}
                  active
                />
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted">
            Demo experience — pricing and adaptations shown here are
            illustrative and not live travel prices.
          </p>
        </div>
      </Container>
    </section>
  )
}

function InfoCard({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-serif text-xl text-cream">{value}</p>
    </div>
  )
}

function AdaptationCard({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-black/15 p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-sm text-cream">{value}</p>
    </div>
  )
}

function ComparisonCard({
  title,
  budget,
  stay,
  activities,
  daily,
  active = false,
}: {
  title: string
  budget: string
  stay: string
  activities: string
  daily: string
  active?: boolean
}) {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        active
          ? 'border-amber/20 bg-amber/[0.04]'
          : 'border-white/8 bg-white/[0.02]'
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.15em] text-muted">
          {title}
        </p>

        {active && (
          <span className="text-xs text-gold">
            Adapted
          </span>
        )}
      </div>

      <p className="mt-4 font-serif text-3xl text-cream">{budget}</p>

      <div className="mt-6 space-y-4">
        <ComparisonRow label="Accommodation" value={stay} />
        <ComparisonRow label="Activities" value={activities} />
        <ComparisonRow label="Daily spending" value={daily} />
      </div>
    </div>
  )
}

function ComparisonRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-white/8 pt-4">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-right text-sm text-cream">{value}</span>
    </div>
  )
}
