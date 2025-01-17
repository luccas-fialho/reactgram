const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = process.env.JWT_SECRET;

const generateUserToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

const registerUserAndSignIn = async (req, res) => {
  res.send("Register");
};

module.exports = {
  registerUserAndSignIn,
};
