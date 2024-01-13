const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/user-register", authController.userRegister);

module.exports = router;
