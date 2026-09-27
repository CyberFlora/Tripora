export type TripStatus =
  | 'draft'
  | 'planned'
  | 'active'
  | 'completed'

export type JourneyStageId =
  | 'discover'
  | 'personalize'
  | 'plan'
  | 'price'
  | 'book'
  | 'prepare'
  | 'operate'
  | 'assist'
  | 'adapt'
  | 'complete'
  | 'review'

export type JourneyStage = {
  id: JourneyStageId
  name: string
  summary: string
}

export type TripDnaPreview = {
  from: string
  to: string
  datesLabel: string
  budgetLabel: string
  travelers: number
  interests: string[]
  tripType: string
  dna: string[]
}

export type Trip = {
  id: string
  title: string

  // Location
  from: string
  to: string

  // Dates
  startDate: string
  endDate: string
  duration: number

  // Basic preferences
  travelers: number
  budgetInr: number
  interests: string[]

  // Trip preferences
  tripType: string
  travelStyle: string
  accommodation: string
  transportation: string

  // User's free-form preferences
  additionalPreferences: string

  // Trip state
  status: TripStatus

  // Trip DNA
  dna: string[]

  // Generated itinerary
  itinerary: ItineraryDay[]

  // Metadata
  createdAt: string
  updatedAt: string
}

export type ItineraryDay = {
  day: number
  date: string
  title: string
  activities: Activity[]
}

export type Activity = {
  id: string
  time: string
  title: string
  description: string
  location?: string
  category?: string
  estimatedCost?: number
}

export type WhatIfScenario = {
  original: {
    budgetLabel: string
    durationLabel: string
    travelersLabel: string
  }
  question: string
  adapted: {
    budgetLabel: string
    durationLabel: string
    travelersLabel: string
  }
  outcomes: string[]
}