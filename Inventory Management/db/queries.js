const pool = require("./pool");
const moment = require("moment");

async function getAllGames() {
	// Handle and manipulate all the data.

	const { rows } = await pool.query("SELECT * FROM game");
	return rows;
}

async function insertGame(game) {
	
	// determine if the game.genre is an array with 1 select option first.
	await pool.query(
		`INSERT INTO game (title,description,release_date,developer,genre) VALUES ('${
			game.name
		}', '${game.description}', '${moment(game.release_date).format(
			"DD-MM-YYYY"
		)}' , '${game.developer}' , '${
			Array.isArray(game.genre) ? game.genre.join(", ") : game.genre
		}') `
	);
}

async function get_GamebyID(id) {
	const uniqueGame = await pool.query(
		`SELECT * FROM game WHERE game."Game_ID" = '${id}'`
	);
	//console.log(uniqueGame.rows);

	return uniqueGame.rows[0];
}

async function updateGame(id,body) {
	await pool.query(`UPDATE game SET title = '${body.name}' , description = '${body.description}' , release_date = '${moment(body.release_date).format("DD-MM-YYYY")}' , developer = '${body.developer}' , genre = '${body.genre}' WHERE game."Game_ID" = '${id}'`);
}

async function deleteGame(id) {
	await pool.query(`DELETE FROM game WHERE game."Game_ID" = '${id}'`);
}

async function getAllGenres() {
	const { rows } = await pool.query("SELECT * FROM genre");

	return rows;
}

async function get_GenrebyID(id){
	const uniqueGenre = await pool.query(`SELECT * FROM genre WHERE genre."Genre_ID" = '${id}'`);
	return uniqueGenre.rows[0]
}

async function insertGenre(genre) {
	await pool.query(`INSERT INTO genre (genre_name) VALUES ('${genre.name}')`);
}

async function updateGenre(id,body) {
	await pool.query(`UPDATE genre SET genre_name = '${body.name}' WHERE genre."Genre_ID" = '${id}'`);
}

async function deleteGenre(id) {
	await pool.query(`DELETE FROM genre WHERE genre."Genre_ID" = '${id}'`);
}

async function insert_to_Game_Genre_table(game) {
	//await pool.query(`INSERT INTO game_genre (game_id,genre_id) VALUES ((SELECT game."Game_ID" FROM game WHERE title = '${game.name}'), (SELECT genre."Genre_ID" FROM genre WHERE genre_name = '${game.genre}'))`);
}

module.exports = {
	getAllGames,
	insertGame,
	updateGame,
	deleteGame,
	getAllGenres,
	insertGenre,
	updateGenre,
	deleteGenre,
	insert_to_Game_Genre_table,
	get_GamebyID,
	get_GenrebyID,
};
