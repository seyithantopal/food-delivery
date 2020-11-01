const router = require('express').Router();

const CartController = require('../../../controllers/cart');

router.get('/all', CartController.getAllCarts);
router.post('/create', CartController.createCart);
router.get('/:id', CartController.getCartWithId);
router.delete('/delete', CartController.deleteCart);

module.exports = router;
