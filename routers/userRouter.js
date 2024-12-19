const express = require("express");
const {
  userRegister,
  userLogin,
  getProfile,
} = require("../controllers/userController");
const { body } = require("express-validator");
const userAuth = require("../middlewares/userAuth.js");

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
userRouter.get("/profile", userAuth, getProfile);

module.exports = userRouter;
