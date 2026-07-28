import { getUserResume, uploadResume  } from "../services/resumeService.js";

import { analyzeResume as analyzeResumeService} from "../services/atsService.js"

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


export const getResume = async (req, res) => {
    try {
        const resume = await getUserResume(req.id)

        if(!resume ) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            })
        }

        return res.status(200).json({
            success: true,
            data: resume
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const analyzeResume = async (req, res) => {
    try {
        const { jobDescription } = req.body;

        if (!jobDescription?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Job description is required"
            });

        }

        const result = await analyzeResumeService(
            req.id,
            jobDescription
        );

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}