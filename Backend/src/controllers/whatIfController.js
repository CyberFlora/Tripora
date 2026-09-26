const {
    adaptBudget
} = require("../services/whatIfService");


const adaptTrip = async (req, res, next) => {

    try {

        const {
            currentTrip,
            changeType,
            newValue
        } = req.body;


        if (!currentTrip) {
            return res.status(400).json({
                success: false,
                message: "Current trip data is required."
            });
        }


        if (!changeType) {
            return res.status(400).json({
                success: false,
                message: "Change type is required."
            });
        }


        if (changeType !== "budget") {
            return res.status(400).json({
                success: false,
                message: "Currently only budget changes are supported."
            });
        }


        const adaptedJourney = adaptBudget({
            currentTrip,
            newBudget: newValue
        });


        res.status(200).json({
            success: true,

            whatIf: {
                changeType,
                originalValue: Number(currentTrip.budget),
                newValue: Number(newValue)
            },

            adaptedJourney
        });

    } catch (error) {

        next(error);

    }
};


module.exports = {
    adaptTrip
};