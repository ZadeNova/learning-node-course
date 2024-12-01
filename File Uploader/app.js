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


// Multer for file uplaods

const multer = require("multer");
const storage = multer.diskStorage({
    destination: path.join(__dirname,"\\public\\uploads"),
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage});
app.use(multer({storage}).single("fileUpload"));


app.use(session({secret: "cats" , resave: false, saveUninitialized: false}));
app.use(passport.session());

app.listen("8080", () => console.log("Listening on port 8080"));

// Routes
const userRoutes = require("./routes/userRoute");
const folderRoutes = require("./routes/folderRoutes");
const fileRoutes = require("./routes/fileRoutes")

// Useful middleware
const middleware = require("./controllers/usefulmiddleware");
const { render } = require("ejs");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


// Cloudinary
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dsj8ktewz',
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
    secure: true,
    
})





// Index is for login users
// Index public is for users that have not login.
app.get('/',(req,res) => res.redirect('/index-public'));

// Index controllers

async function get_index(req,res){
	let folderList = [];
	let fileList = [];
	// This query only gets folders that are root folders. Root folders have no parentID and their parentID is null.
	// Now add query to get files with no parent folders.


	try {
		folderList = await prisma.folderTable.findMany({
			where:{
				parentId:{
					equals: null,
				}
		}});
		
		fileList = await prisma.fileTable.findMany({
			where:{
				folderID:{
					equals: null,
				}
			}
		})

		for (let i = 0; i < fileList.length; i++){
			fileList[i].filedownloadURL = cloudinary.url(extractFileName(fileList[i].file_url),{flags:'attachment'});
		}
		console.log(folderList);
	}
	catch(err){
		console.error(err);
	}
	

	res.render("index",{title:"Home",folderList: folderList,folder_view: false,fileList: fileList});
}

async function get_index_public(req,res){
	res.render("index-public",{title:"Home",login_status: false});
}

// This function extracts the cloudinary public file name. The name will be without the file extension.
function extractFileName(url){


    const startIndex = url.lastIndexOf("/") + 1;

    const endIndex = url.length;
    const nameWithFileExtension = url.substring(startIndex,endIndex);
    


    return nameWithFileExtension.substring(0,nameWithFileExtension.indexOf("."))


}

app.get('/index', middleware.isAuth , get_index);
app.get('/index-public',get_index_public);



app.use('/',userRoutes);
app.use('/folder',folderRoutes);
app.use('/file',fileRoutes);
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


// Notes to myself 5/11/2024
// Add edit and delete button for individual file
// Add folderview to list down all files. 
// Allow user to click into file to view image.
// Settle read , update and delete for files.


// 27/11/2024
// Files can be listed in folder and index view.
// Now need to add edit and delete button. DELETE HAS BEEN SOLVED. Edit file name has been solved. Now need to fix for inside folder. Inside folder has been fixed.
// Also need to allow user to click into file to view image [ Done ]


// Project has been completed. Following the odin project guidelines. 
// Only thing not yet completed is the share function.
