import mongoose from "mongoose";

const interviewQuestionSchema = new mongoose.Schema(
  {
    order: {
      type: Number,
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    concepts: [String],

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
    },

    answer: {
      type: String,
      default: "",
    },

    aiExpectedAnswer: String,

    score: {
      type: Number,
      default: null,
    },

    feedback: String,

    answerDuration: {
        type: Number,
        default: 0,
    },
  }, { _id: false }
);

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },

    jobRole: {
      type: String,
      required: true,
    },

    company: String,

    topic: {
      type: String,
      required: true,
    },

    interviewType: {
      type: String,
      enum: ["Technical", "HR", "Mixed"],
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    totalQuestions: {
      type: Number,
      required: true,
    },

    completedQuestions: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["In Progress", "Completed"],
      default: "In Progress",
    },

    overallScore: Number,

    overallFeedback: String,

    strengths: [String],

    weaknesses: [String],

    suggestions: [String],

    startedAt: {
      type: Date,
      default: Date.now,
    },

    completedAt: Date,

    duration: Number,

    questions: [interviewQuestionSchema],
  }, { timestamps: true }
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;