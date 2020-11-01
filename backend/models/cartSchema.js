const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
	foodId: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	/* price: {
		type: Number,
		required: true,
	}, */
	date: {
		type: Date,
		default: Date.now,
	},
});

const Cart = mongoose.model('carts', cartSchema);

module.exports = Cart;
