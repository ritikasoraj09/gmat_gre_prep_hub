import OpenAI from "openai";
import dotenv from "dotenv";
import { pool } from "../models/db.js";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are a patient, expert GRE and GMAT tutor. When a student asks a
question or shares a doubt:
- Break the solution into clear, numbered steps.
- Name the underlying concept, formula, or reasoning technique being used.
- Keep the explanation concise and exam-focused — avoid unnecessary tangents.
- If the student's question is ambiguous, make a reasonable assumption and state it.`;

export async function askChatbot(req, res, next) {
  try {
    const { question, context } = req.body;

    if (!question) {
      return res.status(400).json({ error: "'question' is required" });
    }

    const userContent = context
      ? `Question the student is looking at:\n${context}\n\nStudent's doubt:\n${question}`
      : question;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userContent },
      ],
      temperature: 0.4,
    });

    const answer = completion.choices[0]?.message?.content?.trim() || "";

    // Best-effort logging; don't fail the request if this errors.
    pool
      .query(
        `INSERT INTO chatbot_logs (user_id, question, context, answer) VALUES ($1, $2, $3, $4)`,
        [req.body.userId || null, question, context || null, answer]
      )
      .catch(() => {});

    res.json({ answer });
  } catch (err) {
    next(err);
  }
}
