import express from "express"
import multer from "multer"

import protect from "../middlewares/authMiddleware.js"
import { uploadUserResume } from "../controllers/resumeController.js"

const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if(file.mimetype !== "application/pdf") {
            return cb(new Error("only pdf files are allowed"))
        }
        cb(null, true)
    }
})

router.post("/upload", protect, upload.single("resume"), uploadUserResume)

export default router