const express = require("express");

const router = express.Router()
const userController = require("../controllers/userController");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require('passport-local').Strategy;



router.get('/',userController.get_signup);
router.get('/signup',userController.get_signup);
router.post('/signup',userController.checkConfirmPassword,userController.post_signup);

router.get('/login',userController.get_login);
router.post('/login',passport.authenticate("local",{successRedirect:"/index",failureRedirect:"/login"}));


router.get('/logout',userController.get_logout);




router.get('/index', userController.isAuth ,userController.isAdmin,userController.get_index);

router.get('/index-public',userController.get_index_public);

module.exports = router