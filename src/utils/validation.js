const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password");
  }
};

const validateEditProfile = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "age",
    "gender",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

const validateChatMessage = async (req, res, next) => {
  let { message, recieverId } = req.body;
  const targetUserId = recieverId?.trim();
  const senderId = req.user._id;

  try {
    if (!message || typeof message != "string") {
      return res.status(400).json({ error: "Message can't be emplty" });
    }

    message = message.trim();

    if (message.length < 1 || message.length > 500) {
      return res
        .status(400)
        .json({ error: "Message must be between 1 and 500 characters" });
    }

    if (senderId.toString() === receiverId) {
      return res
        .status(400)
        .json({ error: "You cannot send a message to yourself" });
    }

    req.body.message = message;
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  validateSignUpData,
  validateEditProfile,
  validateChatMessage,
};
