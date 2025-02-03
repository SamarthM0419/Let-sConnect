const socket = require("socket.io");
const crypto = require("crypto");

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

    socket.on("sendMessage", (data) => {
      
      const { firstName, userId, targetUserId, text } = data;
      const trimmedTargetUserId = targetUserId.trim();
      const roomId = getSecretRoomId(userId, trimmedTargetUserId);
      io.to(roomId).emit("messageReceived", { firstName, text });
      
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
