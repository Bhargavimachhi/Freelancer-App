import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";


const llm = new ChatGoogleGenerativeAI({
    model: "gemini-1.0-pro",
    temperature: 0,
    maxRetries: 2,
    apiKey: "AIzaSyDMqL2RR58KE9NFl3EnpAnc7tE4Ahv-z08",
});

  
const promptTemplate = PromptTemplate.fromTemplate(
    "You are an AI analyzer. I will provide you with one question and its answer. You have to analyze them and give me a score out of 100 based on the correctness of the answer. Do not return anything else except the score."
);

export async function Chatbotfunction(questions, answers) {
    if(questions.length != answers.length) {
        return null;
    }
    const message = await promptTemplate.invoke({ que: que });
    const response = await llm.invoke(message.value);

    const ans = response.content;

    return ans;
}