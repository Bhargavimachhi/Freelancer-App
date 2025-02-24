import GeminiFlash from "./AIModels/GeminiFlashModel.js";

export async function GiveGoodpoints(project, proposal, freelancer) {
  const prompt = `
    Analyze the following project, proposal, and freelancer details, and provide three good points about the proposal as a output.Also make a * at start of each point.:
    
    Project: ${JSON.stringify(project, null, 2)}
    Proposal: ${JSON.stringify(proposal, null, 2)}
    Freelancer: ${JSON.stringify(freelancer, null, 2)}
  `;

  const res = await GeminiFlash.invoke(prompt);
  const content = res.content;

  const goodPoints = content
    .split("\n")
    .filter((point) => point.trim().startsWith("*"))
    .map((point) => point.replace(/^\*\s*/, "").trim())
    .slice(0, 3);

  return goodPoints;
}
export async function GiveBadpoints(project, proposal, freelancer) {
  const prompt = `
    Analyze the following project, proposal, and freelancer details, and provide three bad points about the proposal as a output.Also make a * at start of each point.:
    
    Project: ${JSON.stringify(project, null, 2)}
    Proposal: ${JSON.stringify(proposal, null, 2)}
    Freelancer: ${JSON.stringify(freelancer, null, 2)}
  `;

  const res = await GeminiFlash.invoke(prompt);
  const content = res.content;

  const badPoints = content
    .split("\n")
    .filter((point) => point.trim().startsWith("*"))
    .map((point) => point.replace(/^\*\s*/, "").trim())
    .slice(0, 3);

  return badPoints;
}
