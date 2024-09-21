// Handle all the imports

const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));

const userRoutes = require('./routes/userRoutes');

// Register View Engine
app.set('view engine','ejs')


app.listen('8080',() => console.log('Listening on port 8080'));

// Handle DB
const db = require('./db/queries');

app.use(userRoutes);