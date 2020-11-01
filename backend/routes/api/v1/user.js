const router = require('express').Router();

const UserController = require('../../../controllers/user');

router.get('/all', UserController.getAllUsers);
router.get('/:id', UserController.getUserWithId);

module.exports = router;
