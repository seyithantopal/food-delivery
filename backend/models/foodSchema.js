const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const likeSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const foodSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	about: {
		type: String,
		required: true,
	},
	rank: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	likes: [likeSchema],
	category: {
		type: String,
		required: false,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Food = mongoose.model('food', foodSchema);

module.exports = Food;
