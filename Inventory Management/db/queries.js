const pool = require("./pool");
const moment = require('moment');

async function getAllGames() {

    // Handle and manipulate all the data.
    
    const { rows } = await pool.query("SELECT * FROM game");
    return rows;
}

async function insertGame(game){
    console.log(game);
    
    await pool.query(`INSERT INTO game (title,description,release_date,developer,genre) VALUES ('${game.name}', '${game.description}', '${moment(game.release_date).format('DD-MM-YYYY')}' , '${game.developer}' , '${game.genre.join(', ')}') `)
    
}

async function updateGame() {

}

async function deleteGame(id){
    
    await pool.query(`DELETE FROM game WHERE game."Game_ID" = '${id}'`);
    
}

async function getAllGenres(){
    const { rows } = await pool.query("SELECT * FROM genre");
    
    return rows;
}

async function insertGenre(genre){
    await pool.query(`INSERT INTO genre (genre_name) VALUES ('${genre.name}')`)
}

async function updateGenre(){

}

async function deleteGenre(){

}

async function insert_to_Game_Genre_table(game){

    

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

}