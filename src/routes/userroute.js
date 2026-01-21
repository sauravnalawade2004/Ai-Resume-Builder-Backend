import express from 'express'
import { Register } from "../controllers/usercontroller";

const Router = express.Router;

Router.post('/signup' , Register)
