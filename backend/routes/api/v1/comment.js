const router = require('express').Router();

const CommentController = require('../../../controllers/comment');

router.get('/all', CommentController.getAllComments);
router.post('/create', CommentController.createComment);
router.get('/:id', CommentController.getCommentsWithId);
router.delete('/delete', CommentController.deleteComment);

module.exports = router;
