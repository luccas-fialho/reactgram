const Photo = require("../models/Photo");
const mongoose = require("mongoose");
const User = require("../models/User");

const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  if (!newPhoto) {
    res
      .status(422)
      .json({ errors: ["There was an error, try again later..."] });
  }

  res.status(200).json(newPhoto);
};

module.exports = {
  insertPhoto,
};
