const express = require('express');
const db = require('../db/queries');
const moment = require('moment');
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require('passport-local').Strategy;

function get_signup(req,res){
    //console.log('hi')
    res.render("signup",{title: "Sign Up",messages:''});
}

async function post_signup(req,res){
    
    // If sign up passes redirect to login
    
    try {
        bcrypt.hash(req.body.password, 10 ,async(err , hashedPassword) => {
            if(err){
                console.error(err)
            }
            req.body.password = hashedPassword

            // add new fields for membership and user role first
            req.body.role = 'isAdmin' in req.body ? 'Admin' : 'normal';
            req.body.Membership_status = 'Non-member'
            
            db.create_user(req.body);
        })

        res.redirect("/login");
    }catch(err){
        console.log(err);
    }
    
}

// Custom validator for user Controller
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
        
        res.render('signup',{title:"Sign up",messages: messages});
    }

}

function get_login(req,res){
    
    res.render("../views/login.ejs",{title: "Login"});
}

// async function post_login(req,res){
    // console.log('post handler!')
    // console.log(req.body);
    // // passport.authenticate('local',{failureRedirect: '/login'}, (err,user,info) => {
        // console.log(user)
        // console.log(info)
        // console.log(err)
    // })
// }



function get_logout(req,res){
    req.logout(function(err){
        if (err) {
            return next(err);
        }
        res.redirect('/index')
        //console.log(req.session)
        //console.log(req.user) 
    });
    
}

async function get_index(req,res){
    //console.log(req.user);

    const msgs  = await db.get_allMessages();
    console.log('hies')
    console.log(msgs);
    console.log('hiaawdawdawdawd')
    res.render('../views/index',{title: "Index",messages:msgs});
}

async function get_index_public(req,res){
    const msgs  = await db.get_allMessages();
    console.log(msgs)
    res.render('../views/index-public',{title:"Index",login_status: false,messages:msgs});
}
// Auth middleware from tutorial

async function isAuth(req,res,next){
    if (req.isAuthenticated()){
        res.locals.login_status = true;
        res.locals.user = req.session.passport.user;
        res.locals.isMember = await db.checkMembershipStatus(req.session.passport.user);
        console.log('authenticated!')
        next()
        
    }
    else{
        console.log("Not authenticated!")

        // Find a way to redirect to /index. Cause res.render doesnt activate the index controller
        // Basically find a way to execute the index controller when user is not logged in.
        res.redirect('/index-public');
        //res.redirect('/index');
        //res.render('../views/index',{title: "Index", login_status: false});
    }
}

async function isAdmin(req,res,next){

    const result = await db.checkIfAdmin(req.session.passport.user);
    if (result){
        res.locals.isAdmin = true;
        next()
    }
    else{
        res.locals.isAdmin = false;
        next()
    }

}

module.exports = {
    get_signup,
    post_signup,
    get_login,
    //post_login,
    get_index,
    get_logout,
    isAuth,
    checkConfirmPassword,
    get_index_public,
    isAdmin,
}