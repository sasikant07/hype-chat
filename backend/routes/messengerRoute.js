const router = require("express").Router();
const messengerController = require("../controllers/messengerController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/get-friends", authMiddleware, messengerController.getFriends);
router.post(
  "/send-message",
  authMiddleware,
  messengerController.messageUploadDB
);

module.exports = router;
