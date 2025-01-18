const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("The name field is required")
      .isLength({ min: 3 })
      .withMessage("Name must have at least 3 characters!"),
    body("email")
      .isString()
      .withMessage("E-mail field is required!")
      .isEmail()
      .withMessage("Insert a valid e-mail!"),
    body("password")
      .isString()
      .withMessage("Password field is required!")
      .isLength({ min: 5 })
      .withMessage("Password must have at least 5 characters!"),
    body("confirmpassword")
      .isString()
      .withMessage("Confirm password field is required!")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("The passwords must be equals!");
        }
        return true;
      }),
  ];
};

const loginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("The e-mail field is required!")
      .isEmail()
      .withMessage("Insert a valid email!"),
    body("password").isString().withMessage("Password is required!"),
  ];
};

module.exports = {
  userCreateValidation,
  loginValidation,
};
