const express = require('express');
const db = require("../db/queries");



async function genre_home(req, res){

    const genres = await db.getAllGenres();
    console.log(genres)
    res.render('../views/genrefiles/genre', {title: "View Genre", genres : genres});
}


async function create_genre_get(req, res){
    
    res.render('../views/genrefiles/creategenre', {title: "Create Genre"});
}


async function create_genre_post(req,res){
    //console.log('Hi this is the psot function')
    const genre = req.body
    db.insertGenre(genre);
    res.redirect('/genre');
}

module.exports = {
    genre_home,
    create_genre_get,
    create_genre_post,
}