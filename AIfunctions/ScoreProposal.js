import GeminiFlash from "./AIModels/GeminiFlashModel.js";

async function ScoreProposal(project,proposal,freelancer){

    const prompt = `
    You are a project matching expert. Analyze the compatibility between this project and freelancer.
    Return ONLY numerical scores (0-100) with brief explanations in this exact format:
    
    Project Details:
    ${JSON.stringify(project, null, 2)}

    Proposal Details:
    ${JSON.stringify(proposal,null,2)}
    
    Freelancer Details:
    ${JSON.stringify(freelancer, null, 2)}
    
    Score these aspects with the following weights:
    - Skills Match (40%): Compare project.tags with freelancer.skills
    - Experience Level (30%): Compare project.experienceLevel with freelancer.expertise
    - Answering Capabilites (25%): Compare proposal.answers with project.questions
    - Pricing (5%) : Compare the proposal.price with project.price

    
    Format your response exactly like this(Dont give indiviual scores on the weights.Just give final score):
    FINAL_TOTAL_SCORE: [number]
    *
    REASON_EXPLANATION: [3 line explanation]
    
    
    Do not include any other text or explanations.`;


  const res = await GeminiFlash.invoke(prompt);
  const content = res.content;
  const [finalScoreLine, ...reasonExplanationLines] = content.split("\n").filter(line => line.trim() !== "");
  const finalScore = finalScoreLine.replace("FINAL_TOTAL_SCORE: ", "").trim();
  const reasonExplanation = reasonExplanationLines.join(" ").replace("REASON_EXPLANATION: ", "").replace(/^\*\s*/, '').trim();

  return {
    final_score: finalScore,
    reason_explanation: reasonExplanation,
  };

}
const project = {
    description: "A website for my cat's birthday.",
    tags: ["HTML", "CSS", "JavaScript"],
    questions: ["Do you have experience with pet-related websites?", "Can you provide a portfolio?"],
    experienceLevel: "Intermediate",
    price: 500
  };
  
  const proposal = {
    price: 450,
    description: "I can create a beautiful website for your cat's birthday.",
    answers: ["Yes, I have created a pet-related website before.", "Here is my portfolio: [link]"]
  };
  
  const freelancer = {
    skills: ["HTML", "CSS", "JavaScript", "React"],
    aboutMe: "I am a web developer with 5 years of experience.",
    expertise: "Web Development",
    rating: 4.8
  };

  const answer  = await ScoreProposal(project,proposal,freelancer);
  console.log(answer);