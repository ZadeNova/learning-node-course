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
const LocalStrategy = require('passport-local').Strategy;

app.use(session({secret: "cats" , resave: false, saveUninitialized: false}));
app.use(passport.session());

app.listen("8080", () => console.log("Listening on port 8080"));

// Routes
const userRoutes = require("./routes/userRoute");
const folderRoutes = require("./routes/folderRoutes");

// Useful middleware
const middleware = require("./controllers/usefulmiddleware");
const { render } = require("ejs");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


// Setup global variable for breadcrumb



// Index is for login users
// Index public is for users that have not login.
app.get('/',(req,res) => res.redirect('/index-public'));

// Index controllers

async function get_index(req,res){
	let folderList;

	// This query only gets folders that are root folders. Root folders have no parentID and their parentID is null.

	try {
		folderList = await prisma.folderTable.findMany({
			where:{
				parentId:{
					equals: null,
				}
		}});
		
		console.log(folderList);
	}
	catch(err){
		console.error(err);
	}
	

	res.render("index",{title:"Home",folderList: folderList,folder_view: false});
}

async function get_index_public(req,res){
	res.render("index-public",{title:"Home",login_status: false});
}


app.get('/index', middleware.isAuth , get_index);
app.get('/index-public',get_index_public);

app.use('/',userRoutes);
app.use('/folder',folderRoutes);

// nOTES TO MYSELF
// use prisma client the same way we use db.[functions]
// Do a CRUD for a file and folder.
// Ensure that you have changed the databse url link when using laptop
// Ensure that u have created a database called FileUploader in laptop.


// Ensure that you can add folder and child folders.

// Notes to myself 29/10/2024
// Connect to supabase. 
// Learn about supabase and create a table for the file.
// Do CRUD for files.


