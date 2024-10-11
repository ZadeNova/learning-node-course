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
require('./controllers/authentication');



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
