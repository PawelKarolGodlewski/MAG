const express = require('express');
const router = express.Router();
const postsController = require('./postsController');

router.get('/', postsController.getAllPosts);
router.post('/', postsController.addPost);
router.delete('/:id', postsController.deletePost);

module.exports = router;
