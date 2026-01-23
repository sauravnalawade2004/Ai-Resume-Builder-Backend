import express from 'express'
import userModel from "../models/usersmodels";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";
const app = express()



const genrateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
    return token
}

export const Register = async (req, res) => {
    try {
        // Check if user already exists
        const { name, password, email } = req.body;
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({
                success: false,
                message: "User already exists"
            })
        }

        // Validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            })
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password"
            })
        }

        // Hashing user password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id);

        res.json({
            success: true,
            message: "User registered successfully",
            data: user,
            token: token
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            message: "Error"
        })
    }
}
