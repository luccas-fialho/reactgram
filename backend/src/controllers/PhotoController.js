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
    return;
  }

  res.status(200).json(newPhoto);
};

const deletePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  try {
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

    if (!photo) {
      res.status(404).json({ errors: ["Photo not found!"] });
      return;
    }

    if (!photo.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["There was an error, please try again later..."] });
    }

    await Photo.findByIdAndDelete(photo._id);

    res
      .status(200)
      .json({ id: photo._id, message: "Photo deleted successfully!" });
  } catch (error) {
    res.status(404).json({ errors: ["Photo not found!"] });
  }
};

const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

const getPhotosByUser = async (req, res) => {
  const { id } = req.params;
  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  res.status(200).json(photos);
};

const getPhotosById = async (req, res) => {
  const { id } = req.params;

  const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

  if (!photo) {
    res.status(404).json({ errors: ["Photo not found!"] });
    return;
  }

  res.status(200).json(photo);
};

const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const reqUser = req.user;
  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ errors: ["Photo not found!"] });
    return;
  }

  if (!photo.userId.equals(reqUser._id)) {
    res
      .status(422)
      .json({ errors: ["There was an error, please try again later..."] });
    return;
  }

  if (title) {
    photo.title = title;
  }

  await photo.save();

  res.status(200).json({ photo, message: "Photo updated successfully!" });
};

const likePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ errors: ["Photo not found!"] });
    return;
  }

  if (photo.likes.includes(reqUser._id)) {
    res.status(422).json({ errors: ["Photo already liked!"] });
    return;
  }

  photo.likes.push(reqUser._id);

  await photo.save();

  res
    .status(200)
    .json({ photoId: id, userId: reqUser._id, message: "Photo liked!" });
};

const commentPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ errors: ["Photo not found!"] });
    return;
  }

  const userComment = {
    comment,
    userImage: user.profileImage,
    userId: user._id,
    userName: user.name,
  };

  photo.comments.push(userComment);

  await photo.save();

  res.status(200).json({
    comment: userComment,
    message: "Comment added successfully!",
  });
};

const searchPhotos = async (req, res) => {
  const { q } = req.query;

  const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();

  if (!photos.length) {
    res.status(404).json({ errors: ["No photos found with this title!"] });
    return;
  }

  res.status(200).json(photos);
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getPhotosByUser,
  getPhotosById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
};
