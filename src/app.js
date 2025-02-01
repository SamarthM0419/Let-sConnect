const express = require("express");
const app = express();
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDb()
  .then(() => {
    console.log("Database connection successful...");
    app.listen(process.env.PORT, () =>
      console.log("Server created successful on port 7777...")
    );
  })
  .catch((err) => {
    console.error("Database connection unsuccessful!!", err.message);
  });
