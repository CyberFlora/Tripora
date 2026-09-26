import type { ReactNode } from 'react'
import { Container, Eyebrow } from '../components/common'

export function LicensePage() {
  return (
    <section className="relative min-h-[calc(100svh-72px)] overflow-hidden py-20 sm:py-24">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 grid-backdrop"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#d96532]/10 blur-[130px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#1b5964]/10 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative">
        {/* Header */}
        <div className="max-w-3xl">
          <Eyebrow>Legal</Eyebrow>

          <h1 className="mt-5 font-serif text-5xl leading-[0.95] tracking-tight text-cream sm:text-6xl lg:text-7xl">
            Tripora{' '}
            <span className="text-gradient-warm italic">
              License.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Ownership, usage, and licensing information for the
            Tripora project.
          </p>
        </div>

        {/* License cards */}
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <LicenseCard number="01" title="Copyright">
            <p>
              © 2026 Tripora. All rights reserved.
            </p>

            <p>
              The Tripora name, branding, original designs, content,
              and project-specific assets belong to the Tripora project
              and its creators unless otherwise stated.
            </p>
          </LicenseCard>

          <LicenseCard number="02" title="Usage">
            <p>
              The original Tripora source code, designs, content, and
              assets may not be reproduced, redistributed, or used
              commercially without permission from the project creators.
            </p>
          </LicenseCard>

          <LicenseCard number="03" title="Third-Party Software">
            <p>
              Tripora may use third-party libraries, frameworks, APIs,
              fonts, and other open-source software.
            </p>

            <p>
              These components remain subject to their respective
              licenses and the terms provided by their original authors.
            </p>
          </LicenseCard>

          <LicenseCard number="04" title="Disclaimer">
            <p>
              Tripora is a travel planning platform designed to help
              users create personalized and adaptable journeys.
            </p>

            <p>
              Travel information, recommendations, prices, availability,
              and other external information may change and should be
              independently verified before travel.
            </p>
          </LicenseCard>
        </div>

        {/* Copyright footer */}
        <div className="mt-12 border-t border-white/10 pt-7">
          <div className="flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Tripora. All rights reserved.</p>

            <p>
              Built for personalized travel planning.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

function LicenseCard({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: ReactNode
}) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-300 hover:border-amber/30 hover:bg-white/[0.04] sm:p-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] tracking-[0.22em] text-gold/80">
            {number}
          </p>

          <h2 className="mt-2 font-serif text-2xl text-cream sm:text-3xl">
            {title}
          </h2>
        </div>

        <span
          className="mt-1 h-2 w-2 rounded-full bg-amber shadow-[0_0_12px_rgba(244,168,58,0.7)]"
          aria-hidden="true"
        />
      </div>

      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
        {children}
      </div>
    </article>
  )
}