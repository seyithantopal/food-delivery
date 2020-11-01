const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
	foodId: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	comment: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;
