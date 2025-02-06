const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { Chat } = require("../models/chat");
const { validateChatMessage } = require("../utils/validation");

const chatRouter = express.Router();

chatRouter.get(
  "/chat/:targetUserId",
  userAuth,
  validateChatMessage,
  async (req, res) => {
    const { targetUserId } = req.params;
    const userId = req.user._id;

    try {
      let chat = await Chat.findOne({
        participants: { $all: [userId, targetUserId] },
      })
        .populate({
          path: "messages.senderId",
          select: "firstName , lastName ",
        })
        .slice("messages", -25);

      if (!chat) {
        chat = new Chat({
          participants: [userId, targetUserId],
          messages: [],
        });
        await chat.save();
        return res.status(201).json(chat);
      }
      res.status(200).json(chat);
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = chatRouter;
