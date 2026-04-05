import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import Groq from "groq-sdk";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080 ;

app.use(express.json());
app.use(cors());
app.use("/api",chatRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected with database");
  }catch(err){
    console.log("failed to connect with database",err);
  }
};

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
  connectDB();
});
// app.post("/test", async (req, res) => {
//   try {
//     const userMessage = req.body.message || "Hello";

//     const response = await groq.chat.completions.create({
//       messages: [
//         { role: "user", content: userMessage }
//       ],
//       model: "llama-3.1-8b-instant", // ✅ working model
//     });

//     const reply = response.choices[0].message.content;

//     res.json({
//       reply: reply
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

// import dotenv from "dotenv";

// dotenv.config();


// async function run() {
//   try {
//     const chatCompletion = await groq.chat.completions.create({
//       messages: [
//         { role: "user", content: "Explain JavaScript closures" }
//       ],
//       model: "llama-3.1-8b-instant",
//     });

//     console.log(chatCompletion.choices[0].message.content);
//   } catch (error) {
//     console.error("ERROR:", error);
//   }
// }

// run();