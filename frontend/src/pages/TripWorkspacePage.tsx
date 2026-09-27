import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Container, Eyebrow } from '../components/common'
import { getTripById } from '../services/tripService'
import type { ItineraryDay, Trip } from '../types/trip'
type PlannerWeather = {
  date: string
  weatherCode: number
  temperatureMax: number
  temperatureMin: number
  precipitationMm: number
  precipitationProbability: number
}

type PlannerPreferences = {
  numberOfPeople?: number
  budget?: number
  interests?: string[]
  tripType?: string
  travelStyle?: string
  accommodation?: string
  transportMode?: string
  additionalDetails?: string
}

type PlannerResult = {
  itinerary?: ItineraryDay[] | null
  weather?: PlannerWeather[] | null
  preferences?: PlannerPreferences | null
  route?: Record<string, unknown> | null
  aiStatus?: string
}

export function TripWorkspacePage() {
  const { tripId } = useParams()

  const [trip, setTrip] = useState<Trip | null>(null)
  const [plannerResult, setPlannerResult] = useState<PlannerResult | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!tripId) return

    let active = true

    void getTripById(tripId).then((result) => {
      if (!active) return

      setTrip(result)

      const keyedResult = sessionStorage.getItem(
        `tripora_trip_result_${tripId}`,
      )

      const fallbackResult = sessionStorage.getItem(
        'tripora_trip_result',
      )

      const storedResult = keyedResult ?? fallbackResult

      if (storedResult) {
        try {
          setPlannerResult(JSON.parse(storedResult))
        } catch {
          setPlannerResult(null)
        }
      }

      setReady(true)
    })

    return () => {
      active = false
    }
  }, [tripId])

  const itinerary = useMemo(() => {
    if (plannerResult?.itinerary?.length) {
      return plannerResult.itinerary
    }

    return trip?.itinerary ?? []
  }, [plannerResult, trip])

  const weather = plannerResult?.weather ?? []

  return (
    <div className="py-16 sm:py-20">
      <Container>
        {!tripId && (
          <>
            <Eyebrow>Trip workspace</Eyebrow>
            <h1 className="mt-4 font-serif text-4xl text-cream">
              Trip not found.
            </h1>

            <div className="mt-8">
              <Button to="/my-trips" variant="secondary">
                Back to My Trips
              </Button>
            </div>
          </>
        )}

        {tripId && !ready && (
          <>
            <Eyebrow>Trip workspace</Eyebrow>
            <p className="mt-6 text-muted">Loading journey…</p>
          </>
        )}

        {ready && !trip && (
          <>
            <Eyebrow>Trip workspace</Eyebrow>
            <h1 className="mt-4 font-serif text-4xl text-cream">
              Trip not found.
            </h1>

            <p className="mt-4 text-muted">
              This journey could not be loaded from Supabase.
            </p>

            <div className="mt-8">
              <Button to="/my-trips" variant="secondary">
                Back to My Trips
              </Button>
            </div>
          </>
        )}

        {trip && (
          <>
            <Eyebrow>Trip workspace</Eyebrow>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="font-serif text-4xl text-cream sm:text-5xl">
                  {trip.title}
                </h1>

                <p className="mt-3 text-muted">
                  {trip.from} → {trip.to}
                </p>
              </div>

              <div className="rounded-full border border-white/10 px-4 py-2 text-xs tracking-[0.15em] text-gold uppercase">
                {plannerResult?.aiStatus === 'pending'
                  ? 'Planner pending'
                  : 'Planner ready'}
              </div>
            </div>

            {/* Overview */}
            <section className="mt-10">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
                    Budget
                  </p>
                  <p className="mt-2 font-serif text-2xl text-cream">
                    ₹{trip.budgetInr.toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
                    Travelers
                  </p>
                  <p className="mt-2 font-serif text-2xl text-cream">
                    {trip.travelers}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
                    Dates
                  </p>
                  <p className="mt-2 text-cream">
                    {trip.startDate || '—'} → {trip.endDate || '—'}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
                    Trip type
                  </p>
                  <p className="mt-2 text-cream">
                    {trip.tripType || '—'}
                  </p>
                </div>
              </div>
            </section>

            {/* Trip DNA */}
            {trip.interests.length > 0 && (
              <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
                  Trip DNA
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {trip.interests.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-full border border-white/10 px-3 py-2 text-sm text-cream/80"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Planner result */}
            <section className="mt-10">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
                    Planner workspace
                  </p>

                  <h2 className="mt-2 font-serif text-3xl text-cream">
                    Your generated journey
                  </h2>
                </div>
              </div>

              {!plannerResult && (
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="text-muted">
                    Planner data is not attached to this trip yet. Generate
                    the trip again from the Plan page to attach the latest
                    planning result.
                  </p>
                </div>
              )}

              {plannerResult && itinerary.length === 0 && (
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="text-lg text-cream">
                    Your trip preferences are ready.
                  </p>

                  <p className="mt-2 text-sm text-muted">
                    The itinerary is currently pending from the planner
                    service. The live planning data is attached below.
                  </p>
                </div>
              )}

              {itinerary.length > 0 && (
                <div className="mt-6 space-y-5">
                  {itinerary.map((day) => (
                    <div
                      key={day.day}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
                            Day {day.day}
                          </p>

                          <h3 className="mt-1 font-serif text-2xl text-cream">
                            {day.title}
                          </h3>
                        </div>

                        <p className="text-sm text-muted">
                          {day.date}
                        </p>
                      </div>

                      <div className="mt-6 space-y-4">
                        {day.activities.map((activity) => (
                          <div
                            key={activity.id}
                            className="rounded-xl border border-white/10 p-4"
                          >
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <p className="text-sm text-gold">
                                  {activity.time}
                                </p>

                                <h4 className="mt-1 text-lg text-cream">
                                  {activity.title}
                                </h4>

                                <p className="mt-2 text-sm text-muted">
                                  {activity.description}
                                </p>
                              </div>

                              {activity.estimatedCost !== undefined && (
                                <p className="text-sm text-cream/80">
                                  ₹
                                  {activity.estimatedCost.toLocaleString(
                                    'en-IN',
                                  )}
                                </p>
                              )}
                            </div>

                            {activity.location && (
                              <p className="mt-3 text-xs text-muted">
                                {activity.location}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Weather */}
            {weather.length > 0 && (
              <section className="mt-10">
                <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
                  Weather outlook
                </p>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {weather.map((day) => (
                    <div
                      key={day.date}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                    >
                      <p className="text-sm text-cream">{day.date}</p>

                      <p className="mt-3 font-serif text-2xl text-cream">
                        {day.temperatureMax}° / {day.temperatureMin}°
                      </p>

                      <p className="mt-2 text-sm text-muted">
                        Rain: {day.precipitationMm} mm
                      </p>

                      <p className="mt-1 text-sm text-muted">
                        Rain chance: {day.precipitationProbability}%
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Preferences */}
            {plannerResult?.preferences && (
              <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
                  Planning preferences
                </p>

                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-xs text-muted">Travel style</p>
                    <p className="mt-1 text-cream">
                      {plannerResult.preferences.travelStyle || '—'}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted">Accommodation</p>
                    <p className="mt-1 text-cream">
                      {plannerResult.preferences.accommodation || '—'}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted">Transport</p>
                    <p className="mt-1 text-cream">
                      {plannerResult.preferences.transportMode || '—'}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted">Budget</p>
                    <p className="mt-1 text-cream">
                      ₹
                      {Number(
                        plannerResult.preferences.budget ?? trip.budgetInr,
                      ).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Actions */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/plan">
                Continue planning
              </Button>

              <Button to="/my-trips" variant="secondary">
                Back to My Trips
              </Button>
            </div>
          </>
        )}
      </Container>
    </div>
  )
}