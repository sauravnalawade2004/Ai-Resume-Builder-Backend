import express from "express";
import { getUserResume } from "../controllers/Resumecontroller.js";
import { authmiddleware } from "../middleware/authmiddleware.js";

const ResumeRouter = express.Router();

ResumeRouter.get("/", authmiddleware, getUserResume);

export default ResumeRouter
