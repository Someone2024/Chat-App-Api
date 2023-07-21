const express = require("express")
const router = express.Router();
const loginController = require("../controllers/loginController")
const messagesController = require("../controllers/messagesController")
const checkAuth = require("../controllers/CheckAuth")

router.post("/login", loginController.login)

router.get("/messages", checkAuth, messagesController.displayMessages)

router.post("/messages/send-message", checkAuth, messagesController.sendMessage)

module.exports = router;