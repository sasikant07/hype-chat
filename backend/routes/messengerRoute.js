const router = require("express").Router();
const messengerController = require("../controllers/messengerController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/get-friends", authMiddleware, messengerController.getFriends);
router.post(
  "/send-message",
  authMiddleware,
  messengerController.messageUploadDB
);
router.get("/get-message/:id", authMiddleware, messengerController.getMessage);

module.exports = router;
