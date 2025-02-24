import Groq from "groq-sdk";
const groq = new Groq({ apiKey: "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" , dangerouslyAllowBrowser: true });




export default async function AskBadpoints(project,proposal,freelancer){

  const prompt = `
  Analyze the following project, proposal, and freelancer details, and provide three bad points about the proposal as a output.Also make a * at start of each point.:
  
  Project: ${JSON.stringify(project, null, 2)}
  Proposal: ${JSON.stringify(proposal, null, 2)}
  Freelancer: ${JSON.stringify(freelancer, null, 2)}
`;

    const chatcompletion =  await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "deepseek-r1-distill-llama-70b",
      });
      const content = chatcompletion.choices[0].message.content;

      const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/);
      const thinkContent = thinkMatch ? thinkMatch[1].trim() : "";
      console.log(thinkContent);

      

      const cleanedContent = content.replace(/<think>[\s\S]*?<\/think>/, '').trim();
      const badPoints = cleanedContent
      .split("\n")
      .filter((point) => point.trim().startsWith("*"))
      .map((point) => point.replace(/^\*\s*/, "").trim())
      .slice(0, 3);
      return {
        thinkContent:thinkContent,
        badPoints:badPoints
      };

};
export  async function Askgoodpoints(project,proposal,freelancer){

  const prompt = `
  Analyze the following project, proposal, and freelancer details, and provide three good points about the proposal as a output.Also make a * at start of each point.:
  
  Project: ${JSON.stringify(project, null, 2)}
  Proposal: ${JSON.stringify(proposal, null, 2)}
  Freelancer: ${JSON.stringify(freelancer, null, 2)}
`;

    const chatcompletion =  await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "deepseek-r1-distill-llama-70b",
      });
      const content = chatcompletion.choices[0].message.content;

      const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/);
      const thinkContent = thinkMatch ? thinkMatch[1].trim() : "";
      console.log(thinkContent);

      

      const cleanedContent = content.replace(/<think>[\s\S]*?<\/think>/, '').trim();
      const goodPoints = cleanedContent
      .split("\n")
      .filter((point) => point.trim().startsWith("*"))
      .map((point) => point.replace(/^\*\s*/, "").trim())
      .slice(0, 3);
      return {
        thinkContent:thinkContent,
        goodPoints:goodPoints
      };

};



