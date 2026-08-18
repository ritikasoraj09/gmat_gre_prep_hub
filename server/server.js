import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import questionsRouter from "./routes/questions.js";
import scoresRouter from "./routes/scores.js";
import chatbotRouter from "./routes/chatbot.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/questions", questionsRouter);
app.use("/api/scores", scoresRouter);
app.use("/api/chatbot", chatbotRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`GRE & GMAT Prep Hub API running on http://localhost:${PORT}`);
});
