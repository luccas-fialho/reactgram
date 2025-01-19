const express = require("express");
const router = express.Router();

// Controller
const {
  registerUserAndSignIn,
  login,
  getCurrentUser,
} = require("../controllers/UserController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {
  userCreateValidation,
  loginValidation,
} = require("../middlewares/userValidations");
const authGuard = require("../middlewares/authGuard");

// Routes
router.post(
  "/register",
  userCreateValidation(),
  validate,
  registerUserAndSignIn
);

router.post("/login", loginValidation(), validate, login);

router.get("/profile", authGuard, getCurrentUser);

module.exports = router;
