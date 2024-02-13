const formidable = require("formidable");
const fs = require("fs");
const userModel = require("../models/authModel");
const messageModel = require("../models/messageModel");
const path = require("path");

const getLastMessage = async (myId, fdId) => {
  const msg = await messageModel
    .findOne({
      $or: [
        {
          $and: [
            {
              senderId: { $eq: myId },
            },
            {
              receiverId: { $eq: fdId },
            },
          ],
        },
        {
          $and: [
            {
              senderId: { $eq: fdId },
            },
            {
              receiverId: { $eq: myId },
            },
          ],
        },
      ],
    })
    .sort({ updatedAt: -1 });

  return msg;
};

const getFriends = async (req, res) => {
  const myId = req.myId;
  let fnd_msg = [];
  try {
    const friendGet = await userModel.find({
      _id: {
        $ne: myId,
      },
    });

    for (let i = 0; i < friendGet.length; i++) {
      let lmsg = await getLastMessage(myId, friendGet[i].id);
      fnd_msg = [
        ...fnd_msg,
        {
          fndInfo: friendGet[i],
          msgInfo: lmsg,
        },
      ];
    }

    // const filterFriends = friendGet.filter((d) => d.id !== myId); // get ALl Friends except current user

    res.status(200).json({ success: true, friends: fnd_msg });
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
        message: {
          text: message,
          image: "",
        },
      },
    });
  } catch (error) {
    res.status(500).json({ error: { errorMessage: error } });
  }
};

const getMessage = async (req, res) => {
  const { id } = req.params;
  const myId = req.myId;
  const fdId = id;

  try {
    let getAllMessage = await messageModel.find({
      $or: [
        {
          $and: [
            {
              senderId: { $eq: myId },
            },
            {
              receiverId: { $eq: fdId },
            },
          ],
        },
        {
          $and: [
            {
              senderId: { $eq: fdId },
            },
            {
              receiverId: { $eq: myId },
            },
          ],
        },
      ],
    });

    // getAllMessage = getAllMessage.filter(
    //   (m) =>
    //     (m.senderId === myId && m.receiverId === fdId) ||
    //     (m.receiverId === myId && m.senderId === fdId)
    // );

    res.status(200).json({ success: true, message: getAllMessage });
  } catch (error) {
    res.status(500).json({ error: { errorMessage: error } });
  }
};

const imageMessageUpload = async (req, res) => {
  const form = new formidable.IncomingForm();
  const senderId = req.myId;

  form.parse(req, async (err, fields, files) => {
    let { senderName, receiverId, imageName } = fields;
    senderName = senderName[0];
    receiverId = receiverId[0];
    imageName = imageName[0];

    const newPath = path.join(
      __dirname + `../../../frontend/public/images/${imageName}`
    );

    files.image[0].originalFilename = imageName;

    try {
      fs.copyFile(files.image[0].filepath, newPath, async (error) => {
        if (error) {
          res.status(400).json({ error: { errorMessage: error } });
        } else {
          const insertMessage = await messageModel.create({
            senderId: senderId,
            senderName: senderName,
            receiverId: receiverId,
            message: {
              text: "",
              image: files.image[0].originalFilename,
            },
          });
          res.status(201).json({
            success: true,
            message: {
              senderId: senderId,
              senderName: senderName,
              receiverId: receiverId,
              message: {
                text: "",
                image: imageName,
              },
            },
          });
        }
      });
    } catch (error) {
      res.status(500).json({ error: { errorMessage: error } });
    }
  });
};

module.exports = {
  getFriends,
  messageUploadDB,
  getMessage,
  imageMessageUpload,
};
