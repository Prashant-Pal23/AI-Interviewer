import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { changeUserPassword, getUserProfile, updateUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);

router.put("/profile/update", protect, updateUserProfile)

router.put("/change/password", protect, changeUserPassword)

export default router;