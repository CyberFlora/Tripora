const {
    geocodeTripLocations
} = require("./geocodingService");

const {
    getRoute
} = require("./routingService");

const {
    getWeather
} = require("./weatherService");


const calculateNumberOfDays = (startDate, endDate) => {
    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        throw new Error("Invalid trip dates.");
    }

    if (end < start) {
        throw new Error("End date cannot be before start date.");
    }

    const difference =
        Math.round(
            (end.getTime() - start.getTime()) /
            (1000 * 60 * 60 * 24)
        );

    return difference + 1;
};


const buildTripData = async ({
    startingAddress,
    destinationCity,
    startDate,
    endDate,

    numberOfPeople,
    budget,
    interests,

    tripType,
    travelStyle,
    accommodation,
    transportMode,

    additionalDetails
}) => {

    // 1. Geocode starting point and destination
    const locations = await geocodeTripLocations(
        startingAddress,
        destinationCity
    );

    // 2. Calculate road route
    const route = await getRoute(
        locations.startingLocation,
        locations.destinationLocation
    );

    // 3. Get destination weather
    const weather = await getWeather(
        locations.destinationLocation,
        startDate,
        endDate
    );

    // 4. Calculate trip duration
    const numberOfDays = calculateNumberOfDays(
        startDate,
        endDate
    );

    return {
        numberOfDays,

        locations,

        route,

        weather,

        preferences: {
            numberOfPeople,
            budget,
            interests,
            tripType,
            travelStyle,
            accommodation,
            transportMode,
            additionalDetails
        },

        itinerary: null,
        aiStatus: "pending"
    };
};


module.exports = {
    buildTripData
};