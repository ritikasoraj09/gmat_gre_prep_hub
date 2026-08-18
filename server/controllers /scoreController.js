import { pool } from "../models/db.js";

export async function saveScore(req, res, next) {
  try {
    const { userId, section, score, totalQuestions, timeTakenSec } = req.body;

    if (!userId || !section || score == null || !totalQuestions || !timeTakenSec) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { rows } = await pool.query(
      `INSERT INTO attempts (user_id, section, score, total_questions, time_taken_sec)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, created_at`,
      [userId, section, score, totalQuestions, timeTakenSec]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function getScoreHistory(req, res, next) {
  try {
    const { userId } = req.params;

    const historyResult = await pool.query(
      `SELECT TO_CHAR(created_at, 'Mon DD') AS date, score
       FROM attempts
       WHERE user_id = $1
       ORDER BY created_at ASC
       LIMIT 30`,
      [userId]
    );

    const breakdownResult = await pool.query(
      `SELECT section, ROUND(AVG(score)) AS "avgScore"
       FROM attempts
       WHERE user_id = $1
       GROUP BY section`,
      [userId]
    );

    res.json({ history: historyResult.rows, breakdown: breakdownResult.rows });
  } catch (err) {
    next(err);
  }
}
