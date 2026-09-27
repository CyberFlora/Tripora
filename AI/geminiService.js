import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from AI/.env");
}

const ai = new GoogleGenAI({
    apiKey
});


const generateGeminiJSON = async (prompt) => {
    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });

        if (!response.text) {
            throw new Error("Gemini returned an empty response.");
        }

        return JSON.parse(response.text);

    } catch (error) {
        console.error("Gemini error:", error.message);
        throw error;
    }
};


export {
    generateGeminiJSON
};