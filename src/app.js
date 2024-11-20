const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    //Validation of the data
    validateSignUpData(req);

    // Encrypt the password
    

    //creating a new instance of the user model
    const user = new User(req.body);

    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// Get user by email
app.get("/getUser", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found!");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something Went Wrong!!");
  }

  // try {
  //   const users = await User.find({ emailId: userEmail });
  //   if (users.length === 0) {
  //     res.status(404).send("User not found");
  //   } else {
  //     res.send(users);
  //   }
  // } catch (err) {
  //   res.status(400).send("Something Went Wrong!!");
  // }
});

// FEED API -> get all the users from database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something Went Wrong!!");
  }
});

// get user by _id
app.get("/getUserById", async (req, res) => {
  const userId = req.body._id;
  console.log(userId);

  try {
    const user = await User.findById({ _id: userId });
    if (!user) {
      res.status(404).send("User not found!");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something Went Wrong!!");
  }
});

// delete the user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    //const user = await User.findByIdAndDelete({ userId });
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

// update data of the user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  // console.log(data);

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed!");
    }
    if (data?.skills.length > 20) {
      throw new Error("Skills can't be greaterthan 20");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("User updated successfully!!");
  } catch (err) {
    res.status(400).send("Update failed" + err.message);
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
