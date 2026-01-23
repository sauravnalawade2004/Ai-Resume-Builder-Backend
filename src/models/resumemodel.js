import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    title: {
        type: String,
        required: true,
        default: "untitled Resume"
    },
    public: {
        type: Boolean,
        default: false
    },
    template: {
        type: String,
        default: "classic"
    },
    accent_color: {
        type: String,
        default: "#000000"
    },
    professional_summary: {
        type: String,
        default: ""
    },
    skills: [{
        skill: String,
        level: String
    }],
    personal_info: {
        image: {
            type: String,
            default: ""
        },
        fullName: {
            type: String,
            default: ""
        },
        prodession: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        },
        location: {
            type: String,
            default: ""
        },
        linkedin: {
            type: String,
            default: ""
        },
        github: {
            type: String,
            default: ""
        },
        summary: String,
    },
    education: [{
        institution: { type: String },
        degree: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        gpa: { type: String },
        description: { type: String }
    }],
    experience: [{
        company: { type: String },
        position: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        description: { type: String },
        is_current: { type: Boolean }
    }],
    projects: [{
        name: { type: String },
        type: { String },
        description: { String }
    }],
    skills: [String],
}, { timestamps: true, minimize: false });

export const Resume = mongoose.model("Resume", ResumeSchema);
