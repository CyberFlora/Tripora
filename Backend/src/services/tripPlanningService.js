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


const formatDate = (startDate, dayOffset) => {
    const date = new Date(`${startDate}T00:00:00`);
    date.setDate(date.getDate() + dayOffset);

    return date.toISOString().split("T")[0];
};


const buildItinerary = ({
    startDate,
    destinationCity,
    numberOfDays,
    interests,
    travelStyle,
    accommodation,
    transportMode
}) => {
    const interestList = Array.isArray(interests)
        ? interests
        : [];

    const primaryInterest =
        interestList[0] || "local attractions";

    const secondaryInterest =
        interestList[1] || "local food";

    const isGoa =
        destinationCity.toLowerCase().includes("goa");

    const itinerary = [];

    for (let index = 0; index < numberOfDays; index += 1) {
        const dayNumber = index + 1;

        let title = `Explore ${destinationCity}`;

        let activities = [
            {
                id: `day-${dayNumber}-1`,
                time: "09:00",
                title: `Morning ${primaryInterest} experience`,
                description:
                    `Start the day exploring popular ${primaryInterest.toLowerCase()} experiences in ${destinationCity}.`,
                location: destinationCity,
                category: primaryInterest,
                estimatedCost: 500
            },
            {
                id: `day-${dayNumber}-2`,
                time: "13:00",
                title: `Lunch & ${secondaryInterest}`,
                description:
                    `Enjoy a local lunch followed by a ${secondaryInterest.toLowerCase()} experience.`,
                location: destinationCity,
                category: secondaryInterest,
                estimatedCost: 800
            },
            {
                id: `day-${dayNumber}-3`,
                time: "17:00",
                title: "Evening leisure",
                description:
                    `Keep the evening flexible for shopping, cafés, photography or relaxed exploration.`,
                location: destinationCity,
                category: "Leisure",
                estimatedCost: 500
            }
        ];

        if (isGoa) {
            if (dayNumber === 1) {
                title = "Panjim & Old Goa";

                activities = [
                    {
                        id: `day-${dayNumber}-1`,
                        time: "09:00",
                        title: "Explore Panjim",
                        description:
                            "Start with a relaxed city walk through Panjim and nearby heritage streets.",
                        location: "Panjim",
                        category: "Culture",
                        estimatedCost: 300
                    },
                    {
                        id: `day-${dayNumber}-2`,
                        time: "13:00",
                        title: "Goan lunch experience",
                        description:
                            "Enjoy a local Goan lunch and explore nearby cafés.",
                        location: "Panjim",
                        category: "Food",
                        estimatedCost: 800
                    },
                    {
                        id: `day-${dayNumber}-3`,
                        time: "17:00",
                        title: "Fontainhas & sunset",
                        description:
                            "Walk through Fontainhas and finish the day with a relaxed sunset outing.",
                        location: "Fontainhas",
                        category: "Culture",
                        estimatedCost: 300
                    }
                ];
            } else if (dayNumber === 2) {
                title = "North Goa Beaches & Adventure";

                activities = [
                    {
                        id: `day-${dayNumber}-1`,
                        time: "09:00",
                        title: "North Goa beach morning",
                        description:
                            "Spend the morning exploring a North Goa beach and nearby coastal spots.",
                        location: "North Goa",
                        category: "Beaches",
                        estimatedCost: 300
                    },
                    {
                        id: `day-${dayNumber}-2`,
                        time: "14:00",
                        title: "Adventure activity",
                        description:
                            "Plan a water or outdoor adventure activity depending on availability and weather.",
                        location: "North Goa",
                        category: "Adventure",
                        estimatedCost: 1500
                    },
                    {
                        id: `day-${dayNumber}-3`,
                        time: "18:00",
                        title: "Beach sunset & dinner",
                        description:
                            "Relax by the coast and finish with a local dinner.",
                        location: "North Goa",
                        category: "Food",
                        estimatedCost: 1000
                    }
                ];
            } else if (dayNumber === 3) {
                title = "South Goa & Relaxation";

                activities = [
                    {
                        id: `day-${dayNumber}-1`,
                        time: "09:00",
                        title: "South Goa beaches",
                        description:
                            "Explore a quieter beach area and enjoy a slower morning.",
                        location: "South Goa",
                        category: "Beaches",
                        estimatedCost: 300
                    },
                    {
                        id: `day-${dayNumber}-2`,
                        time: "13:00",
                        title: "Lunch & local exploration",
                        description:
                            "Enjoy lunch and explore nearby local attractions.",
                        location: "South Goa",
                        category: "Food",
                        estimatedCost: 900
                    },
                    {
                        id: `day-${dayNumber}-3`,
                        time: "17:30",
                        title: "Relaxed evening",
                        description:
                            "Keep the final evening flexible for shopping, cafés or a sunset walk.",
                        location: "South Goa",
                        category: "Leisure",
                        estimatedCost: 500
                    }
                ];
            }
        }

        itinerary.push({
            day: dayNumber,
            date: formatDate(startDate, index),
            title,
            activities
        });
    }

    return itinerary;
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

    // 5. Build structured itinerary
    const itinerary = buildItinerary({
        startDate,
        destinationCity,
        numberOfDays,
        interests,
        travelStyle,
        accommodation,
        transportMode
    });

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

        itinerary,

        aiStatus: "ready"
    };
};


module.exports = {
    buildTripData
};