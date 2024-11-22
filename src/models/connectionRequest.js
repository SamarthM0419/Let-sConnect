const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// compound index => when queried using both the fields , it will automatically become very fast.
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// called everytime connectionRequest is saved
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;

  // check if from and to userId are same
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself");
  }
  next();
});

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
