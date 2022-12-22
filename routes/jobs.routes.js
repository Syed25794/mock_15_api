const { Router } = require("express");
const { createJobs, signUpUser , loginUser } = require("../controllers/jobs.controllers");

const jobsRouter = Router();

jobsRouter.post("/signup",signUpUser);

jobsRouter.post("/login",loginUser);

jobsRouter.post("/create",createJobs);

module.exports = jobsRouter ;