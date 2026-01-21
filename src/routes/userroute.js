import express from 'express'
import { Register } from "../controllers/usercontroller";

const UserRouter = express.Router;

UserRouter.post('/signup' , Register);

export default UserRouter;