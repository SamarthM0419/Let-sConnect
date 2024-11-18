const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  //creating a new instance of the user model
  const user = new User({
    firstName: "Samarth",
    lastName: "M",
    emailId: "samarth@gmail.com",
    password: "Qwerty@123",
  });

  try {
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

connectDb()
  .then(() => {
    console.log("Database connection successful...");
    app.listen(7777, () =>
      console.log("Server created successful on port 7777...")
    );
  })
  .catch((err) => {
    console.error("Database connection unsuccessful!!");
  });
