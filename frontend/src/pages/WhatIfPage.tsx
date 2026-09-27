import {
  ArrowLeft,
  CloudRain,
  MapPin,
  Thermometer,
  Wind,
  Users,
  Hotel,
  Car,
  Umbrella,
  RefreshCw,
  Radio,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { Container } from '../components/common'

type WeatherData = {
  temperature: number
  rain: number
  wind: number
  weatherCode: number
}

type Impact = {
  transport: number
  outdoor: number
  hotel: number
  cancellation: number
  restaurant: number
}

type SocialSignal = {
  text: string
  author: string
  createdAt: string
}

function calculateImpact(rainfall: number, temperature: number): Impact {
  const rainFactor = Math.min(rainfall / 100, 1)
  const heatFactor = temperature > 35 ? (temperature - 35) / 10 : 0

  return {
    transport: Math.round(-(rainFactor * 35)),
    outdoor: Math.round(-(rainFactor * 55 + heatFactor * 20)),
    hotel: Math.round(rainFactor * 22 + heatFactor * 10),
    cancellation: Math.round(rainFactor * 18 + heatFactor * 8),
    restaurant: Math.round(rainFactor * 10),
  }
}

function weatherLabel(code: number) {
  if (code === 0) return 'Clear sky'
  if (code <= 3) return 'Partly cloudy'
  if (code <= 48) return 'Foggy'
  if (code <= 57) return 'Drizzle'
  if (code <= 67) return 'Rain'
  if (code <= 77) return 'Snow'
  if (code <= 82) return 'Rain showers'
  if (code <= 99) return 'Thunderstorm'
  return 'Weather event'
}

export function WhatIfPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [rainfall, setRainfall] = useState(20)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [signals, setSignals] = useState<SocialSignal[]>([])
  const [signalsLoading, setSignalsLoading] = useState(true)

  // Goa coordinates
  const latitude = 15.4909
  const longitude = 73.8278

  async function loadWeather() {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,rain,wind_speed_10m,weather_code&hourly=rain&forecast_days=1`,
      )

      if (!response.ok) {
        throw new Error('Weather request failed')
      }

      const data = await response.json()

      const currentRain = Number(data.current?.rain ?? 0)
      const temperature = Number(data.current?.temperature_2m ?? 28)
      const wind = Number(data.current?.wind_speed_10m ?? 0)
      const weatherCode = Number(data.current?.weather_code ?? 0)

      setWeather({
        temperature,
        rain: currentRain,
        wind,
        weatherCode,
      })

      setRainfall(Math.max(20, Math.round(currentRain * 10)))
    } catch {
      setError('Live weather could not be loaded. Demo values are being used.')

      setWeather({
        temperature: 29,
        rain: 2,
        wind: 12,
        weatherCode: 61,
      })

      setRainfall(20)
    } finally {
      setLoading(false)
    }
  }

  async function loadSocialSignals() {
  try {
    setSignalsLoading(true)

    const response = await fetch(
      'https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts?q=Goa%20rain&limit=5',
    )

    if (!response.ok) {
      throw new Error('Social signal request failed')
    }

    const data = await response.json()

    const posts: SocialSignal[] = (data.posts ?? [])
      .slice(0, 5)
      .map((post: any) => ({
        text: post.record?.text ?? '',
        author:
          post.author?.displayName ||
          post.author?.handle ||
          'Public traveler',
        createdAt: post.record?.createdAt ?? '',
      }))

    setSignals(posts)
  } catch {
    setSignals([])
  } finally {
    setSignalsLoading(false)
  }
}

  useEffect(() => {
    loadWeather()
    loadSocialSignals()
  }, [])

  const temperature = weather?.temperature ?? 29

  const impact = useMemo(
    () => calculateImpact(rainfall, temperature),
    [rainfall, temperature],
  )

  const severity =
    rainfall < 20 ? 'LOW' : rainfall < 50 ? 'MODERATE' : 'HIGH'

  return (
    <section className="relative min-h-[calc(100svh-72px)] overflow-hidden py-12 lg:py-20">
      <div
        className="pointer-events-none absolute inset-0 grid-backdrop opacity-60"
        aria-hidden="true"
      />

      <Container className="relative">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted hover:text-cream"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        {/* Header */}
        <div className="max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs uppercase tracking-[0.16em] text-cyan-300">
            <CloudRain size={14} />
            Tripora Digital Twin
          </div>

          <h1 className="font-serif text-5xl leading-tight text-cream sm:text-6xl">
            Weather-driven{' '}
            <span className="text-gradient-warm italic">simulation.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Tripora continuously simulates how changing weather conditions can
            affect transportation, accommodation, attractions and traveler
            behaviour.
          </p>
        </div>

        {/* Live weather */}
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          <WeatherCard
            icon={<CloudRain size={20} />}
            label="Current weather"
            value={
              loading
                ? 'Loading...'
                : weather
                  ? weatherLabel(weather.weatherCode)
                  : 'Unavailable'
            }
          />

          <WeatherCard
            icon={<Thermometer size={20} />}
            label="Temperature"
            value={`${temperature.toFixed(1)}°C`}
          />

          <WeatherCard
            icon={<CloudRain size={20} />}
            label="Current rain"
            value={`${weather?.rain ?? 0} mm`}
          />

          <WeatherCard
            icon={<Wind size={20} />}
            label="Wind"
            value={`${weather?.wind ?? 0} km/h`}
          />
        </div>

        {error && (
          <p className="mt-3 text-xs text-amber-300">
            {error}
          </p>
        )}

        {/* Main Twin */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] shadow-2xl backdrop-blur-sm">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            {/* Destination */}
            <div className="border-b border-white/10 p-7 lg:border-b-0 lg:border-r lg:p-10">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold">
                <MapPin size={14} />
                Simulated destination
              </div>

              <h2 className="mt-4 font-serif text-4xl text-cream">
                Goa
              </h2>

              <p className="mt-2 text-sm text-muted">
                Mumbai → Goa · 4 travelers · 4 days
              </p>

              <div className="mt-8 rounded-2xl border border-white/8 bg-black/20 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.15em] text-muted">
                    Twin state
                  </span>

                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                    LIVE
                  </span>
                </div>

                <p className="mt-5 text-2xl text-cream">
                  {severity} weather impact
                </p>

                <p className="mt-2 text-sm leading-relaxed text-muted">
                  The simulated state updates when real weather or your
                  scenario changes.
                </p>
              </div>

              <button
                type="button"
                onClick={loadWeather}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-muted hover:border-white/20 hover:text-cream"
              >
                <RefreshCw size={15} />
                Refresh live weather
              </button>
            </div>

            {/* Simulation */}
            <div className="p-7 lg:p-10">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gold">
                <CloudRain size={14} />
                What-if simulation
              </div>

              <h2 className="mt-4 font-serif text-3xl text-cream">
                What if rainfall changes?
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                Change rainfall intensity and watch the Digital Twin propagate
                the change across Tripora's travel ecosystem.
              </p>

              <div className="mt-9">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-muted">
                      Simulated rainfall
                    </p>

                    <p className="mt-1 font-serif text-4xl text-gradient-warm">
                      {rainfall} mm
                    </p>
                  </div>

                  <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-muted">
                    {severity} impact
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={rainfall}
                  onChange={(event) =>
                    setRainfall(Number(event.target.value))
                  }
                  className="mt-8 w-full accent-[#c45a28]"
                  aria-label="Simulated rainfall"
                />

                <div className="mt-2 flex justify-between text-xs text-muted">
                  <span>0 mm</span>
                  <span>50 mm</span>
                  <span>100 mm</span>
                </div>
              </div>

              {/* Impact */}
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                <ImpactCard
                  icon={<Car size={18} />}
                  label="Transport availability"
                  value={`${impact.transport}%`}
                  negative
                />

                <ImpactCard
                  icon={<Umbrella size={18} />}
                  label="Outdoor attraction demand"
                  value={`${impact.outdoor}%`}
                  negative
                />

                <ImpactCard
                  icon={<Hotel size={18} />}
                  label="Hotel demand"
                  value={`+${impact.hotel}%`}
                />

                <ImpactCard
                  icon={<Users size={18} />}
                  label="Cancellation risk"
                  value={`+${impact.cancellation}%`}
                  negative
                />
              </div>
            </div>
          </div>

          {/* Propagation */}
          <div className="border-t border-white/10 p-7 lg:p-10">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-gold">
              <Radio size={14} />
              Impact propagation
            </div>

            <h2 className="mt-2 font-serif text-2xl text-cream">
              One weather event. Multiple system effects.
            </h2>

            <div className="mt-7 grid gap-3 md:grid-cols-4">
              <Propagation
                title="Weather"
                value={`${rainfall}mm rain`}
              />

              <Propagation
                title="Transport"
                value={`${impact.transport}% availability`}
              />

              <Propagation
                title="Attractions"
                value={`${impact.outdoor}% demand`}
              />

              <Propagation
                title="Hotels"
                value={`+${impact.hotel}% demand`}
              />
            </div>
          </div>
        </div>

        {/* Map + public signals */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-gold">
                <MapPin size={14} />
                Geospatial twin
              </div>

              <h2 className="mt-2 font-serif text-2xl text-cream">
                Goa weather impact map
              </h2>
            </div>

            <iframe
              title="Goa map"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=73.65%2C15.35%2C74.05%2C15.65&layer=mapnik&marker=${latitude}%2C${longitude}`}
              className="h-[320px] w-full border-0"
              loading="lazy"
            />

            <div className="p-5 text-xs text-muted">
              📍 Goa · Live weather input · Simulated impact:{' '}
              <span className="text-cream">{severity}</span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 lg:p-8">
  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-gold">
    <Radio size={14} />
    Public travel signals
  </div>

  <div className="mt-2 flex items-center justify-between gap-4">
    <h2 className="font-serif text-2xl text-cream">
      Real-world traveler signals
    </h2>

    <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-cyan-300">
      LIVE
    </span>
  </div>
  </div>

  <p className="mt-2 text-sm leading-relaxed text-muted">
    Public social posts mentioning Goa and rainfall are used as contextual
    signals alongside the live weather feed.
  </p>

  <div className="mt-6 space-y-3">
    {signalsLoading ? (
      <div className="rounded-2xl border border-white/8 bg-black/20 p-5">
        <p className="text-sm text-muted">
          Loading public travel signals...
        </p>
      </div>
    ) : signals.length > 0 ? (
      signals.map((signal, index) => (
        <div
          key={`${signal.author}-${index}`}
          className="rounded-2xl border border-white/8 bg-black/20 p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-cream">
              @{signal.author}
            </p>

            <span className="text-[10px] uppercase tracking-[0.1em] text-cyan-300">
              Public signal
            </span>
          </div>

          <p className="mt-2 text-xs leading-relaxed text-muted">
            {signal.text}
          </p>
        </div>
      ))
    ) : (
      <div className="rounded-2xl border border-white/8 bg-black/20 p-5">
        <p className="text-sm text-cream">
          No recent public Goa rain signals found.
        </p>

        <p className="mt-2 text-xs leading-relaxed text-muted">
          The Digital Twin continues using live weather data as its primary
          signal.
        </p>
      </div>
    )}
  </div>

  <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">
    <p className="text-xs uppercase tracking-[0.15em] text-cyan-300">
      Twin signal status
    </p>

    <p className="mt-2 text-sm text-cream">
      Weather signal: Active
    </p>

    <p className="mt-1 text-xs text-muted">
      Public social signal: {signals.length > 0 ? 'Active' : 'No current results'}
    </p>
  </div>
</div>

        <p className="mt-6 text-center text-xs text-muted">
          Digital Twin simulation is a decision-support model. Simulated
          impacts are estimates and do not alter real bookings or operations.
        </p>
      </Container>
    </section>
  )
}

function WeatherCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <div className="flex items-center gap-2 text-gold">
        {icon}
        <span className="text-xs uppercase tracking-[0.12em]">
          {label}
        </span>
      </div>

      <p className="mt-4 font-serif text-2xl text-cream">
        {value}
      </p>
    </div>
  )
}

function ImpactCard({
  icon,
  label,
  value,
  negative = false,
}: {
  icon: React.ReactNode
  label: string
  value: string
  negative?: boolean
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/20 p-5">
      <div className="flex items-center gap-2 text-muted">
        {icon}
        <span className="text-xs">{label}</span>
      </div>

      <p
        className={`mt-3 font-serif text-2xl ${
          negative ? 'text-amber-300' : 'text-emerald-300'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function Propagation({
  title,
  value,
}: {
  title: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/20 p-5">
      <p className="text-xs uppercase tracking-[0.12em] text-muted">
        {title}
      </p>

      <p className="mt-3 text-sm text-cream">{value}</p>
    </div>
  )
}

