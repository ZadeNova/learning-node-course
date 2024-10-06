const express = require("express");
const db = require("../db/queries");

async function genre_home(req, res) {
	const genres = await db.getAllGenres();
	console.log(genres);
	res.render("../views/genrefiles/genre", {
		title: "View Genre",
		genres: genres,
	});
}

async function create_genre_get(req, res) {
	res.render("../views/genrefiles/creategenre", { title: "Create Genre" });
}

async function create_genre_post(req, res) {
	
	const genre = req.body;
	db.insertGenre(genre);
	res.redirect("/genre");
}

async function genre_update_get(req,res){

	const uniqueGenre = await db.get_GenrebyID(req.params.id)
	
	res.render('../views/genrefiles/updategenre', {title: "Update Genre",uniqueGenre: uniqueGenre})
}

async function genre_update_post(req,res){
	db.updateGenre(req.params.id,req.body)
	
	res.redirect("/genre");
}

async function delete_genre(req, res) {
	const id = req.params.id;
	db.deleteGenre(id);
}

module.exports = {
	genre_home,
	create_genre_get,
	create_genre_post,
	delete_genre,
	genre_update_post,
	genre_update_get,
};
