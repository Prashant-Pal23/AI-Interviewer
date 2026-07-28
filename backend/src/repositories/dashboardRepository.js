import Resume from "../models/Resume.js";
import Interview from "../models/Interview.js";

export const getResumeByUser = async (userId) => {
    return await Resume.findOne({ user: userId });
};

export const getInterviewsByUser = async (userId) => {
    return await Interview.find({ user: userId })
        .sort({ createdAt: -1 });
};