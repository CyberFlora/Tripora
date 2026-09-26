const {
    buildTripData
} = require("../services/tripPlanningService");


const planTrip = async (req, res, next) => {

    try {

        const {
            destinationCity,
            startingAddress,

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
        } = req.body;


        // Required fields

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

        if (!startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: "Start date and end date are required."
            });
        }

        if (!numberOfPeople || numberOfPeople < 1) {
            return res.status(400).json({
                success: false,
                message: "Number of people must be at least 1."
            });
        }

        if (budget === undefined || budget === null || budget === "") {
            return res.status(400).json({
                success: false,
                message: "Budget is required."
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


        const tripData = await buildTripData({

            startingAddress,
            destinationCity,

            startDate,
            endDate,

            numberOfPeople,
            budget,

            interests,

            tripType: tripType || "friends",

            travelStyle:
                travelStyle || "balanced",

            accommodation:
                accommodation || "flexible",

            transportMode:
                transportMode || "mixed",

            additionalDetails:
                additionalDetails || ""
        });


        res.status(200).json({

            success: true,

            message: "Trip data calculated successfully.",

            tripInput: {
                destinationCity,
                startingAddress,

                startDate,
                endDate,

                numberOfPeople,
                budget,

                interests,

                tripType:
                    tripType || "friends",

                travelStyle:
                    travelStyle || "balanced",

                accommodation:
                    accommodation || "flexible",

                transportMode:
                    transportMode || "mixed",

                additionalDetails:
                    additionalDetails || ""
            },

            ...tripData
        });


    } catch (error) {

        next(error);

    }
};


module.exports = {
    planTrip
};