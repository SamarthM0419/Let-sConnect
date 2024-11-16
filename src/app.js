const express = require("express");
const app = express();
const connectDb = require("./config/database");

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
