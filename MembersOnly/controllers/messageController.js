const express = require('express');
const db = require('../db/queries');
const moment = require('moment');


async function get_create_messages(req,res){



    res.render('../views/messages/createmessages.ejs',{title:"Create Message"});
}


async function post_create_messages(req,res){

}

async function delete_messages(req,res){

}

module.exports = {
    get_create_messages,
    post_create_messages,
    delete_messages,
}