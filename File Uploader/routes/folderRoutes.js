const express = require("express");
const userController = require("../controllers/userController");
const folderController = require("../controllers/folderController");
const middleware = require("../controllers/usefulmiddleware")
const passport = require("passport");
const router = express.Router()

// CREATE
router.post('/create',middleware.isAuth,folderController.create_folder);

// EDIT

router.post('/edit/:id',middleware.isAuth,folderController.update_folder);


// DELETE
router.delete('/delete/:id',middleware.isAuth,folderController.delete_folder);

// Get
router.get('/:id',middleware.isAuth,folderController.get_folder);
module.exports = router;