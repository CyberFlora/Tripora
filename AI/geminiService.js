const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
    path: path.join(__dirname, ".env")
});

let client = null;

const getClient = async () => {
    if (!client) {
        const { GoogleGenAI } = await import("@google/genai");

        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not set.");
        }

        client = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });
    }

    return client;
};

const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

const MODELS = [
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.7-flash",
    "gemini-3.8-flash"
];

const generateGeminiJSON = async (prompt) => {
    const ai = await getClient();

    let lastError;

    for (const model of MODELS) {
        for (let attempt = 1; attempt <= 2; attempt++) {
            try {
                console.log(`Trying Gemini model: ${model} (attempt ${attempt})`);

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

                try {
                    return JSON.parse(response.text);
                } catch {
                    throw new Error("Gemini returned invalid JSON.");
                }

            } catch (error) {
                lastError = error;

                const message = error?.message || "";

                const isTemporary =
                    message.includes("503") ||
                    message.includes("UNAVAILABLE") ||
                    message.includes("high demand") ||
                    message.includes("overloaded");

                if (!isTemporary) {
                    throw error;
                }

                if (attempt === 1) {
                    await sleep(1500);
                }
            }
        }
    }

    throw lastError || new Error("All Gemini models failed.");
};

module.exports = {
    generateGeminiJSON
};