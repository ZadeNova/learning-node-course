const express = require("express");
const router = express.Router()

// Create Comments
router.post('/');

// Get all comments
router.get('/comments')

// Get comment
router.get('/:commentId');

// Update comment
router.put('/:commentId');

// Delete comment
router.delete('/:commentId')


module.exports = router;