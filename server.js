import express from "express";
import { connectDatabase } from "./src/config/db.js";
import UserRouter from "./src/routes/userroute.js";
import cors from "cors";
import ResumeRouter from "./src/routes/resumeroute.js";
import dotenv from 'dotenv'
dotenv.config()

const PORT = 3000;

const app = express();

connectDatabase();

app.use(express.json());
app.use(cors());


app.use('/app/users', UserRouter);
app.use('/app/resume', ResumeRouter);

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log("Server is Running on Post 3000")
})