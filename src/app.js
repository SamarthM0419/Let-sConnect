const express = require("express");

const app = express();

// app.get("/user", (req, res) => {
//   res.send("This will only handle get calls");
// });

// app.post("/user", (req, res) => {
//   res.send("This will handle only post calls");
//   console.log("save data");
// });

//handle dynamic routes based on id
app.get("/user/:userId", (req, res) => {
  console.log(req.query);
  res.send({ firstName: "Samarth", lastName: "M" });
});

app.use("/", (req, res) => {
  res.send("Hello from the dashboard!");
});

app.listen(7777, () =>
  console.log("Server created successful on port 7777...")
);
