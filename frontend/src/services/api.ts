import { supabase } from '../lib/supabase'

const API_BASE_URL = "http://localhost:5000"

export type TripRequest = {
  destinationCity: string
  startingAddress: string
  startDate: string
  endDate: string
  numberOfPeople: number
  budget: number
  interests: string[]
  tripType: string
  travelStyle: string
  accommodation: string
  transportMode: string
  additionalDetails: string
}

export const planTrip = async (tripData: TripRequest) => {
  // 1. Send trip to the existing backend
  const response = await fetch(
    `${API_BASE_URL}/api/trips/plan`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripData),
    },
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to plan trip.",
    )
  }

  // 2. Save the trip request in Supabase
  const { data: savedTrip, error } = await supabase
    .from('Trips')
    .insert({
      starting_point_address: tripData.startingAddress,
      destination_city: tripData.destinationCity,
      start_date: tripData.startDate,
      end_date: tripData.endDate,
      number_of_people: tripData.numberOfPeople,
      budget: tripData.budget,
      interests: tripData.interests.join(', '),
      trip_type: tripData.tripType,
      other_details: [
        tripData.additionalDetails,
        `Travel style: ${tripData.travelStyle}`,
        `Accommodation: ${tripData.accommodation}`,
        `Transportation: ${tripData.transportMode}`,
      ]
        .filter(Boolean)
        .join(' | '),
      status: 'planned',
    })
    .select('*')
    .single()

  if (error) {
    console.error('Failed to save trip to Supabase:', error)

    throw new Error(
      `Trip was generated, but could not be saved: ${error.message}`,
    )
  }

  // 3. Return both backend result and database record
  return {
    ...data,
    savedTrip,
  }
}

export const whatIfTrip = async ({
  currentTrip,
  changeType,
  newValue,
}: {
  currentTrip: unknown
  changeType: string
  newValue: number
}) => {
  const response = await fetch(
    `${API_BASE_URL}/api/trips/what-if`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentTrip,
        changeType,
        newValue,
      }),
    },
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || "What-If request failed.",
    )
  }

  return data
}