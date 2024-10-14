const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const db = require("../db/queries");
const bcrypt = require("bcryptjs/dist/bcrypt");


const customFields = {
    usernameField: 'Email',
}

async function verifyCallback(username, password, done) {
    //console.log(username)
    //console.log(password)
    try {
    const user = await db.checkUser_byUsername(username);
    //console.log(user)
    if(!user){
        return done(null, false, {messages: "Incorrect Username"});
    }

    const match = await bcrypt.compare(password, user.userpassword);
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
    done(null, user.username)
});

passport.deserializeUser(async (userId, done) => {
    try{
        //console.log(userId)
        const user = await db.checkUser_byUsername(userId);

        done(null, user)
    } catch(err){
        done(err);
    }
    
})



const strategy = new LocalStrategy(customFields,verifyCallback);




passport.use(strategy);





