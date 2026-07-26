import { findResumeByUserId, updateATSAnalysis } from "../repositories/resumeRepository.js";

import { analyzeResumeATS } from "./geminiService.js";

export const analyzeResume = async ( userId, jobDescription ) => {

    const resume = await findResumeByUserId(userId);

    if (!resume) {
        throw new Error("Resume not found");
    }

    if (!resume.extractedText?.trim()) {
        throw new Error("Resume text not found");
    }

    const analysis = await analyzeResumeATS(resume.extractedText, jobDescription);

    await updateATSAnalysis(resume._id, analysis);

    return analysis;
};