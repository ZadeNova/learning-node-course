const express = require("express");
const app = express();
const path = require("path");
app.use(express.urlencoded({ extended: true }));

// Register view Engine
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
	res.locals.path = req.path;
	
	next();
});

// Libaries needed
const moment = require("moment");
app.locals.moment = moment;
const session = require("express-session");
const passport = require("passport");


app.use(session({secret: "cats" , resave: false, saveUninitialized: false}));
app.use(passport.session());

app.listen("8080", () => console.log("Listening on port 8080"));

// Routes
const userRoutes = require("./routes/userRoute");


// Useful middleware
const middleware = require("./controllers/usefulmiddleware");
const { render } = require("ejs");




// Index is for login users
// Index public is for users that have not login.
app.get('/',(req,res) => res.redirect('/index-public'));

// Index controller

async function get_index(req,res){
	res.render("index",{title:"Home"});
}

async function get_index_public(req,res){
	res.render("index-public",{title:"Home",login_status: false});
}

app.get('/index', middleware.isAuth , get_index);
app.get('/index-public',get_index_public);

app.use('/',userRoutes);


// nOTES TO MYSELF
// use prisma client the same way we use db.[functions]
// Do a CRUD for a file and folder.
// Ensure that you have changed the databse url link when using laptop
// Ensure that u have created a database called FileUploader in laptop.
// Find a way to store session in database?
