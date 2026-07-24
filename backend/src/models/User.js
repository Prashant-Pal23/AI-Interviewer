import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        profilePic: {
            type: String,
            default: "",
        },

        age: {
            type: Number,
            default: null,
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other", "Prefer not to say"],
            default: null,
        },

        preferredRole: {
            type: String,
            default: null,
        },

        experienceLevel: {
            type: String,
            enum: [
            "Student",
            "Fresher",
            "1-2 Years",
            "3-5 Years",
            "5+ Years",
            ],
            default: null,
        },

        college: {
            type: String,
            default: null,
        },

        skills: {
            type: [String],
            default: [],
        },
    }, { timestamps: true,}
);

const User = mongoose.model("User", userSchema);

export default User;