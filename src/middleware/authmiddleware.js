import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const authmiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false
        })
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedData;
        next();
    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}