const mongoose = require("mongoose");

const backend = process.env.MONGODB_URL

module.exports = async () => {
  try {
    await mongoose.connect(`${backend}/uber`);
    console.log("mongodb connected");
  } catch (error) {
    console.log("error accured during mongodb connection", error.message);
  }
};
