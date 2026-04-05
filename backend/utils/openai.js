import Groq from "groq-sdk";
import "dotenv/config";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const getOpenAIAPIResponse = async (message) => {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: "user", content: message } // ✅ use passed argument
      ],
      model: "llama-3.1-8b-instant",
    });

    const reply = response.choices[0].message.content;

    return reply; // ✅ return data instead of res.json

  } catch (err) {
    console.error(err);
    throw err; // ✅ throw error to handle in route
  }
};

export default getOpenAIAPIResponse;