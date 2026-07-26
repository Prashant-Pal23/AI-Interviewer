import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        resumeFileUrl: {
            type: String,
            required: true,
        },

        cloudinaryPublicId: {
            type: String,
            required: true,
        },

        fileName: {
            type: String,
            required: true,
        },

        extractedText: {
            type: String,
            required: true,
        },

        atsAnalysis: {
            score: {
                type: Number,
                default: null,
            },

            jobDescription: {
                type: String,
                default: null,
            },

            strengths: {
                type: [String],
                default: [],
            },

            weaknesses: {
                type: [String],
                default: [],
            },

            missingSkills: {
                type: [String],
                default: [],
            },

            suggestions: {
                type: [String],
                default: [],
            },

            analyzedAt: {
                type: Date,
                default: null,
            },
        },
    }, { timestamps: true,}
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;