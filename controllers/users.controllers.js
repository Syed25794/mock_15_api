const { User } = require("../models/users.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signUpUser = async (req, res) => {
  const { email, name, password } = req.body;
  const existingUser = await User.find({ email: email });
  if (existingUser.length) {
    res.send({ msg: "User Already Exists please login" });
  } else {
    bcrypt.hash(password, 6, async (error, result) => {
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
      res.send("Login Successfully.");
    } else {
      const result = await User.findOne({ email });
      console.log(result);
      bcrypt.compare(password, result.password, async (error, result) => {
        if (result) {
          res.send("Login Successfully.");
        } else {
          res.send("Invalid Credentials!");
        }
      });
    }
  } else {
    const { email, password } = req.body;
    const result = await User.findOne({ email });
    console.log(result);
    bcrypt.compare(password, result.password, async (error, result) => {
      if (result) {
        res.send("Login Successfully.");
      } else {
        res.send("Invalid Credentials!");
      }
    });
  }
};

module.exports = {signUpUser, loginUser };
