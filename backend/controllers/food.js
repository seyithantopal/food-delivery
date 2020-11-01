const Food = require('../models/foodSchema');

exports.getAllFood = (req, res, next) => {
	Food.find()
		.then((categories) => {
			return res.json({ msg: 'Fetch successful', results: categories });
		})
		.catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

exports.createFood = (req, res, next) => {
	const newFood = new Food(req.body);
	newFood
		.save()
		.then((result) =>
			res.status(201).json({ msg: 'Food created', result: result }),
		)
		.catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

exports.getFoodWithId = (req, res, next) => {
	const id = req.query.id;
	Food.findById({ _id: id })
		.then((categories) => {
			return res.json({ msg: 'Fetch successful', results: categories });
		})
		.catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

exports.updateFood = (req, res, next) => {
	Food.updateOne({ _id: req.body.id }, { $set: req.body }, (err, result) => {
		if (!result.n) res.json({ msg: 'There is no food updated' });
		else res.json({ msg: 'Food updated' });
	});
};

exports.deleteFood = (req, res, next) => {
	Food.findOneAndDelete({ _id: req.body.id }, (err, post) => {
		if (!post) {
			res.json({ msg: 'There is no food deleted' });
		} else {
			res.json({ msg: 'Food deleted' });
		}
	});
};

exports.likeFood = async (req, res, next) => {
	const id = req.params.id;
	const userId = '5f91c46570cf285ac4e0519b';
	Food.findById(id)
		.then((food) => {
			if (food.likes.filter((like) => like.userId === userId).length > 0) {
				Food.updateOne(
					{ 'likes.userId': userId },
					{ $pull: { likes: { userId: userId } } },
					(err, result) => {
						if (!result) console.log('There is no like updated');
						else console.log('Like Deleted');
					},
				);
				res.json({ msg: 'User already' });
			} else {
				food.likes.push({ userId: userId });
				food.save();
				res.json({ msg: 'Food liked' });
			}
		})
		.catch((err) =>
			res.status(404).json({ err: 'There is no food post to like' }),
		);
};
