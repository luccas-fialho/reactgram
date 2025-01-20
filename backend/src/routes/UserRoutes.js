const express = require("express");
const router = express.Router();

// Controller
const {
  registerUserAndSignIn,
  login,
  getCurrentUser,
  updateUser,
  getUserById,
} = require("../controllers/UserController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {
  userCreateValidation,
  loginValidation,
  updateUserValidation,
} = require("../middlewares/userValidations");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");

// Routes
router.post(
  "/register",
  userCreateValidation(),
  validate,
  registerUserAndSignIn
);

router.post("/login", loginValidation(), validate, login);

router.get("/profile", authGuard, getCurrentUser);

router.put(
  "/",
  authGuard,
  updateUserValidation(),
  validate,
  imageUpload.single("profileImage"),
  updateUser
);

router.get("/:id", getUserById);

module.exports = router;
