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

const EnhanceProSummary = async (req, res) => {
     try {
        const {usercontent} = req.body;

        if (!usercontent ) {
            return res.status(400).json({
                message : "Missing required field",
                success: "False"
            })
        }

        await ai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                { role: "system", content: "you are a helpful assistant"},
                {
                    role: "user",
                    content: "Explain to me how Ai works"
                }
            ],
        })
     } catch (error) {
        res.status(400).json({
            message: "error in summary",
            success : "False"
        })
        
     }
}

export default openAi
