import { Router } from "express";
import { saveScore, getScoreHistory } from "../controllers/scoreController.js";

const router = Router();

router.post("/", saveScore);
router.get("/:userId", getScoreHistory);

export default router;
