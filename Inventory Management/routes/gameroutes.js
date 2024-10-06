const express = require("express");
const gameController = require("../controllers/gamecontroller");
const methodOverride = require("method-override");

const router = express.Router();


// Delete
router.delete("/delete/:id", gameController.game_delete);

//Create and View
router.get("/", gameController.game_home);
router.get("/create", gameController.create_game_get);
router.post("/", gameController.create_game_post);

// Update
router.post("/updategame/:id",gameController.update_game_post);
router.get("/update/:id", gameController.game_update_get);



module.exports = router;
