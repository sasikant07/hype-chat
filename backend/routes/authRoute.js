const router = require("express").Router();
const authController = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/user-register", authController.userRegister);
router.post("/user-login", authController.login);
router.post("/user-logout", authMiddleware, authController.logout);

module.exports = router;
