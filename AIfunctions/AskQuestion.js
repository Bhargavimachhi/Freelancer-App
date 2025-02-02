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
        model: "llama-3.3-70b-versatile",
      });

      return chatcompletion.choices[0].message.content;

};

