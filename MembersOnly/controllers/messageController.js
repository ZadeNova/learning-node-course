const express = require('express');
const db = require('../db/queries');
const moment = require('moment');


async function get_create_messages(req,res){



    res.render('../views/messages/createmessages.ejs',{title:"Create Message"});
}


async function post_create_messages(req,res){
    console.log(req.body);
    //console.log(moment().format('DD-MM-YYYY HH:mm:ss'))
    //console.log(req.session.passport.user);
    req.body.timestamp = moment().format('DD-MM-YYYY HH:mm:ss')
    req.body.createdby_user = req.session.passport.user;
    db.createMessages(req.body)
    res.redirect("/index");

}

async function delete_messages(req,res){
    console.log('hi im gonna delete u!')
    const id = req.params.id;
    db.deleteMessages(id)
}

module.exports = {
    get_create_messages,
    post_create_messages,
    delete_messages,
}