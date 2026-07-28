import express from "express";
import multer from "multer"
import protect from "../middlewares/authMiddleware.js";
import { changeUserPassword, getUserProfile, updateUserProfile, uploadProfilePicture } from "../controllers/userController.js";

const router = express.Router();


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {

        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed"));
        }

        cb(null, true);
    },
})


router.get("/profile", protect, getUserProfile);

router.put("/profile/update", protect, updateUserProfile)

router.put("/change/password", protect, changeUserPassword)

router.put("/profile/picture", protect, upload.single("profilePic"), uploadProfilePicture );

export default router;