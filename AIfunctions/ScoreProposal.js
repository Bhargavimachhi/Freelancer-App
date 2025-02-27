import GeminiFlash from "./AIModels/GeminiFlashModel.js";

export async function ScoreProposal(project,proposal,freelancer, skillMatch, experienceLevel, answeringCapability, pricing){

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
    - Skills Match (${skillMatch}): Compare project.tags with freelancer.skills
    - Experience Level (${experienceLevel}): Compare project.experienceLevel with freelancer.expertise
    - Answering Capabilites (${answeringCapability}): Compare proposal.answers with project.questions
    - Pricing (${pricing}) : Compare the proposal.price with project.price

    
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
