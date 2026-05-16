import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const fitments = JSON.parse(
  fs.readFileSync("../data/fitments.json", "utf-8")
);

app.post("/recommend", async (req, res) => {
  try {
    const { prompt } = req.body;

const promptLower = prompt.toLowerCase();

const matchingFitments = fitments.filter((f) => {
  const carMatch = promptLower.includes("wrx") && f.car.includes("WRX");

  const aggressiveMatch =
    promptLower.includes("aggressive") &&
    f.style === "aggressive";

  const dailyMatch =
    promptLower.includes("daily") &&
    f.style === "daily";

  return carMatch || aggressiveMatch || dailyMatch;
});

let retrievedContext = "";

if (matchingFitments.length === 0) {
  retrievedContext = "No exact matches found. Use general WRX fitment knowledge.";
} else {
  retrievedContext = matchingFitments
    .map(
      (f) => `
Car: ${f.car}
Style: ${f.style}
Wheel: ${f.wheel}
Tire: ${f.tire}
Camber: ${f.camber}
Warnings: ${f.warnings.join(", ")}
`
    )
    .join("\n");
}

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
{
  role: "system",
content: `
You are a professional car fitment engineer.

Use retrieved examples to guide your answer.

${retrievedContext}

Respond in this format:

RECOMMENDATION:
- ...

TRADEOFFS:
- ...

WARNINGS:
- ...

SAFER SETUP:
- ...

RULES:
- Never ignore tire stretch risk
- Never ignore rubbing risk
- Never ignore debeading risk when wheel width > 9.5 and tire <= 215
`,
},
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    res.json({
      output: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});