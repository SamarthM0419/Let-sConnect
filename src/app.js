const express = require("express");

const app = express();
const { adminAuth } = require("./middlewares/auth");

// app.use("/", (req, res, next) => {
//   console.log("Handling / route");
//   next();
// });

// app.get("/user", (req, res, next) => {
//   console.log("Handling the route user");
//   next();
// });

// app.get("/user", (req, res, next) => {
//   console.log("Handling the route user");
//   res.send("Second route handler");
// });

// Importance of route handlers and middleware
app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res, next) => {
  //logic of checking if the user is authorized
  //Logic of fetching all data
  res.send("All data sent");
});

app.delete("/admin/deleteUser", (req, res, next) => {
  // checking if the user is authorized ==> instead of writing the logic everytime , we use middleware
  res.send("delete a user");
});

app.listen(7777, () =>
  console.log("Server created successful on port 7777...")
);
