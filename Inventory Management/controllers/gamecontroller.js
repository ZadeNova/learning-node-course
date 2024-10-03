const express = require('express');
const db = require("../db/queries");


async function game_home(req , res){
    const games = await db.getAllGames();
    //console.log(games);
   

    res.render('../views/gamefiles/game', {title: "View Games", games: games});
}

async function create_game_get(req , res){
    const genres = await db.getAllGenres();
    
    res.render('../views/gamefiles/creategame',{title:"Create Game", genres:genres});
}

async function create_game_post(req , res){
    const game  = req.body;
    //console.log(req.body);
    //console.log(game);
    //console.log("POST CONTROLLER HERE")

    db.insertGame(game);
   
    res.redirect("/game")
}

const game_delete = (req , res) => {
    const id = req.params.id;
    console.log('hi guys');
    db.deleteGame(id);
    res.redirect('/game')

    
}

module.exports = {
    game_home,
    create_game_get,
    create_game_post,
    game_delete
}