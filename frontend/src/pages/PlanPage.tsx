import { useState } from 'react'
import { planTrip } from '../services/api'
import { Button, Container, Eyebrow } from '../components/common'

type TripForm = {
  from: string
  destination: string
  startDate: string
  endDate: string
  travelers: number
  budget: number
  interests: string[]
  tripType: string
  travelStyle: string
  accommodation: string
  transportation: string
  additionalPreferences: string
}

const interests = [
  'Adventure',
  'Nature',
  'Food',
  'Culture',
  'History',
  'Shopping',
  'Nightlife',
  'Relaxation',
]

const tripTypes = ['Solo', 'Couple', 'Friends', 'Family']

const travelStyles = ['Budget', 'Balanced', 'Comfort', 'Luxury']

const accommodations = [
  'Hotel',
  'Hostel',
  'Resort',
  'Homestay',
  'Flexible',
]

const transportation = ['Flight', 'Train', 'Bus', 'Car', 'Mixed']

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-cream outline-none transition placeholder:text-muted/60 focus:border-gold/60 focus:bg-white/[0.06]'

const sectionClass =
  'rounded-2xl border border-white/8 bg-white/[0.025] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:p-8'

const optionClass =
  'rounded-xl border px-4 py-3 text-sm transition-all duration-200'

