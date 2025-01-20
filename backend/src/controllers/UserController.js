const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const jwtSecret = process.env.JWT_SECRET;

const generateUserToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

const generatePasswordHash = async (password) => {
  // Generate password hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
};

const registerUserAndSignIn = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(422).json({ errors: ["This e-mail is already registered!"] });
    return;
  }

  const passwordHash = generatePasswordHash(password);

  // Create an user
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  if (!newUser) {
    res
      .status(422)
      .json({ errors: ["There was an error, please try again later..."] });
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateUserToken(newUser._id),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check if user exists
  if (!user) {
    res.status(404).json({ errors: ["User not found!"] });
    return;
  }

  // Check if password matches
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Incorrect password!"] });
    return;
  }

  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateUserToken(user._id),
  });
};

const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { name, password, bio } = req.body;

  let profileImage = null;

  if (req.file) profileImage - req.file.filename;

  const reqUser = req.user;

  const user = await User.findById(
    new mongoose.Types.ObjectId(reqUser._id)
  ).select("-password");

  if (name) user.name = name;

  if (password) {
    const passwordHash = generatePasswordHash(password);
    user.password = passwordHash;
  }

  if (profileImage) user.profileImage = profileImage;

  if (bio) user.bio = bio;

  await user.save();

  res.status(200).json(user);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      res.status(404).json({ erros: ["User not found!"] });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ errors: ["User not found!"] });
    return;
  }
};

module.exports = {
  registerUserAndSignIn,
  login,
  getCurrentUser,
  updateUser,
  getUserById,
};
