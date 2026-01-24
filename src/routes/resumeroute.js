import express from "express";
import { getUserResume, createResume, DeleteResume } from "../controllers/Resumecontroller.js";
import { authmiddleware } from "../middleware/authmiddleware.js";

const ResumeRouter = express.Router();

ResumeRouter.get("/", authmiddleware, getUserResume);
ResumeRouter.post("/", authmiddleware, createResume);
ResumeRouter.delete("/:resumeId", authmiddleware, DeleteResume);

export default ResumeRouter
