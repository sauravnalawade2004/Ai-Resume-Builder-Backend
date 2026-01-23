import mongoose from "mongoose";


export const connectDatabase = async () => {
    try {
        await mongoose.connect('127.00.0' || process.env.DB)
        console.log("Database is connected")
    } catch (error) {
        console.error("Database is not connected")
    }
}