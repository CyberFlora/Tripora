import { mockTrips } from '../data/trips'
import type { Trip } from '../types'

/**
 * Trip access layer. Currently returns local mock data.
 * Replace implementations with HTTP calls when the backend is ready.
 */
export async function listTrips(): Promise<Trip[]> {
  return mockTrips
}

export async function getTripById(tripId: string): Promise<Trip | null> {
  return mockTrips.find((trip) => trip.id === tripId) ?? null
}

export async function createTripDraft(
  partial: Pick<Trip, 'from' | 'to'>,
): Promise<Trip> {
  return {
    id: `draft-${partial.to.toLowerCase()}`,
    title: `${partial.to} journey`,
    from: partial.from,
    to: partial.to,

    startDate: '',
    endDate: '',
    duration: 0,

    budgetInr: 0,
    travelers: 1,
    interests: [],

    tripType: '',
    travelStyle: 'Balanced',
    accommodation: 'Flexible',
    transportation: 'Mixed',

    additionalPreferences: '',

    status: 'draft',

    dna: [],

    itinerary: [],

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}