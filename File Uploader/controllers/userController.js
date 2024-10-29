const express = require('express');
const moment = require('moment');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


async function get_signup(req,res){

    console.log(await prisma.userTable.findMany())
    res.render("../views/user/signup",{title: "Sign Up",messages:''});
}

async function post_signup(req,res){ 

    const {Email , Firstname , Lastname , password } = req.body
    console.log(Email)
    console.log(Firstname)
    console.log(Lastname)
    console.log(password)
    let user = await prisma.userTable.findFirst({where: {
        email: Email
    }});
    if (user){
        throw Error("User already exists!")
    }

    try{
        bcrypt.hash(password, 10, async(err, hashedpassword) => {
            if(err){
                console.error(err);
            }
            
            await prisma.userTable.create({
                data:{
                    email: Email,
                    name: `${Firstname} ${Lastname}`,
                    password: hashedpassword
                }
            });

            
        })

        res.redirect("/login");
    }catch(err){
        console.log(err);
    }

    


}

async function get_login(req,res){

    
    //console.log(user);
    // Hardcode the login because i dont want to keep typing

    const hardcode = true;
    if (hardcode){
        res.render("../views/user/login.ejs",{title: "Login",login:{name:"Zadediangelo@gmail.com",password:"apple"}});
    }


    //res.render("../views/user/login.ejs",{title: "Login"});
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