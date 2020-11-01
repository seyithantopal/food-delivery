const User = require('../models/userSchema');

exports.getAllUsers = (req, res, next) => {
	User.find()
		.then((users) => {
			return res.json({ msg: 'Fetch successful', results: users });
		})
		.catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

exports.getUserWithId = (req, res, next) => {
	const id = req.query.id;
	User.find({ _id: id })
		.then((users) => {
			return res.json({ msg: 'Fetch successful', results: users });
		})
		.catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};
