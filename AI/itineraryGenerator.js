import {
    createItineraryPrompt
} from "./itineraryPrompt.js";

import {
    generateGeminiJSON
} from "./geminiService.js";


const generateItinerary = async (trip) => {

    const prompt = createItineraryPrompt(trip);

    const itinerary = await generateGeminiJSON(prompt);

    return itinerary;
};


export {
    generateItinerary
};