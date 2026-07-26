import { analyzeResume } from "../services/atsService.js";

export const analyzeATS = async (req, res) => {
    try {
        const { jobDescription } = req.body;

        const result = await analyzeResume( req.id, jobDescription);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}