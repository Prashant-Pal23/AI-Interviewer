import express from "express";
import { createInterview, getInterviewById, getInterviewHistory, submitAnswer, completeInterview,} from "../controllers/interviewController.js";

import  protect  from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createInterview);

router.get("/", getInterviewHistory);

router.get("/:id", getInterviewById);

router.post("/:id/questions/:order", submitAnswer);

router.post("/:id/complete", completeInterview);

export default router;