const express = require('express');
const app = express();
const path = require('path');
app.use(express.urlencoded({extended: true}));

// Register View Engine
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next) => {
    res.locals.path = req.path;
    next();
})

// Libraries needed
const moment = require('moment');
app.locals.moment = moment;
//const methodOverride = require('method-override');
//app.use(methodOverride('_method'));


app.listen('8080',() => console.log('Listening on port 8080'))

// Handle DB


// Routes
const gameRoutes = require('./routes/gameroutes');
const genreRoutes = require('./routes/genreroutes');



app.get('/',(req , res) => {
    res.render('index',{title: "Home"})
})



app.use('/game',gameRoutes);
app.use('/genre',genreRoutes);