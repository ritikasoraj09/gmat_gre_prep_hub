import { Router } from "express";
import { listQuestions, getQuestionById } from "../controllers/questionController.js";

const router = Router();

router.get("/", listQuestions);
router.get("/:id", getQuestionById);

export default router;
