import { supabase } from '../lib/supabase'
import type { Trip } from '../types'

type TripRow = {
  id: string
  traveler_id: string | null
  starting_point_address: string | null
  destination_city: string | null
  start_date: string | null
  end_date: string | null
  number_of_people: number | null
  budget: number | null
  interests: string | null
  trip_type: string | null
  must_include_places: string | null
  other_details: string | null
  status: string | null
  create_at: string | null
}

function mapTrip(row: TripRow): Trip {
  const startDate = row.start_date ?? ''
  const endDate = row.end_date ?? ''

  let duration = 0

  if (startDate && endDate) {
    const start = new Date(startDate)
    const end = new Date(endDate)

    duration = Math.max(
      1,
      Math.ceil(
        (end.getTime() - start.getTime()) /
          (1000 * 60 * 60 * 24),
      ),
    )
  }

  const interests = row.interests
    ? row.interests
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    : []

  const additionalPreferences = [
    row.must_include_places
      ? `Must include: ${row.must_include_places}`
      : '',
    row.other_details ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return {
    id: row.id,

    title: row.destination_city
      ? `${row.destination_city} journey`
      : 'Trip',

    from: row.starting_point_address ?? '',
    to: row.destination_city ?? '',

    startDate,
    endDate,
    duration,

    travelers: row.number_of_people ?? 1,
    budgetInr: Number(row.budget ?? 0),
    interests,

    tripType: row.trip_type ?? '',

    // These fields do not exist in the current database schema.
    travelStyle: 'Balanced',
    accommodation: 'Flexible',
    transportation: 'Mixed',

    additionalPreferences,

    status:
      row.status === 'planned' ||
      row.status === 'active' ||
      row.status === 'completed'
        ? row.status
        : 'draft',

    dna: [],
    itinerary: [],

    createdAt: row.create_at ?? '',
    updatedAt: row.create_at ?? '',
  }
}

export async function listTrips(): Promise<Trip[]> {
  const { data, error } = await supabase
    .from('Trips')
    .select('*')
    .order('create_at', { ascending: false })

  if (error) {
    console.error('Failed to load trips:', error)
    return []
  }

  return (data as TripRow[]).map(mapTrip)
}

export async function getTripById(
  tripId: string,
): Promise<Trip | null> {
  const { data, error } = await supabase
    .from('Trips')
    .select('*')
    .eq('id', tripId)
    .maybeSingle()

  if (error) {
    console.error('Failed to load trip:', error)
    return null
  }

  return data ? mapTrip(data as TripRow) : null
}

export async function createTripDraft(
  partial: Pick<Trip, 'from' | 'to'>,
): Promise<Trip> {
  const { data, error } = await supabase
    .from('Trips')
    .insert({
      starting_point_address: partial.from,
      destination_city: partial.to,
      status: 'draft',
      number_of_people: 1,
      budget: 0,
    })
    .select('*')
    .single()

  if (error) {
    console.error('Failed to create trip:', error)
    throw error
  }

  return mapTrip(data as TripRow)
}