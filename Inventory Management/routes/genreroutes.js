const express = require("express");
const genreController = require("../controllers/genrecontroller");

const router = express.Router();



// Delete
router.delete("/delete/:id", genreController.delete_genre);

//Create and View
router.get("/", genreController.genre_home);
router.get("/create", genreController.create_genre_get);
router.post("/", genreController.create_genre_post);

// Update
router.get("/update/:id",genreController.genre_update_get);
router.post("/updategenre/:id",genreController.genre_update_post);

module.exports = router;
