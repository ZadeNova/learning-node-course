const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs/dist/bcrypt");
const LocalStrategy = require('passport-local').Strategy;
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

async function isAuth(req,res,next){
    if (req.isAuthenticated()){
        res.locals.login_status = true;
        res.locals.user = req.session.passport.user;

        next()
    }
    else{
        console.log('Not authenticated');

        res.locals.login_status = false;
        res.redirect('/index-public');
    }
}

function checkConfirmPassword(req,res,next){
    const {Email, Firstname , Lastname , confirmPassword , password} = req.body
    if(password === confirmPassword){
        next()
    }
    else{
        messages = {
            Email: Email,
            Firstname: Firstname,
            Lastname: Lastname,
            error: "Password is not matching!"
        }
        // req.flash('error', 'Passwords do not match');
        // req.flash('Email',Email);
        // req.flash('Firstname',Firstname);
        // req.flash('Lastname',Lastname);
        
        res.render('../views/user/signup.ejs',{title:"Sign up",messages: messages});
    }
}


// Breadcrumb middleware
// async function breadcrumb(req,res,next){

//     let breadCrumbs = []
//     console.log(req.originalUrl);
//     req.local.breadCrumb = breadCrumbs;
//     next()
// }

// Local Strategy
const customFields = {
    usernameField: 'Email',
}

async function verifyCallback(username, password, done) {
    //console.log(username)
    //console.log(password)
    try {
        const user = await prisma.userTable.findFirst({where:{email: username}})
    //console.log(user)
    if(!user){
        return done(null, false, {messages: "Incorrect Username"});
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match){
        return done(null, false, { message: "Incorrect Password"});
    }
    
    return done(null, user);
    }
    catch(err){
        done(err);
    }
}

passport.serializeUser((user, done) => {
    //console.log(user)
    done(null, user.id)
});

passport.deserializeUser(async (userId, done) => {
    try{
        //console.log(userId)
        
        const user = await prisma.userTable.findFirst({where:{id: userId}});
        done(null, user)
    } catch(err){
        done(err);
    }
    
})


const strategy = new LocalStrategy(customFields,verifyCallback);




passport.use(strategy);


module.exports = {
    isAuth,
    checkConfirmPassword,
}