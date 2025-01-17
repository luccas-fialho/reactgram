const express = require("express");
const router = express.Router();

// Controller
const { registerUserAndSignIn } = require("../controllers/UserController");

// Middlewares
const validate = require("../middlewares/handleValidation");

// Routes
router.post("/register", validate, registerUserAndSignIn);

module.exports = router;
