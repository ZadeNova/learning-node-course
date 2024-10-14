const express = require("express");

const router = express.Router()
const messageController = require("../controllers/messageController");
const userController = require("../controllers/userController");

// Create
router.get('/create',userController.isAuth,userController.isAdmin,messageController.get_create_messages);
router.post('/create',userController.isAuth,userController.isAdmin,messageController.post_create_messages);


// Update

// Delete
router.delete('/delete/:id',userController.isAuth,userController.isAdmin,messageController.delete_messages);



module.exports = router
