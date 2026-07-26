import { uploadResume  } from "../services/resumeService.js";

export const uploadUserResume = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume file is required"
            })
        }

        const resume = await uploadResume(req.id, req.file)

        return res.status(201).json({
            success: true,
            message: "Resume uploaded successfully",
            data: resume
        })
    } catch (error) {
        console.error("FULL ERROR =>", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}