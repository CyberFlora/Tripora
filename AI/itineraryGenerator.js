const {
    createItineraryPrompt
} = require("./itineraryPrompt");

const {
    generateGeminiJSON
} = require("./geminiService");


const generateItinerary = async (trip) => {

    const prompt = createItineraryPrompt(trip);

    const itinerary = await generateGeminiJSON(prompt);

    return itinerary;
};


module.exports = {
    generateItinerary
};