export function PlanPage() {
  const [form, setForm] = useState<TripForm>({
    from: '',
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 2,
    budget: 25000,
    interests: [],
    tripType: 'Friends',
    travelStyle: 'Balanced',
    accommodation: 'Hotel',
    transportation: 'Mixed',
    additionalPreferences: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  function updateField<K extends keyof TripForm>(
    field: K,
    value: TripForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))

    setErrors((current) => ({
      ...current,
      [field]: '',
    }))

    setSubmitted(false)
  }

  function toggleInterest(interest: string) {
  setForm((current) => {
    const alreadySelected = current.interests.includes(interest)

    if (alreadySelected) {
      return {
        ...current,
        interests: current.interests.filter(
          (item) => item !== interest,
        ),
      }
    }

    if (current.interests.length >= 3) {
      return current
    }

    return {
      ...current,
      interests: [...current.interests, interest],
    }
  })

  setSubmitted(false)
}

  function validate() {
    const nextErrors: Record<string, string> = {}

      if (!form.from.trim()) {
    nextErrors.from = 'Please enter your starting location.'
  }

    if (!form.destination.trim()) {
      nextErrors.destination = 'Please enter a destination.'
    }

    if (!form.startDate) {
      nextErrors.startDate = 'Please select a start date.'
    }

    if (!form.endDate) {
      nextErrors.endDate = 'Please select an end date.'
    }

    if (
      form.startDate &&
      form.endDate &&
      form.endDate < form.startDate
    ) {
      nextErrors.endDate = 'End date must be after the start date.'
    }

    if (form.travelers < 1) {
      nextErrors.travelers = 'At least 1 traveler is required.'
    }

    if (form.budget <= 0) {
      nextErrors.budget = 'Budget must be greater than ₹0.'
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

 async function handleSubmit(
  event: React.FormEvent<HTMLFormElement>,
) {
  event.preventDefault()

  if (!validate()) {
    setSubmitted(false)
    return
  }

  const payload = {
    destinationCity: form.destination,
    startingAddress: form.from,

    startDate: form.startDate,
    endDate: form.endDate,

    numberOfPeople: form.travelers,
    budget: form.budget,

    interests: form.interests,

    tripType: form.tripType,
    travelStyle: form.travelStyle,
    accommodation: form.accommodation,
    transportMode: form.transportation,

    additionalDetails: form.additionalPreferences,
  }

  try {
    console.log('Sending trip to backend:', payload)

    const result = await planTrip(payload)

    console.log('Backend response:', result)

    // Keep the complete backend result available
    // for the results/workspace page.
    sessionStorage.setItem(
      'tripora_trip_result',
      JSON.stringify(result),
    )

    setSubmitted(true)

  } catch (error) {
    console.error('Trip planning failed:', error)

    setSubmitted(false)

    setErrors({
      submit:
        error instanceof Error
          ? error.message
          : 'Failed to plan trip.',
    })
  }
}

  return (
    <div className="relative overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="grid-backdrop absolute inset-0" />
      </div>

      <Container className="relative">
        {/* Header */}
        <div className="max-w-3xl">
          <Eyebrow>PLAN YOUR TRIP</Eyebrow>

          <h1 className="mt-4 font-serif text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl">
            Build a journey that{' '}
            <span className="text-gradient-warm">feels like yours.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Tell Tripora what you want from your trip. We&apos;ll use your
            preferences to shape the journey around you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
          {/* Trip Basics */}
          <section className={sectionClass}>
            <div className="mb-7">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
                01
              </p>

              <h2 className="mt-2 font-serif text-2xl text-cream sm:text-3xl">
                Trip Basics
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              {/* From */}
<div>
  <label
    htmlFor="from"
    className="mb-2 block text-sm font-medium text-cream"
  >
    From
  </label>

  <input
    id="from"
    type="text"
    value={form.from}
    onChange={(event) =>
      updateField('from', event.target.value)
    }
    placeholder="Where are you starting from?"
    className={inputClass}
  />

  {errors.from && (
    <p className="mt-2 text-sm text-orange-300">
      {errors.from}
    </p>
  )}
</div>

              {/* Destination */}
              <div className="md:col-span-2">
                <label
                  htmlFor="destination"
                  className="mb-2 block text-sm font-medium text-cream"
                >
                  Destination
                </label>

                <input
                  id="destination"
                  type="text"
                  value={form.destination}
                  onChange={(event) =>
                    updateField('destination', event.target.value)
                  }
                  placeholder="Where do you want to go?"
                  className={inputClass}
                />

                {errors.destination && (
                  <p className="mt-2 text-sm text-orange-300">
                    {errors.destination}
                  </p>
                )}
              </div>

              {/* Start Date */}
              <div>
                <label
                  htmlFor="startDate"
                  className="mb-2 block text-sm font-medium text-cream"
                >
                  Start date
                </label>

                <input
                  id="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={(event) =>
                    updateField('startDate', event.target.value)
                  }
                  className={inputClass}
                />

                {errors.startDate && (
                  <p className="mt-2 text-sm text-orange-300">
                    {errors.startDate}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label
                  htmlFor="endDate"
                  className="mb-2 block text-sm font-medium text-cream"
                >
                  End date
                </label>

                <input
                  id="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={(event) =>
                    updateField('endDate', event.target.value)
                  }
                  className={inputClass}
                />

                {errors.endDate && (
                  <p className="mt-2 text-sm text-orange-300">
                    {errors.endDate}
                  </p>
                )}
              </div>

              {/* Travelers */}
              <div>
                <label className="mb-2 block text-sm font-medium text-cream">
                  Travelers
                </label>

                <div className="flex h-[50px] items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateField(
                        'travelers',
                        Math.max(1, form.travelers - 1),
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-cream transition hover:bg-white/10"
                    aria-label="Decrease travelers"
                  >
                    −
                  </button>

                  <span className="text-sm text-cream">
                    {form.travelers}{' '}
                    {form.travelers === 1 ? 'traveler' : 'travelers'}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      updateField('travelers', form.travelers + 1)
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-cream transition hover:bg-white/10"
                    aria-label="Increase travelers"
                  >
                    +
                  </button>
                </div>

                {errors.travelers && (
                  <p className="mt-2 text-sm text-orange-300">
                    {errors.travelers}
                  </p>
                )}
              </div>

              {/* Budget */}
              <div>
                <label
                  htmlFor="budget"
                  className="mb-2 block text-sm font-medium text-cream"
                >
                  Budget
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted">
                    ₹
                  </span>

                  <input
                    id="budget"
                    type="number"
                    min="1"
                    value={form.budget}
                    onChange={(event) =>
                      updateField(
                        'budget',
                        Number(event.target.value),
                      )
                    }
                    className={`${inputClass} pl-8`}
                  />
                </div>

                {errors.budget && (
                  <p className="mt-2 text-sm text-orange-300">
                    {errors.budget}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Interests */}
          <section className={sectionClass}>
            <div className="mb-7">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
                02
              </p>

              <h2 className="mt-2 font-serif text-2xl text-cream sm:text-3xl">
                What are you into?
              </h2>

              <p className="mt-2 text-sm text-muted">
               Choose up to 3 interests.
              </p>
            </div>

            <p className="mt-1 text-xs text-muted">
              {form.interests.length}/3 selected
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {interests.map((interest) => {
                const selected = form.interests.includes(interest)
                const disabled = !selected && form.interests.length >= 3
                

                return (
                  <button
                    key={interest}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleInterest(interest)}
                    className={`${optionClass} ${
                      selected
                        ? 'border-gold bg-gold/10 text-gold shadow-[0_0_24px_rgba(212,167,44,0.08)]'
                        : 'border-white/10 bg-white/[0.025] text-muted hover:border-white/20 hover:text-cream'
                    } ${
                     disabled
                     ? 'cursor-not-allowed opacity-40'
                     : ''
                     }`}
                     >
                     {interest}
                    </button>
                )
              })}
            </div>
          </section>

          {/* Trip Type */}
          <section className={sectionClass}>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              03
            </p>

            <h2 className="mt-2 font-serif text-2xl text-cream sm:text-3xl">
              Who&apos;s this trip for?
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {tripTypes.map((type) => {
                const selected = form.tripType === type

                return (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => updateField('tripType', type)}
                    className={`${optionClass} ${
                      selected
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-white/10 bg-white/[0.025] text-muted hover:border-white/20 hover:text-cream'
                    }`}
                  >
                    {type}
                  </button>
                )
              })}
            </div>
          </section>

          {/* Travel Style */}
          <section className={sectionClass}>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              04
            </p>

            <h2 className="mt-2 font-serif text-2xl text-cream sm:text-3xl">
              How do you like to travel?
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {travelStyles.map((style) => {
                const selected = form.travelStyle === style

                return (
                  <button
                    key={style}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => updateField('travelStyle', style)}
                    className={`${optionClass} ${
                      selected
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-white/10 bg-white/[0.025] text-muted hover:border-white/20 hover:text-cream'
                    }`}
                  >
                    {style}
                  </button>
                )
              })}
            </div>
          </section>

          {/* Accommodation */}
          <section className={sectionClass}>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              05
            </p>

            <h2 className="mt-2 font-serif text-2xl text-cream sm:text-3xl">
              Where would you like to stay?
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {accommodations.map((accommodation) => {
                const selected = form.accommodation === accommodation

                return (
                  <button
                    key={accommodation}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      updateField('accommodation', accommodation)
                    }
                    className={`${optionClass} ${
                      selected
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-white/10 bg-white/[0.025] text-muted hover:border-white/20 hover:text-cream'
                    }`}
                  >
                    {accommodation}
                  </button>
                )
              })}
            </div>
          </section>

          {/* Transportation */}
          <section className={sectionClass}>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              06
            </p>

            <h2 className="mt-2 font-serif text-2xl text-cream sm:text-3xl">
              How do you want to travel?
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {transportation.map((transport) => {
                const selected = form.transportation === transport

                return (
                  <button
                    key={transport}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      updateField('transportation', transport)
                    }
                    className={`${optionClass} ${
                      selected
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-white/10 bg-white/[0.025] text-muted hover:border-white/20 hover:text-cream'
                    }`}
                  >
                    {transport}
                  </button>
                )
              })}
            </div>
          </section>

          {/* Additional Preferences */}
          <section className={sectionClass}>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              07
            </p>

            <h2 className="mt-2 font-serif text-2xl text-cream sm:text-3xl">
              Anything else we should know?
            </h2>

            <p className="mt-2 text-sm text-muted">
              Add preferences that can help shape your journey.
            </p>

            <textarea
              value={form.additionalPreferences}
              onChange={(event) =>
                updateField(
                  'additionalPreferences',
                  event.target.value,
                )
              }
              rows={5}
              placeholder="Tell us about food preferences, must-visit places, places you'd like to avoid, accessibility needs, or anything else..."
              className={`${inputClass} mt-5 resize-none`}
            />
          </section>

          {/* Submit */}
          <div className="flex flex-col items-start gap-4 border-t border-white/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
            {errors.submit && (
  <p className="text-sm text-orange-300">
    {errors.submit}
  </p>
)}
              {submitted ? (
                <p className="text-sm text-gold">
                  ✓ Your trip preferences are ready.
                </p>
              ) : (
                <p className="text-sm text-muted">
                  Your preferences will shape your personalized journey.
                </p>
              )}
            </div>

            <Button type="submit" className="w-full px-7 py-3 sm:w-auto">
              Generate My Trip →
            </Button>
          </div>
        </form>
      </Container>
    </div>
  )
}