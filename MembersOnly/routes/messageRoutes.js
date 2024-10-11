const express = require("express");

const router = express.Router()
const messageController = require("../controllers/messageController");
const userController = require("../controllers/userController");

// Create
router.get('/create',userController.isAuth,messageController.get_create_messages);
router.post('/create',userController.isAuth);


// Update

// Delete


module.exports = router
