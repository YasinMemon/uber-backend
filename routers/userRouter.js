const express = require("express");
const { userRegister, userLogin } = require("../controllers/userController");
const { body } = require("express-validator");

const userRouter = express.Router();

userRouter.post(
  "/register",
  [body("email").isEmail().withMessage("Invalid Email")],
  userRegister
);
userRouter.post(
  "/login",
  [body("email").isEmail().withMessage("Invalid Email")],
  userLogin
);

module.exports = userRouter;
