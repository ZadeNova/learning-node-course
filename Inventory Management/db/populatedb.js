const {Client} = require("pg");

// 3 Tables
// Games table
// Genre table
// Developer

//postgresql://postgres:apple@localhost:5432/InventoryManagementProject

const SQL = 
`
CREATE TABLE Game
(
    "ID" integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    title varchar(255) NOT NULL,
    description varchar(1000) NOT NULL,
    release_date date NOT NULL,
    developer varchar(100) NOT NULL,
    PRIMARY KEY ("ID")
);


INSERT INTO Game (title,description,release_date,developer) VALUES 
('Minecraft','A sandbox game', '18-Nov-2011', 'Mojang' );

`

const SQL2 = `
CREATE TABLE genre (
    "ID" integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    genre_name varchar(100) NOT NULL,
    PRIMARY KEY ("ID")


);

INSERT INTO Genre (genre_name) VALUES ('Survival'),('Action Adventure');
`

const SQL3 = `


CREATE TABLE game_genre (
    game_id INT ,
    genre_id INT ,
    PRIMARY KEY (game_genre_id),
);
`
const SQL4 = 
`
INSERT INTO game_genre (game_id,genre_id) VALUES ((SELECT "Game_ID" FROM game WHERE title = 'Minecraft'), (SELECT "Genre_ID" FROM genre WHERE genre_name = 'Survival'));

INSERT INTO game_genre (game_id,genre_id) VALUES ((SELECT "Game_ID" FROM game WHERE title = 'Minecraft'), (SELECT "Genre_ID" FROM genre WHERE genre_name = 'Action Adventure'));



`;



async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: 'postgresql://postgres:apple@localhost:5432/InventoryManagementProject'
    });
    await client.connect();
    await client.query(SQL4).then(res => {
        console.log("Queries executed successfully")
    }).catch(err => {
        console.error('Error executing query, ',err)
    });
    
    await client.end();
    console.log("Done");

}

main()