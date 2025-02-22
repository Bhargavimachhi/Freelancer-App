import {ChatGoogleGenerativeAI} from "@langchain/google-genai";

const GeminiFlash = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0,
    maxRetries: 2,
    apiKey: "AIzaSyAmaJR8POB7lifz54zEhk4XiGIVsUtcMtg",
});

export default GeminiFlash;




