const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");

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
      const { firstName, userId, targetUserId, text } = data;
      const trimmedTargetUserId = targetUserId.trim();
      const roomId = getSecretRoomId(userId, trimmedTargetUserId);
      // save messages to the database
      try {
        const chat = await Chat.findOne({
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

        console.log(chat);
        await chat.save();
        io.to(roomId).emit("messageReceived", { firstName, text });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
