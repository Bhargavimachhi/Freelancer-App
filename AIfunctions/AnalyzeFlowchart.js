import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI("AIzaSyAAQxUp-obO4_DuG9-D1W7U33NrKzz-oMw");
const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });
const selectedProject = {
    description: "A website for my cat.",
    tags: ["REACT", "NODEJS", "MONGODB"],
    questions: ["Have you any experience in making a cat website?", "What is your approach?"],
    experienceLevel: "Beginner",
    price: 100
};




async function fetchImageToGenerativePart(url, mimeType) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    // const base64String = Buffer.from(arrayBuffer).toString("base64");
    const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    return {
        inlineData: {
            data: base64String,
            mimeType
        },
    };
}

export async function AnalyseFlowchart(link){
    const remoteImageData = await fetchImageToGenerativePart(
       link,
        "image/jpg"
    );
    
    
    const result = await model.generateContent([
        remoteImageData,
        `You are a flowchart expert. Based on the flowchart submitted in the image. Analyse if the flowchart is the right approach to solve this project or not.
        Project Details:
        ${JSON.stringify(selectedProject, null, 2)}.
        Give output in three points:
       The good point about the flowchart.
        The bad point about the flowchart.
        And final opinion based on the flowchart.
        `,
    ]);
    return result.response.text();
}
// const ans = await AnalyseFlowchart("https://res.cloudinary.com/dktw0yum9/image/upload/v1740495593/mr7bssoiwlvd0cm1p5vi.jpg");
// console.log(ans);


