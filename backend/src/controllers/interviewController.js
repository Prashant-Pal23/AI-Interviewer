import { createInterviewService, getInterviewByIdService, getInterviewHistoryService, submitAnswerService, completeInterviewService, } from "../services/interviewService.js";

export const createInterview = async (req, res, next) => {
    try {
        const interview = await createInterviewService({ 
            interviewData: {
                ...req.body,
                user: req.id,
            }
        });

        res.status(201).json({
            success: true,
            message: "Interview created successfully.",
            interview,
        });
    } catch (error) {
        next(error);
    }
};

export const getInterviewById = async (req, res, next) => {
    try {
        const interview = await getInterviewByIdService({ 
            interviewId: req.params.id,
            userId: req.id
        });

        res.status(200).json({
            success: true,
            interview,
        });
    } catch (error) {
        next(error);
    }
};

export const getInterviewHistory = async (req, res, next) => {
    try {
        const interviews = await getInterviewHistoryService({ userId: req.id });

        res.status(200).json({
            success: true,
            interviews,
        });
    } catch (error) {
        next(error);
    }
};

export const submitAnswer = async (req, res, next) => {
    try {
        const { answer, answerDuration } = req.body;

        const interview = await submitAnswerService({
            interviewId: req.params.id,
            userId: req.id,
            order: req.params.order,
            answer,
            answerDuration,
        });

        res.status(200).json({
            success: true,
            message: "Answer submitted successfully.",
            interview,
        });
    } catch (error) {
        next(error);
    }
};

export const completeInterview = async (req, res, next) => {
    try {
        const interview = await completeInterviewService({ 
            interviewId: req.params.id,
            userId: req.id
        })

        res.status(200).json({
            success: true,
            message: "Interview completed successfully.",
            interview,
        })
    } catch (error) {
        next(error)
    }
};