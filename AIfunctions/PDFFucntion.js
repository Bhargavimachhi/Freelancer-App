
import GeminiFlash from './AIModels/GeminiFlashModel.js';

// const projectobject = {
//     description: "Develop a responsive e-commerce website for a fashion brand.",
//     tags: ["React", "Node.js", "MongoDB", "CSS", "HTML"],
//     questions: [
//       "Do you have experience in developing e-commerce websites?",
//       "What is your approach to ensuring the website is responsive?",
//       "How do you handle user authentication and security?",
//     ],
//     experienceLevel: "Intermediate",
//     price: 1500,
//   };
import { getDocument } from "pdfjs-dist";

export async function extractTextFromPdf(pdfUrl) {
    try {
        const loadingTask = getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        let extractedText = "";
        for (let i = 0; i < pdf.numPages; i++) {
            const page = await pdf.getPage(i + 1);
            const textContent = await page.getTextContent();
            extractedText += textContent.items.map((item) => item.str).join(" ") + "\n\n";
        }

        return extractedText;
    } catch (error) {
        console.error("Error extracting text from PDF:", error);
        return "Error extracting text.";
    }
}






export async function GiveAnalysisofSRS(project,url) {
    const extractedtext = await extractTextFromPdf(url);
    console.log(extractedtext);
    const prompt = `
Analyze the following project description and extracted SRS document. Provide a structured markdown report with the following sections:

## 📌 Feasibility & Complexity
- Assess whether the SRS aligns with the project goals.
- Mention the **feasibility level** (High, Medium, Low) and **complexity level** (Simple, Moderate, Complex).
- Highlight any unclear technical aspects.

## ❌ Key Missing Areas
- List 2-3 **critical missing elements** from the SRS.
- Focus on gaps that could impact development, security, or functionality.

## ⚠️ Potential Risks & Challenges
- Identify potential **risks or challenges** in the project.
- Highlight any **dependencies** or bottlenecks that may cause delays.

---

### **🔍 Input Data**
**Project Details:**  
\`\`\`json
${JSON.stringify(project, null, 2)}
\`\`\`

**Extracted SRS Document:**  
\`\`\`
${extractedtext}
\`\`\`

---
**Output in structured markdown format. Keep it concise and easy to read.**
`;
  
    const res = await GeminiFlash.invoke(prompt);
    const content = res.content;
    return content;
  
   
  }



