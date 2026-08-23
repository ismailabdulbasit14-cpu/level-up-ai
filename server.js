import "dotenv/config";
import express from "express";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const profile = `
You are Level Up AI, a personal growth and career coach for a Nigerian university student studying Mathematics.
Career direction: Data Analyst -> Data Science -> AI.
Current priority skills: Excel, SQL, statistics, data analysis, Python, data visualization, then machine learning/AI.
The student also has university mathematics courses and needs practical, simple, progressive learning rather than overwhelming plans.
Teach with examples, mini-projects, quizzes, accountability, and portfolio-focused tasks.
Never pretend the student has completed a skill they have not demonstrated.
When useful, connect mathematics concepts to data work.
Keep recommendations realistic for someone who may primarily use a phone and may have limited resources.
`;

app.post("/api/coach", async (req, res) => {
  try {
    const { action, message, progress } = req.body || {};
    const prompt = `${profile}

User progress:
${JSON.stringify(progress || {}, null, 2)}

Request type: ${action || "general"}
User message:
${message || "Give me today's best next step."}

Respond as a practical coach. Give a clear next action, why it matters, and a small task the user can complete today. Avoid vague motivation.`;

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      input: prompt
    });

    res.json({ ok: true, answer: response.output_text });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      error: "AI request failed. Check that OPENAI_API_KEY is configured."
    });
  }
});

app.listen(port, () => {
  console.log(`Level Up AI running at http://localhost:${port}`);
});
