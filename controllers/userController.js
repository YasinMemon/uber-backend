const userModel = require("../models/userModel.js");
const { validationResult } = require("express-validator");

module.exports.userRegister = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    if (!fullname.firstname || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const hashedPassword = await userModel.hashPassword(password);
    const { firstname, lastname } = fullname
    const user = await userModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password: hashedPassword,
    });

    const token = user.genrateAuthToken();
    
    return res
      .status(200)
      .json({ success: true, message: "registered successfull", user, token });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
