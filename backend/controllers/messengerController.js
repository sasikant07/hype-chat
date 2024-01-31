const userModel = require("../models/authModel");

const getFriends = async (req, res) => {
  const myId = req.myId;
  try {
    const friendGet = await userModel.find({});

    const filterFriends = friendGet.filter((d) => d.id !== myId);  // get ALl Friends except current user

    res.status(200).json({ success: true, friends: filterFriends });
  } catch (error) {
    res.status(500).json({ error: { errorMessage: error } });
  }
};

module.exports = { getFriends };
