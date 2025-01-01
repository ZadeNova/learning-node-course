const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controller/userController");

// CRUD for users

// Create a new user
router.post("/createUser", userController.createUser);

// Read all users
router.get("/users", userController.getAllUsers);

// Read user
router.get("/:userId", userController.getUser);

// update a user
router.put("/:userId", userController.updateUser);

// Delete a user
router.delete("/:userId", userController.deleteUser);

// Login User
router.post("/login", userController.loginUser);

module.exports = router;
