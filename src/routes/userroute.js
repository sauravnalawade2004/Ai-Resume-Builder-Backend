import express from 'express'
import { Register, Login, getUser } from "../controllers/usercontroller.js";
import { authmiddleware } from "../middleware/authmiddleware.js";

const UserRouter = express.Router;

UserRouter.post('/signup', Register);
UserRouter.post('/login', Login);
UserRouter.get('/data', authmiddleware, getUser);


export default UserRouter;