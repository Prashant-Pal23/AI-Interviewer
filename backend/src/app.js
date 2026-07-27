import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import atsRoutes from "./routes/atsRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRoutes)
app.use("/api/ats", atsRoutes);
app.use("/api/interviews", interviewRoutes);




app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI Interview Api running"
    })
})


export default app;