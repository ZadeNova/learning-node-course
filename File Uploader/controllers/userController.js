const express = require('express');
const moment = require('moment');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


function get_signup(req,res){


    res.render("../views/user/signup.ejs",{title: "Sign Up",messages:''});
}

async function post_signup(req,res){ 

    console.log(req.body);
    

}

function get_login(req,res){

    res.render("../views/user/login.ejs",{title: "Login"});
}

function get_logout(req,res){
    req.logout(function(err){
        if (err){
            return next(err);
            
        }
        res.redirect('/index')
    })
}

module.exports = {
    get_signup,
    post_signup,
    get_login,
    get_logout,
}