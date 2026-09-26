import { Button, Container, Section } from '../common'

export function FinalCta() {
  return (
    <Section className="pb-28">
      <Container>
        <div className="relative overflow-hidden border border-white/10 px-6 py-16 text-center sm:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,168,58,0.14),transparent_55%)]" />
          <h2 className="relative font-serif text-4xl text-cream sm:text-5xl lg:text-6xl">
            Your next journey starts here.
          </h2>
          <p className="relative mx-auto mt-5 max-w-md text-muted">
            Tell us where you&apos;re going.
            We&apos;ll help shape the rest.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/plan" className="px-7 py-3">
              Plan My Trip
            </Button>
            <Button to="/explore" variant="secondary" className="px-7 py-3">
              Explore Destinations
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
