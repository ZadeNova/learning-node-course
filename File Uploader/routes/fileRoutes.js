const express = require("express");
const userController = require("../controllers/userController");
const fileController = require("../controllers/fileController");
const middleware = require("../controllers/usefulmiddleware")
const passport = require("passport");
const router = express.Router()

const path = require("path");
const multer = require("multer");
// const storage = multer.diskStorage({
//     destination: path.join("/File Uploader/public/uploads"),
//     filename: function(req,file,cb){
//         cb(null, file.originalname)
//     }
// })
// const upload = multer({storage: storage});

// Create
router.post("/create",middleware.isAuth,fileController.uploadFile);

// Update
router.post("/edit/:id",middleware.isAuth,fileController.updateFile);

// Delete
router.delete("/delete/:id",middleware.isAuth,fileController.deleteFile);

// Get
router.get("/viewFile/:id",middleware.isAuth,fileController.getFile);


module.exports = router;
