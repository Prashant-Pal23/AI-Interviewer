import express from "express";

import  protect  from "../middlewares/authMiddleware.js";

import { analyzeATS } from "../controllers/atsController.js";

const router = express.Router();

router.post( "/analyze", protect, analyzeATS);

export default router;