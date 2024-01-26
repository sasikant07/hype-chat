const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/user-register", authController.userRegister);
router.post("/user-login", authController.login);

module.exports = router;
