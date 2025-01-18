const express = require("express");
const router = express.Router();

// Controller
const { registerUserAndSignIn } = require("../controllers/UserController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {userCreateValidation} = require("../middlewares/userValidations")

// Routes
router.post("/register", userCreateValidation(), validate, registerUserAndSignIn);

module.exports = router;
