const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://samarth:test@nodeproject.neaxy.mongodb.net/let'sMatch"
  );
};

module.exports = connectDb;


