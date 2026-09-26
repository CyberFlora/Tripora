import { heroStats } from '../../data/home'
import { Button, Container, Eyebrow } from '../common'

export function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 grid-backdrop"
        aria-hidden="true"
      />

      {/* Left atmospheric glow */}
      <div
        className="pointer-events-none absolute -left-32 top-[35%] h-72 w-72 rounded-full bg-[#c45a28]/25 blur-[90px]"
        aria-hidden="true"
      />

      {/* Main glowing sphere */}
      <div
        className="pointer-events-none absolute right-[-12%] top-[14%] h-[520px] w-[520px] rounded-full opacity-95 sm:h-[620px] sm:w-[620px] lg:right-[-6%] lg:top-[12%] lg:h-[700px] lg:w-[700px]"
        aria-hidden="true"
      >
        {/* Outer atmospheric glow */}
        <div className="absolute -inset-16 rounded-full bg-[#d96532]/20 blur-[70px]" />

        {/* Sphere */}
        <div
          className="
            absolute inset-0 rounded-full animate-orb
            bg-[radial-gradient(circle_at_35%_35%,#ffd98a_0%,#f5a044_18%,#e66a32_42%,#c94d25_68%,#7d2c20_100%)]
            shadow-[0_0_100px_rgba(225,91,39,0.45),0_0_180px_rgba(225,91,39,0.2)]
          "
        />

        {/* Soft highlight */}
        <div
          className="
            absolute left-[18%] top-[14%]
            h-[30%] w-[30%]
            rounded-full
            bg-[#ffe8b0]/25
            blur-[45px]
          "
        />

        {/* Lower atmospheric glow */}
        <div
          className="
            absolute -bottom-12 left-[22%]
            h-40 w-[65%]
            rounded-full
            bg-[#1b5964]/45
            blur-[70px]
          "
        />
      </div>

      <Container className="relative flex min-h-[calc(100svh-72px)] items-center py-16 lg:py-20">
        <div className="relative z-10 max-w-2xl animate-fade-up">
          <Eyebrow>Personalized dynamic tour planning</Eyebrow>

          <h1
            id="hero-heading"
            className="mt-5 font-serif text-[52px] leading-[0.95] tracking-tight text-cream sm:text-7xl lg:text-[88px]"
          >
            Travel{' '}
            <span className="text-gradient-warm italic">
              Your Way.
            </span>
          </h1>

          <p className="mt-7 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Create personalized journeys designed around your budget,
            interests, travel style, and preferences.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button to="/plan" className="px-7 py-3">
              Plan My Trip
            </Button>

            <Button
  to="/#how-it-works"
  variant="secondary"
  className="px-7 py-3"
>
  How It Works
</Button>
          </div>

          <dl className="mt-12 flex flex-wrap gap-8 sm:gap-12">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>

                <dd className="font-serif text-2xl italic text-gold sm:text-[28px]">
                  {stat.value}
                </dd>

                <p className="mt-1 text-xs tracking-wide text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  )
}