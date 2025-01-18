const express = require("express");
const router = express.Router();

// Controller
const {
  registerUserAndSignIn,
  login,
} = require("../controllers/UserController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {
  userCreateValidation,
  loginValidation,
} = require("../middlewares/userValidations");

// Routes
router.post(
  "/register",
  userCreateValidation(),
  validate,
  registerUserAndSignIn
);

router.post("/login", loginValidation(), validate, login);

module.exports = router;
