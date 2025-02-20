import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";


const llm = new ChatGoogleGenerativeAI({
    model: "gemini-1.0-pro",
    temperature: 0,
    maxRetries: 2,
    apiKey: "AIzaSyDMqL2RR58KE9NFl3EnpAnc7tE4Ahv-z08",
});

  
const promptTemplate = PromptTemplate.fromTemplate(
    "You are an AI analyzer. I have given you array of questions and array of answers. Array of questions is : {questions} and array of answers is : {answers}. answer of question[x] is answer[x]. you have to analyze all the questions and answers and give score to each answer out of 100 on the basis of correctness, grammer, logic, relativity to question, and facts. and return final average of it. do not include anything else except final average."
);

export async function Chatbotfunction(questions, answers) {
    if(questions.length != answers.length) {
        return null;
    }
    const message = await promptTemplate.invoke({ questions, answers });
    const response = await llm.invoke(message.value);

    const ans = response.content;

    return ans;
}
