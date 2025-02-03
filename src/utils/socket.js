const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    // handle events

    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const a = String(userId);
      const b = String(targetUserId);
      const roomId = [a, b].sort();

      console.log(`${firstName} joined room: ${roomId}`);
      socket.join(roomId);
    });

    socket.on("sendMessage", ({ firstName, userId, targetUserId, text }) => {
      const roomId = [userId, targetUserId].join("_");
      console.log(firstName + " : " + text);
      io.to(roomId).emit("messageReceived", { firstName, text });
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
