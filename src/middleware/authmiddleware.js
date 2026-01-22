import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const authmiddleware = () => {
    try {

    } catch (error) {
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
}