const express = require("express");
const router = express.Router()

// Create Post
router.post('/');

// Get all Posts
router.get('/posts');

// Get Post
router.get('/:postId');

// Update Post
router.put('/:postId');

// Delete Post
router.delete('/:postId');



module.exports = router;