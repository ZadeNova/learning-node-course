const { Pool } = require("pg");

module.exports = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'top_users',
    password: 'apple',
    port: 5432
});