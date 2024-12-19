const express = require("express");
const { userRegister } = require("../controllers/userController");
const { body } = require("express-validator");

const userRouter = express.Router();

userRouter.post(
  "/register",
  [body("email").isEmail().withMessage("Invalid Email")],
  userRegister
);

module.exports = userRouter;
