import { pool } from "../models/db.js";

export async function listQuestions(req, res, next) {
  try {
    const { section, difficulty } = req.query;

    const conditions = [];
    const values = [];

    if (section) {
      values.push(`%${section}%`);
      conditions.push(`section ILIKE $${values.length}`);
    }
    if (difficulty) {
      values.push(difficulty);
      conditions.push(`difficulty = $${values.length}`);
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const { rows } = await pool.query(
      `SELECT id, exam, section, subtype, difficulty, prompt, options,
              correct_options AS "correctOptions", explanation
       FROM questions
       ${where}
       ORDER BY id
       LIMIT 50`,
      values
    );

    res.json(rows);
  } catch (err) {
    next(err);
  }
}

export async function getQuestionById(req, res, next) {
  try {
    const { rows } = await pool.query(
      `SELECT id, exam, section, subtype, difficulty, prompt, options,
              correct_options AS "correctOptions", explanation
       FROM questions WHERE id = $1`,
      [req.params.id]
    );

    if (!rows.length) return res.status(404).json({ error: "Question not found" });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}
