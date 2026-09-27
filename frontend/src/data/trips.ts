import type { Trip } from '../types/trip'

export const mockTrips: Trip[] = [
  {
    id: 'goa-friends-oct',
    title: 'Goa Friends Getaway',

    from: 'Mumbai',
    to: 'Goa',

    startDate: '2026-10-10',
    endDate: '2026-10-13',
    duration: 4,

    travelers: 4,
    budgetInr: 30000,
    interests: ['Beaches', 'Food', 'Adventure'],

    tripType: 'Friends',
    travelStyle: 'Balanced',
    accommodation: 'Hotel',
    transportation: 'Train + Local Cab',

    additionalPreferences:
      'Prefer beaches, local food and adventure activities.',

    status: 'planned',

    dna: [
      'Nature-driven',
      'Food-focused',
      'Adventure-ready',
    ],

    itinerary: [],

    createdAt: '2026-09-20T10:00:00Z',
    updatedAt: '2026-09-20T10:00:00Z',
  },

  {
    id: 'jaipur-weekend',
    title: 'Jaipur Heritage Weekend',

    from: 'Mumbai',
    to: 'Jaipur',

    startDate: '2026-11-07',
    endDate: '2026-11-09',
    duration: 3,

    travelers: 2,
    budgetInr: 20000,
    interests: ['Heritage', 'Food', 'Culture'],

    tripType: 'Weekend',
    travelStyle: 'Comfort',
    accommodation: 'Boutique Hotel',
    transportation: 'Flight + Local Cab',

    additionalPreferences:
      'Interested in heritage sites and local cuisine.',

    status: 'draft',

    dna: [
      'Heritage-led',
      'Food-focused',
    ],

    itinerary: [],

    createdAt: '2026-09-20T10:00:00Z',
    updatedAt: '2026-09-20T10:00:00Z',
  },
]