const userModel = require("../models/authModel");
const messageModel = require("../models/messageModel");

const getFriends = async (req, res) => {
  const myId = req.myId;
  try {
    const friendGet = await userModel.find({});

    const filterFriends = friendGet.filter((d) => d.id !== myId); // get ALl Friends except current user

    res.status(200).json({ success: true, friends: filterFriends });
  } catch (error) {
    res.status(500).json({ error: { errorMessage: error } });
  }
};

const messageUploadDB = async (req, res) => {
  const { senderName, receiverId, message } = req.body;
  const senderId = req.myId;

  try {
    const insertMessage = await messageModel.create({
      senderId: senderId,
      senderName: senderName,
      receiverId: receiverId,
      message: {
        text: message,
        image: "",
      },
    });

    res.status(201).json({
      success: true,
      message: {
        senderId: senderId,
        senderName: senderName,
        receiverId: receiverId,
        message: message,
      },
    });
  } catch (error) {
    res.status(500).json({ error: { errorMessage: error } });
  }
};

module.exports = { getFriends, messageUploadDB };
