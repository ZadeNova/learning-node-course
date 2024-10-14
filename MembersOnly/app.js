const express = require('express');
const app = express();
const path = require('path');
app.use(express.urlencoded({extended: true}));

// Register View Engine
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next) => {
    res.locals.path = req.path;
    next();
})

// Libraries needed
const moment = require('moment');
app.locals.moment = moment;
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
require('./controllers/authentication');
const userController = require('./controllers/userController')
app.use(flash())

app.use(session({secret: "cats" , resave: false, saveUninitialized: false}));
app.use(passport.session());

app.listen('8080',() => console.log('Listening on port 8080'))

// DB
const db = require("./db/queries");
//Routes
const userRoutes = require('./routes/userRoutes')
const messagesRoutes = require('./routes/messageRoutes');



app.get('/',(req,res) => res.redirect('/index'));


app.use('/',userRoutes);
app.use('/messages',messagesRoutes)




app.get('/join-the-club',userController.isAuth,(req,res) => {

    res.render('jointheclub',{title: "Join the Club", errorMessage: ''})
})

app.post('/join-the-club',userController.isAuth,checkSecretCode,(req,res) => {
    console.log(req.body);
    res.redirect('/');
})

// Middleware for verifying if secret code is correct
async function checkSecretCode(req,res,next){

    const secretCode = req.body.secretcode
    const actualSecretCode = await db.getSecretCode();
    //console.log(actualSecretCode);
    //console.log(actualSecretCode[0].the_secret_code);
    if (secretCode === actualSecretCode[0].the_secret_code){
        // change member role for the user
        
        //res.local.sucess_message = req.flash('sucess_message','You have joined the club');
        db.change_membership_status(req.session.passport.user)
        next();
    }
    else{
        res.render('jointheclub', {title: 'Join the Club',errorMessage: 'Secret code is wrong!'})
    }

}
