import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";

if (!apiKey) {
    console.error("ERROR: GEMINI_API_KEY is missing.");
    process.exit(1);
}

const ai = new GoogleGenAI({
    apiKey: apiKey
});

async function testGemini() {
    try {
        console.log(`Testing model: ${model}`);

        const response = await ai.models.generateContent({
            model: model,
            contents: "Give me one short travel tip for Goa."
        });

        console.log("\nGemini response:");
        console.log(response.text);

    } catch (error) {
        console.error("\nGemini request failed:");
        console.error(error.message);
    }
}

testGemini();