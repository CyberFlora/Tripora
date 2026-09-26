import { mockDestinations } from '../data/destinations'
import type { Destination } from '../types'

/**
 * Destination access layer. Mocked until the backend catalog exists.
 */
export async function listDestinations(): Promise<Destination[]> {
  return mockDestinations
}

export async function getDestinationById(id: string): Promise<Destination | null> {
  return mockDestinations.find((destination) => destination.id === id) ?? null
}
