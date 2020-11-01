const Comment = require('../models/commentSchema');

exports.getAllComments = (req, res, next) => {
	Comment.find()
		.then((comments) => {
			return res.json({ msg: 'Fetch successful', results: comments });
		})
		.catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

exports.createComment = (req, res, next) => {
	const newComment = new Comment(req.body);
	newComment
		.save()
		.then((result) =>
			res.status(201).json({ msg: 'Comment created', result: result }),
		)
		.catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

exports.getCommentsWithId = (req, res, next) => {
	const foodId = req.query.foodId;
	Comment.find({ foodId })
		.then((comments) => {
			return res.json({ msg: 'Fetch successful', results: comments });
		})
		.catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

exports.deleteComment = (req, res, next) => {
	Comment.findOneAndDelete({ _id: req.body.id }, (err, comment) => {
		if (!comment) {
			res.json({ msg: 'There is no comment deleted' });
		} else {
			res.json({ msg: 'Comment deleted' });
		}
	});
};
