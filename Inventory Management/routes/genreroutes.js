const express = require('express');
const genreController = require('../controllers/genrecontroller');

const router = express.Router();

router.get('/',genreController.genre_home);
router.get('/create',genreController.create_genre_get);
// router.get('/delete');
router.post('/',genreController.create_genre_post);
// router.delete('/')


module.exports = router;