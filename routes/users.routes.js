const { Router } = require("express");
const {
  signUpUser,
  loginUser,
  createTickets,
  getAllTickets
} = require("../controllers/users.controllers");

const usersRouter = Router();

usersRouter.post("/signup", signUpUser);

usersRouter.post("/login", loginUser);

usersRouter.post("/createTickets",createTickets);

usersRouter.get("/getAllTickets",getAllTickets);

module.exports = usersRouter;
