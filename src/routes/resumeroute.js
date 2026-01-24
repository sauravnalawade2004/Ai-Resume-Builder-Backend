import express from "express";
import { getUserResume, createResume, DeleteResume } from "../controllers/Resumecontroller.js";
import { authmiddleware } from "../middleware/authmiddleware.js";
import upload from "../config/multer.js";

const ResumeRouter = express.Router();

ResumeRouter.get("/get", authmiddleware, getUserResume);
ResumeRouter.post("/create", upload.single("image"), authmiddleware, createResume);
ResumeRouter.delete("/delete/:resumeId", authmiddleware, DeleteResume);
ResumeRouter.get("/get/:resumeId", authmiddleware, getResumeById);
ResumeRouter.put("/update/:resumeId", upload.single("image"), authmiddleware, updateResumeById);

export default ResumeRouter
