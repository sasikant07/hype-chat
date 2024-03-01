const router = require("express").Router();
const messengerController = require("../controllers/messengerController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/get-friends", authMiddleware, messengerController.getFriends);
router.post(
  "/send-message",
  authMiddleware,
  messengerController.messageUploadDB
);
router.post(
  "/image-message-send",
  authMiddleware,
  messengerController.imageMessageUpload
);
router.get("/get-message/:id", authMiddleware, messengerController.getMessage);
router.post("/seen-message", authMiddleware, messengerController.messageSeen);
router.post("/delivered-message", authMiddleware, messengerController.deliveredMessage);

module.exports = router;
