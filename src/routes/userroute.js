import express from 'express'
import { Register, Login, getUser } from "../controllers/usercontroller";
import { authmiddleware } from "../middleware/authmiddleware";

const UserRouter = express.Router;

UserRouter.post('/signup', Register);
UserRouter.post('/login', Login);
UserRouter.get('/data', getUser);

export default UserRouter;