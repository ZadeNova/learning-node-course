const express = require("express");
const userController = require("../controllers/userController");
const middleware = require("../controllers/usefulmiddleware")
const passport = require("passport");
const router = express.Router()


router.get('/',userController.get_signup);
router.get('/signup',userController.get_signup);

router.post('/signup',middleware.checkConfirmPassword,userController.post_signup);


router.get('/login',userController.get_login);
router.post('/login',passport.authenticate("local",{successRedirect:"/index",failureRedirect:"/login"}));

router.get('/logout',userController.get_logout);




module.exports = router;