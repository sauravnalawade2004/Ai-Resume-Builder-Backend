import express from 'express'
import { userModel } from "../models/usersmodels.js";
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

//POST : //api/users/signup

export const Register = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        // Check if user already exists
        const { username, password, email } = req.body;
        console.log("Checking if user exists...");
        const exists = await userModel.findOne({ email });
        console.log("User exists:", exists);

        if (exists) {
            return res.json({
                success: false,
                message: "User already exists"
            })
        }

        console.log("Validating email and password...");
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

        console.log("Hashing password...");
        // Hashing user password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log("Creating new user...");
        // Creating new user
        const newUser = new userModel({
            name: username,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()
        console.log("User created:", user);

        const token = genrateToken(user._id)
        console.log("Token generated:", token);
        res.json({
            success: true,
            message: "User registered successfully",
            data: user,
            token: token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error registering user",
            error: error.message
        })
    }
}

//POST : //api/users/login

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findone({ email })
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (!isPasswordMatched) {
            return res.json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const token = genrateToken(user._id)
        res.json({
            success: true,
            message: "User logged in successfully",
            data: user,
            token: token
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }
}



//GET: getting user id

export const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "User found successfully",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }
}