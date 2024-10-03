const express = require('express');
const gameController = require('../controllers/gamecontroller');
const methodOverride = require('method-override');

const router = express.Router();

//router.use(methodOverride('_method'));
// Use method override for delete.

router.delete('/delete/:id',gameController.game_delete)
router.get('/',gameController.game_home)
router.get('/create',gameController.create_game_get);

router.post('/',gameController.create_game_post);


module.exports = router;