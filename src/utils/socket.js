const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    // handle events

    socket.on("joinChat", (data) => {
      const { firstName, userId, targetUserId } = data;
      const trimmedTargetUserId = targetUserId.trim();
      const roomId = getSecretRoomId(userId, trimmedTargetUserId);
      console.log(`${firstName} joined room: ${roomId}`);
      socket.join(roomId);
    });

    socket.on("sendMessage", async (data) => {
      const { firstName, lastName, userId, targetUserId, text } = data;
      const trimmedTargetUserId = targetUserId.trim();
      const roomId = getSecretRoomId(userId, trimmedTargetUserId);

      
      try {
        const connectionExists = await ConnectionRequest.findOne({
          $or: [
            {
              fromUserId: userId,
              toUserId: trimmedTargetUserId,
              status: "accepted",
            },
            {
              fromUserId: trimmedTargetUserId,
              toUserId: userId,
              status: "accepted",
            },
          ],
        });

        if (!connectionExists) {
          console.log("Message blocked: Users are not connected.");
          return;
        }

        // save messages to the database

        let chat = await Chat.findOne({
          participants: { $all: [userId, trimmedTargetUserId] },
        });

        if (!chat) {
          let chat = new Chat({
            participants: [userId, trimmedTargetUserId],
            messages: [],
          });
        }

        chat.messages.push({
          senderId: userId,
          text,
        });

        await chat.save();
        io.to(roomId).emit("messageReceived", { firstName, lastName, text });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
