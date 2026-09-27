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

  return data
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