import type {
  FeatureHighlight,
  JourneyStage,
  TripDnaPreview,
  WhatIfScenario,
  WhyTriporaPoint,
} from '../types'

export const whyTriporaPoints: WhyTriporaPoint[] = [
  {
    id: 'personalized',
    eyebrow: 'Personalized',
    title: 'Built around you',
    body: 'Your budget, interests, travel style and preferences shape your recommendations.',
  },
  {
    id: 'dynamic',
    eyebrow: 'Dynamic',
    title: 'Plans that adapt',
    body: 'Your journey can evolve when plans, priorities or circumstances change.',
  },
  {
    id: 'budget',
    eyebrow: 'Budget-first',
    title: 'Travel within your reality',
    body: 'Build meaningful experiences while staying aware of your budget.',
  },
  {
    id: 'connected',
    eyebrow: 'Connected',
    title: 'Everything in one journey',
    body: 'Discover, plan, optimize, adapt and prepare from one place.',
  },
]

export const journeyStages: JourneyStage[] = [
  { id: 'discover', name: 'Discover', summary: 'Find destinations that fit how you actually travel.' },
  { id: 'personalize', name: 'Personalize', summary: 'Shape a Trip DNA from budget, people, and taste.' },
  { id: 'plan', name: 'Plan', summary: 'Turn preferences into a coherent day-by-day journey.' },
  { id: 'price', name: 'Price', summary: 'See cost clearly before you commit to the shape of the trip.' },
  { id: 'prepare', name: 'Prepare', summary: 'Arrive ready — documents, packing, and practicals in view.' },
  { id: 'operate', name: 'Operate', summary: 'Move through the itinerary with a live, calm workspace.' },
  { id: 'assist', name: 'Assist', summary: 'Get help when a day bends without losing the trip.' },
  { id: 'adapt', name: 'Adapt', summary: 'Recalibrate budget, pace, or plans as reality shifts.' },
  { id: 'complete', name: 'Complete', summary: 'Close the journey with everything accounted for.' },
]

export const sampleTripDna: TripDnaPreview = {
  from: 'Mumbai',
  to: 'Goa',
  datesLabel: '12 Oct — 17 Oct',
  budgetLabel: '₹25,000',
  travelers: 4,
  interests: ['Nature', 'Food', 'Adventure'],
  tripType: 'Friends',
  dna: ['Nature-driven', 'Food-focused', 'Adventure-ready'],
}

export const smartFeatures: FeatureHighlight[] = [
  {
    id: 'trip-dna',
    name: 'Trip DNA',
    summary: 'A living profile of how you travel — used to shape every recommendation.',
  },
  {
    id: 'budget-optimizer',
    name: 'Smart Budget Optimizer',
    summary: 'Balance stay, movement, and experiences without draining the trip of character.',
  },
  {
    id: 'why-this',
    name: 'Why This Recommendation',
    summary: 'See the reasoning behind each suggestion, not just a list of options.',
  },
  {
    id: 'activity-swap',
    name: 'Smart Activity Swap',
    summary: 'Replace one experience and keep the day, budget, and energy in balance.',
  },
  {
    id: 'group-balance',
    name: 'Group Preference Balancing',
    summary: 'Hold space for different tastes without flattening the journey into compromise.',
  },
  {
    id: 'readiness',
    name: 'Trip Readiness Score',
    summary: 'Know what is still open before you leave — bookings, documents, and gaps.',
  },
  {
    id: 'adaptation',
    name: 'Smart Adaptation',
    summary: 'When the day changes, the plan can change with it — calmly and in context.',
  },
  {
    id: 'what-if',
    name: 'What-If Mode',
    summary: 'Test a smaller budget, a shorter stay, or a new constraint before you commit.',
  },
]

export const whatIfScenario: WhatIfScenario = {
  original: {
    budgetLabel: '₹25,000',
    durationLabel: '5 Days',
    travelersLabel: '4 Travelers',
  },
  question: 'What if my budget becomes ₹18,000?',
  adapted: {
    budgetLabel: '₹18,000',
    durationLabel: '5 Days',
    travelersLabel: '4 Travelers',
  },
  outcomes: [
    'Activities adjusted',
    'Stay optimized',
    'Budget balanced',
    'Experience preserved',
  ],
}

export const heroStats = [
  { value: '9', label: 'journey stages' },
  { value: 'Live', label: 'trip adaptation' },
  { value: '₹', label: 'budget-first plans' },
] as const
