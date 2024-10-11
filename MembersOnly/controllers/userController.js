const express = require('express');
const db = require('../db/queries');
const moment = require('moment');
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require('passport-local').Strategy;

function get_signup(req,res){
    console.log('hi')
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
            req.body.role = 'normal'
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
    console.log('login page')
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

function get_index(req,res){
    //console.log(req.user);
    res.render('../views/index',{title: "Index",login_status: true});
}

// Auth middleware from tutorial

function isAuth(req,res,next){
    if (req.isAuthenticated()){
        next()
        console.log('authenticated!')
    }
    else{
        console.log("Not authenticated!")
        res.render('../views/index',{title: "Index", login_status: false});
    }
}

function isAdmin(req,res){

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
}