import express from 'express'


const Router = express.Router();

Router.post("/generate", openAi);

export default Router