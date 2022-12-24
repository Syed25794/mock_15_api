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
  const { email, password } = req.body;
  const token = req.headers.authorization;
  console.log(token,email,password);
  if (token) {
    console.log(token,"token");
    let decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded,"decoded");
    if (decoded) {
      res.send({ msg: "login successfull" });
    } else {
      const findUser =  User.find({ email : email });
      console.log(findUser);
      bcrypt.compare(password, findUser.password, async (error, result) => {
        if (error) {
          res.send({ msg: "error in comparing password" });
        } else {
          console.log(process.env.SECRET_KEY,"KEY");
          let token = jwt.sign({ foo: "bar" }, process.env.SECRET_KEY);
          console.log("token",token);
          req.headers.authorization = `bearer ${token}`;
          res.send({ msg: "login successfull" });
        }
      });
    }
  } else {
    // bcrypt.compare(password, findUser.password, async (error, result) => {
    //   if (error) {
    //     res.send({ msg: "error in comparing password" });
    //   } else {
    //     let token = jwt.sign({ foo: "bar" }, process.env.SECRET_KEY);
    //     console.log("token",token);
    //     req.headers.authorization = `bearer ${token}`;
    //     res.send({ msg: "login successfull" });
    //   }
    // });
  }
};

module.exports = {signUpUser, loginUser };
