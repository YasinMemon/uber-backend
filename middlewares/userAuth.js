const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel.js")

const userAuth = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized user" });

  try {
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findById(decoded_token._id);

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ error: error.message });
  }
};

module.exports = userAuth