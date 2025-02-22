import GeminiFlash from "./AIModels/GeminiFlashModel.js";

async function GiveGoodpoints(project,proposal,freelancer){
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
  .filter(point => point.trim().startsWith("*"))
  .map(point => point.replace(/^\*\s*/, '').trim())
  .slice(0, 3);

return goodPoints;


}
async function GiveBadpoints(project,proposal,freelancer){
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
  .filter(point => point.trim().startsWith("*"))
  .map(point => point.replace(/^\*\s*/, '').trim())
  .slice(0, 3);

return badPoints;


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

  const ans = await GiveBadpoints(project,proposal,freelancer);
  console.log(ans);