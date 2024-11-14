const express = require("express");

const app = express();
const { adminAuth } = require("./middlewares/auth");

app.get("/getUserData", (req, res) => {
  // Logic of db call and get user data

  throw new Error("random error");
  res.send("User data sent");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(7777, () =>
  console.log("Server created successful on port 7777...")
);
