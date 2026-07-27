import Interview from "../models/Interview.js";

export const createInterview = async (interviewData) => {
    return await Interview.create(interviewData);
};

export const findInterviewById = async (interviewId) => {
    return await Interview.findById(interviewId)
        .populate("user", "name email")
        .populate("resume");
};

export const findInterviewsByUser = async (userId) => {
    return await Interview.find({ user: userId }).sort({ createdAt: -1 });
};

export const updateInterview = async (interviewId, updateData) => {
    return await Interview.findByIdAndUpdate( interviewId, updateData, { new: true });
};

export const updateQuestion = async ( interviewId, order, questionData) => {
    return await Interview.findOneAndUpdate({
            _id: interviewId,
            "questions.order": order,
        },
        {
            $set: {
                "questions.$.answer": questionData.answer,
                "questions.$.aiExpectedAnswer": questionData.aiExpectedAnswer,
                "questions.$.score": questionData.score,
                "questions.$.feedback": questionData.feedback,
                "questions.$.answerDuration": questionData.answerDuration,
            },
            $inc: {
                completedQuestions: 1,
            },
        },{ new: true,}
    );
};


export const deleteInterview = async (interviewId) => {
    return await Interview.findByIdAndDelete(interviewId);
};