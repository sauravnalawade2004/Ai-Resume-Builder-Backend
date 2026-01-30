import mongoose from "mongoose";


export const connectDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://sauravnalawade143_db_user:lBM7uOfOcPHWVRc3@airesumecluster0.hlytveu.mongodb.net/?appName=AiResumeCluster0' || process.env.DB)
        console.log("Database is connected")
    } catch (error) {
        console.error("Database is not connected")
    }
}