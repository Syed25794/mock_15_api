const { Router } = require("express");
const {
  signUpUser,
  loginUser
} = require("../controllers/users.controllers");

const usersRouter = Router();

usersRouter.post("/signup", signUpUser);

usersRouter.post("/login", loginUser);

module.exports = usersRouter;
