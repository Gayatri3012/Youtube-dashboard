// routes/comments.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');

router.get('/:videoId', commentController.getComments);
router.post('/', commentController.addComment);
router.post('/reply', commentController.replyToComment);
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
