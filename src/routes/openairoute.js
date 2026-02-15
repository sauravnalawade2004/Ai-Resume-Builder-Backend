import express from 'express'
import { openAi, EnhanceProSummary, EnhanceJobDescription, UploadeResume } from '../controllers/openaicontroller.js';
import { authmiddleware } from '../middleware/authmiddleware.js';
const OpenAiRouter = express.Router();

OpenAiRouter.post("/generate", authmiddleware, openAi);
OpenAiRouter.post('/enhance-pro-sum', authmiddleware, EnhanceProSummary);
OpenAiRouter.post('/enhance-job-description', authmiddleware, EnhanceJobDescription);
OpenAiRouter.post('/upload-resume', authmiddleware, UploadeResume);

export default OpenAiRouter