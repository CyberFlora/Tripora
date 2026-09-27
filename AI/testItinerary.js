import { generateItinerary } from "./itineraryGenerator.js";

const testTrip = {
    destinationCity: "Goa",
    startingAddress: "Kalyan, Maharashtra",

    startDate: "2026-09-28",
    endDate: "2026-10-01",
    numberOfDays: 4,

    numberOfPeople: 3,
    budget: 15000,

    interests: [
        "beaches",
        "food",
        "adventure"
    ],

    tripType: "friends",
    travelStyle: "balanced",
    accommodation: "hotel",
    transportMode: "mixed",

    additionalDetails:
        "Must visit Fort Aguada and a good local restaurant",

    distanceKm: 596.42,
    durationMinutes: 812,

    weather: [
        {
            date: "2026-09-28",
            weatherCode: 1,
            temperatureMax: 31,
            temperatureMin: 25,
            precipitationMm: 2,
            precipitationProbability: 30
        }
    ]
};


const run = async () => {

    try {

        console.log("Generating Tripora itinerary...");

        const itinerary =
            await generateItinerary(testTrip);

        console.log("\nSUCCESS!");
        console.log(
            JSON.stringify(itinerary, null, 2)
        );

    } catch (error) {

        console.error("\nFAILED:");
        console.error(error.message);

    }
};


run();