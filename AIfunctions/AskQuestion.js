import Groq from "groq-sdk";
const groq = new Groq({ apiKey: "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" });




export default async function AskQuestion({question}){

    const chatcompletion =  await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: question,
          },
        ],
        model: "deepseek-r1-distill-llama-70b",
      });
      const content = chatcompletion.choices[0].message.content;

      const cleanedContent = content.replace(/<think>[\s\S]*?<\/think>/, '').trim();
      return cleanedContent;

};

const ans = await AskQuestion({question:"I want to create a website for my cat on his upcoming birthday.Their is a freelancer I hired who has made one cat app before.I want a website but this guy is only experirecd in making mobile apps.Should I hire him?. Tell me in one sentence your verdict."});
console.log(ans);



