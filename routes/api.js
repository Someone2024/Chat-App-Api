const express = require("express")
const router = express.Router();
const loginController = require("../controllers/loginController")
const messagesController = require("../controllers/messagesController")
const checkAuth = require("../controllers/CheckAuth")

router("/login", loginController.logIn)

router("/messages", checkAuth.checkAuth, messagesController.displayMessages)

router("/messages/send-message", checkAuth.checkAuth, messagesController.sendMessage)

module.exports = router;