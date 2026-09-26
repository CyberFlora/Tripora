const {
    buildTripData
} = require("../services/tripPlanningService");

const {
    geocodeTripLocations
} = require("../services/geocodingService");

const {
    getRoute
} = require("../services/routingService");

const planTrip = async (req, res, next) => {
    try {
        const {
            destinationCity,
            startingAddress,
            startDate,
            endDate,
            budget,
            numberOfPeople,
            interests,
            tripType,
            additionalDetails
        } = req.body;

        // Required field validation
        if (!destinationCity) {
            return res.status(400).json({
                success: false,
                message: "Destination city is required."
            });
        }

        if (!startingAddress) {
            return res.status(400).json({
                success: false,
                message: "Starting address is required."
            });
        }

        if (!startDate) {
            return res.status(400).json({
                success: false,
                message: "Start date is required."
            });
        }

        if (!endDate) {
            return res.status(400).json({
                success: false,
                message: "End date is required."
            });
        }

        if (budget === undefined || budget === null || budget === "") {
            return res.status(400).json({
                success: false,
                message: "Budget is required."
            });
        }

        if (!numberOfPeople) {
            return res.status(400).json({
                success: false,
                message: "Number of people is required."
            });
        }

        if (!Array.isArray(interests) || interests.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please select at least one interest."
            });
        }

        if (interests.length > 3) {
            return res.status(400).json({
                success: false,
                message: "You can select a maximum of 3 interests."
            });
        }

        // 1. Convert addresses/city into coordinates
        const locations = await geocodeTripLocations(
            startingAddress,
            destinationCity
        );

        // 2. Find road route between the two locations
        const route = await getRoute(
            locations.startingLocation,
            locations.destinationLocation
        );

        // 3. Temporary response
        res.status(200).json({
            success: true,
            message: "Trip route calculated successfully.",

            tripInput: {
                destinationCity,
                startingAddress,
                startDate,
                endDate,
                budget,
                numberOfPeople,
                interests,
                tripType: tripType || "general",
                additionalDetails: additionalDetails || ""
            },

            locations,

            route
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { planTrip };