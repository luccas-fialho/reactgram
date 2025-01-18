const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("The name is mandatory!")
      .isLength({ min: 3 })
      .withMessage("Name must have at least 3 characters!"),
    body("email")
      .isString()
      .withMessage("E-mail is mandatory!")
      .isEmail()
      .withMessage("Insert a valid e-mail!"),
    body("password")
      .isString()
      .withMessage("Password is mandatory!")
      .isLength({ min: 5 })
      .withMessage("Password must have at least 5 characters!"),
    body("confirmpassword")
      .isString()
      .withMessage("Confirm password is mandatory!")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("The passwords must be equals!");
        }
        return true;
      }),
  ];
};

module.exports = {
  userCreateValidation,
};
