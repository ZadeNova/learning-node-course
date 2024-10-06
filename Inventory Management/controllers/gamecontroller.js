const express = require("express");
const db = require("../db/queries");
const moment = require('moment');

async function game_home(req, res) {
	const games = await db.getAllGames();
	//console.log(games);

	res.render("../views/gamefiles/game", { title: "View Games", games: games });
}

async function create_game_get(req, res) {
	const genres = await db.getAllGenres();

	res.render("../views/gamefiles/creategame", {
		title: "Create Game",
		genres: genres,
	});
}

async function game_update_get(req, res) {
	const genres = await db.getAllGenres();
	const uniqueGame = await db.get_GamebyID(req.params.id);
	// get the unique games genre value
	
	// unique game genre must be split into an array for the select option logic to work at updategame.ejs
	// unique game date must be formatted to ensure that the datepicker is able to accept the value
	//console.log(uniqueGame)
	res.render("../views/gamefiles/updategame", {
		title: "Update Game",
		genres: genres,
		uniqueGame: uniqueGame,
		uniqueGame_genre: uniqueGame.genre.split(', '),
		uniqueGame_date: moment(uniqueGame.release_date).format('YYYY-MM-DD'),
	});
}


async function update_game_post(req,res) {
	
	//console.log(req.body);
	db.updateGame(req.params.id,req.body)
	res.redirect("/game");
}

async function create_game_post(req, res) {
	const game = req.body;

	//console.log(game);

	
	db.insertGame(game);

	res.redirect("/game");
}

const game_delete = (req, res) => {
	const id = req.params.id;
	db.deleteGame(id);
};

module.exports = {
	game_home,
	create_game_get,
	create_game_post,
	game_delete,
	game_update_get,
	update_game_post,
};
