import { resume } from '../models/resumemodel.js'
import imagekit from '../config/imagekit.js'
import fs from 'fs'

//GET : /api/users/resume

export const getUserResume = async (req, res) => {
    try {
        const userId = req.userId;
        const resume = await resume.find({ userId })
        return res.status(200).json({
            success: true,
            message: "User Resume Fetched Successfully",
            data: resume
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;
        const newResume = new resume({
            userId,
            title,
            public: false,
            template: "classic",
            accent_color: "#000000",
            professional_summary: "",
            skills: [],
            personal_info: {
                image: "",
                fullName: "",
                prodession: "",
                email: "",
                phone: "",
                location: "",
                linkedin: "",
                github: "",
                summary: "",
            },
            education: [],
            experience: [],
            projects: [],
            skills: [],
        })
        await newResume.save();
        return res.status(200).json({
            success: true,
            message: "Resume Created Successfully",
            data: newResume
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


export const DeleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;
        const resume = await resume.findByIdAndDelete({ userId, _id: resumeId });
        return res.status(200).json({
            success: true,
            message: "Resume Deleted Successfully",
            data: resume
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//get user resume by id 
//GET : /api/resumes/get


export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;
        const resume = await resume.findOne({ userId, _id: resumeId });
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume Not Found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Resume Fetched Successfully",
            data: resume
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//update user resume by id 
//PUT : /api/resumes/update

export const updateResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file;

        let resumeDataCopy = JSON.parse(resumeData);

        if (image) {

            const imageBufferData = fs.createReadStream(image.path);
            const response = imagekit.files.upload({
                file: imageBufferData,
                fileName: image.originalname,
                folder: `/resume/${userId}`,
                tags: ["resume", "image"],
                transformation: {
                    pre: 'w-300, h-300, fo-face, z-0.75' + (removeBackground ? ',e-bgremove' : '')
                }
            });
            resumeDataCopy.personal_info.image = response.url;
        }

        const resume = await resume.findByIdAndUpdate({ userId, _id: resumeId }, resumeDataCopy, { new: true });
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume Not Found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Resume Updated Successfully",
            data: resume
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
