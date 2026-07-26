import Resume from "../models/Resume.js";


export const createResume = async (resumeData) => {
    return await Resume.create(resumeData)
}

export const findResumeById = async (resumeId) => {
    return await Resume.findById(resumeId);
};

export const findResumeByUserId = async(userId) => {
    return await Resume.findOne({ user: userId })
}

export const updateResumeById = async (resumeId, updateData) => {
    return await Resume.findByIdAndUpdate( resumeId, updateData, { new: true })
}

export const updateATSAnalysis = async (resumeId, atsAnalysis) => {
    return await Resume.findByIdAndUpdate( resumeId, { atsAnalysis }, { returnDocument: "after" })
}