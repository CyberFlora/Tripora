import type { Trip } from '../types'

export const mockTrips: Trip[] = [
  {
    id: 'goa-friends-oct',
    title: 'Goa with friends',
    from: 'Mumbai',
    to: 'Goa',
    startDate: '2026-10-12',
    endDate: '2026-10-17',
    budgetInr: 25000,
    travelers: 4,
    interests: ['Nature', 'Food', 'Adventure'],
    occasion: 'Friends',
    status: 'planned',
    dna: ['Nature-driven', 'Food-focused', 'Adventure-ready'],
  },
  {
    id: 'jaipur-weekend',
    title: 'Jaipur weekend',
    from: 'Delhi',
    to: 'Jaipur',
    startDate: '2026-11-07',
    endDate: '2026-11-09',
    budgetInr: 18000,
    travelers: 2,
    interests: ['Heritage', 'Food'],
    occasion: 'Couple',
    status: 'draft',
    dna: ['Heritage-led', 'Food-focused'],
  },
]
