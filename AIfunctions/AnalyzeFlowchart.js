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
        `You are an expert in flowchart analysis and software architecture. Analyze the flowchart provided in the image and evaluate whether it is the right approach for the given project.
    
        **Project Details:**  
        ${JSON.stringify(selectedProject, null, 2)}
    
        Provide the output in structured **Markdown format** with the following sections:
    
        ### ✅ Strengths of the Flowchart  
        - List the **good aspects** of the flowchart.  
        - Mention well-structured logic, efficiency, or clarity.  
    
        ### ❌ Weaknesses of the Flowchart  
        - List the **flaws or missing components** in the flowchart.  
        - Highlight inefficiencies, missing steps, or unclear logic.  
    
        ### 📌 Suggested Improvements  
        - Provide **actionable suggestions** to enhance the flowchart.  
        - Recommend better structuring, missing elements, or alternative approaches.  
    
        ### 🏁 Final Verdict  
        - Give a **concise opinion** on whether the flowchart is appropriate for this project.  
        
    
        Keep the response precise, professional, and useful for decision-making.`
    ]);
    
    return result.response.text();
}
// const ans = await AnalyseFlowchart("https://res.cloudinary.com/dktw0yum9/image/upload/v1740495593/mr7bssoiwlvd0cm1p5vi.jpg");
// console.log(ans);


