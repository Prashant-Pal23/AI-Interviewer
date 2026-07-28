import { createInterview, findInterviewById, findInterviewsByUser, updateInterview, updateQuestion, updateInterviewEvaluation} from "../repositories/interviewRepository.js";

import { findResumeById } from "../repositories/resumeRepository.js";

import { generateInterviewQuestions, evaluateEntireInterview} from "./geminiService.js";


const validateInterviewOwnership = (interview, userId) => {
    if (!interview) {
        throw new Error("Interview not found");
    }

    if (interview.user._id.toString() !== userId) {
        throw new Error("Unauthorized");
    }
};

export const createInterviewService = async ({ interviewData }) => {
    const resume = await findResumeById(interviewData.resume);

    if (!resume) {
        throw new Error("Resume not found");
    }

    if (!resume.extractedText) {
        throw new Error("Resume text not found");
    }

    const questions = await generateInterviewQuestions({
        jobRole: interviewData.jobRole,
        topic: interviewData.topic,
        difficulty: interviewData.difficulty,
        interviewType: interviewData.interviewType,
        totalQuestions: interviewData.totalQuestions,
        resumeText: resume.extractedText,
    });

    return await createInterview({
        ...interviewData,
        questions,
    })
}

export const getInterviewByIdService = async ({ interviewId, userId }) => {
    const interview = await findInterviewById(interviewId);

    validateInterviewOwnership(interview, userId)
    
    return interview;
}

export const getInterviewHistoryService = async ({ userId }) => {
    return await findInterviewsByUser(userId);
}

export const submitAnswerService = async ({ interviewId, userId, order, answer, answerDuration }) => {
    const interview = await findInterviewById(interviewId);

    validateInterviewOwnership(interview, userId)

    if (interview.status === "Completed") {
        throw new Error("Interview already completed");
    }

    const question = interview.questions.find((q) => q.order === Number(order));

    if (!question) {
        throw new Error("Question not found");
    }

    if (question.answer) {
        throw new Error("Question already answered");
    }


    return await updateQuestion(interviewId, order, {
        answer,
        answerDuration,
    });
};

export const completeInterviewService = async ({ interviewId, userId, }) => {
    const interview = await findInterviewById(interviewId);

    validateInterviewOwnership(interview, userId)

    if (interview.status === "Completed") {
        throw new Error("Interview already completed");
    }

    if (interview.completedQuestions !== interview.totalQuestions) {
        throw new Error("Complete all questions before finishing the interview");
    }

    // const report = await generateInterviewReport({
    //     questions: interview.questions,
    // });

    const duration = Math.floor( (Date.now() - new Date(interview.startedAt).getTime()) / 1000
    );

    // AI evaluates the complete interview in one request
    const evaluation = await evaluateEntireInterview({
        questions: interview.questions,
    });


    return await updateInterviewEvaluation(
        interviewId,
        evaluation,
        duration
    );
};