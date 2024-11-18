const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  //creating a new instance of the user model
  const user = new User(req.body);

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
