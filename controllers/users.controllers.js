const { User } = require("../models/users.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Ticket } = require("../models/tickets.models");
require("dotenv").config();

const signUpUser = async (req, res) => {
  const { email, name, password } = req.body;
  const existingUser = await User.find({ email: email });
  if (existingUser.length) {
    res.send({ msg: "User Already Exists please login" });
  } else {
    bcrypt.hash(password, 5, async (error, result) => {
      if (error) {
        res.send({
          msg: "Something went wrong in hashing. Please sign up later.",
        });
      } else {
        const newUser = new User({
          email,
          password: result,
          name,
        });
        await newUser.save();
        res.send({ msg: "Successfully sign up." });
      }
    });
  }
};

const loginUser = async (req, res) => {
  var { password, email } = req.body;
  const token = req.headers.authorization;
  if (token) {
    let decoded = jwt.verify(token, "syed25794");
    if (decoded) {
      res.send({"msg":"Login Successfully."});
    } else {
      const result = await User.findOne({ email });
      bcrypt.compare(password, result.password, async (error, result) => {
        if (result) {
          res.send({"msg":"Login Successfully."});
        } else {
          res.send({"msg":"Invalid Credentials!"});
        }
      });
    }
  } else {
    const { email, password } = req.body;
    const result = await User.findOne({ email });
    bcrypt.compare(password, result.password, async (error, result) => {
      if (result) {
        res.send("Login Successfully.");
      } else {
        res.send("Invalid Credentials!");
      }
    });
  }
};

const createTickets = async( req, res)=>{
  const { title, message, category } = req.body;
  try {
    const payload = new Ticket({
      title,
      message,
      category,
      bookmark:false
    });
    await payload.save();
    res.send({"msg":"ticket created successfully"});
  } catch (error) {
    res.send({"error":error});
  }
}

const getAllTickets=async(req,res)=>{
  try {
    let tickets = await Ticket.find();
    res.send({"data":tickets});
  } catch (error) {
    res.send({"error":error});
  }
}

module.exports = {signUpUser, loginUser,createTickets, getAllTickets };
