import express from "express";
import { connectDatabase } from "./src/config/db";
import UserRouter from "./src/routes/userroute";
import cors from "cors";

const PORT = 3000;

const app = express();

connectDatabase();

app.use(express.json());
app.use(cors());


app.use('/app/users', UserRouter);


app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log("Server is Running on Post 3000")
})