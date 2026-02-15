import openai from "../config/openai";


const openAi = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await resume.findById(resumeId);
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

//controller for wnchancing a resume's professional summaery 
//POST : app/ai/enhance-pro-sum

export const EnhanceProSummary = async (req, res) => {
     try {
        
const {usercontent} = req.body;

        if (!usercontent ) {
            return res.status(400).json({
                message : "Missing required field",
                success: "False"
            })
        }
       const response =  await ai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                { role: "system", content: "you are a helpful assistant in resume writing, Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. make it compelling and ATS_friendly. and only return text no options or anything else"},
                {
                    role: "system",
                    content: usercontent
                }
            ],
        })
        const enhancedSummary = response.choices[0].message.content;
        return res.status(200).json({
            success: true,
            message: "Enhanced Professional Summary",
            data: response.choices[0].message.content
        })
     } catch (error) {
        res.status(400).json({
            enhancedSummary : null,
            message: "error in summary",
            success : "False"
        })
        
     }
}


//controller for enhancing a resume's job description
//POST : app/ai/enhance-job-description

export const EnhanceJobDescription = async (req, res) => {
    try {
        const {usercontent} = req.body;

        if (!usercontent ) {
            return res.status(400).json({
                message : "Missing required field",
                success: "False"
            })
        }
        const response =  await ai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                { role: "system", 
                    content: "You are an expert in resume writing. Your task in to enhance the job description of a resume. The job description should be only in 1-2 sentence also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else."},
                {
                    role: "user",
                    content: usercontent
                }
            ],
        })
        const enhancedJobDescription = response.choices[0].message.content;
        return res.status(200).json({
            success: true,
            message: "Enhanced Job Description",
            data: enhancedJobDescription
        })
    } catch (error) {
        res.status(400).json({

        })
    }
}

//controller for  uploading a resume to the databse 
//POST : app/ai/uploade-resume

export const UploadeResume = async(req, res) => {
       try {
           const { resumeText, title } = req.body;
           const userId = req.userId;

           if (!resumeText || !title) {
            return res.status(400).json({
                message : "Missing required field",
                success: "False"
            })
           }

           const systemPrompt = "You are an expert AI Ageent to extract data from resume."

           const userPrompt = `extract data from this resume: ${resumeText}`

           const response = await ai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                { role: "system", content: systemPrompt},
                {
                    role: "user",
                    content: userPrompt,
                }
            ],
            response_format: {type: 'json_object'}
           })
           const extractedData = response.choices[0].message.content;
           return res.status(200).json({
            success: true,
            message: "Resume Uploaded Successfully",
            data: extractedData
           })
       } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
       }
}         



export default openAi
