const router = require('express').Router();

const FoodController = require('../../../controllers/food');

router.post('/create', FoodController.createFood);
router.get('/all', FoodController.getAllFood);
router.get('/:id', FoodController.getFoodWithId);
router.put('/update', FoodController.updateFood);
router.delete('/delete', FoodController.deleteFood);
router.post('/like/:id', FoodController.likeFood);

module.exports = router;
