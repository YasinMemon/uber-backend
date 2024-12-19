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
    const { firstname, lastname } = fullname;
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

module.exports.userLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, erros: errors.array() });
    }

    const { email, password } = req.body;

    if (!email || !password)
      return res.status(404).json({ message: "all fields are required" });

    const user = await userModel.findOne({ email }).select("+password");

    if(!user) return res.status(401).json({message: "Invalid email or password"})
    
    const isMatch = await user.comparePassword(password);

    if(!isMatch) return res.status(401).json({message: "Invalid email or password"});

    const token = user.genrateAuthToken();

    res.cookie('token', token);
    return res.status(200).json({message: 'login success', user, token})
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports.getProfile = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(401).json({message:error.message});
  }
}