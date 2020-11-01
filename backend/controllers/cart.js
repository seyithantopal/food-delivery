const Cart = require('../models/cartSchema');

exports.getAllCarts = (req, res, next) => {
	Cart.find()
		.then((comments) => {
			return res.json({ msg: 'Fetch successful', results: comments });
		})
		.catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

exports.createCart = (req, res, next) => {
	const newCart = new Cart(req.body);
	newCart
		.save()
		.then((result) =>
			res.status(201).json({ msg: 'Cart created', result: result }),
		)
		.catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

exports.getCartWithId = (req, res, next) => {
	const userId = req.query.userId;
	Cart.find({ userId })
		.then((cart) => {
			return res.json({ msg: 'Fetch successful', results: cart });
		})
		.catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

exports.deleteCart = (req, res, next) => {
	Cart.findOneAndDelete({ _id: req.query.id }, (err, cart) => {
		if (!cart) {
			res.json({ msg: 'There is no cart deleted' });
		} else {
			res.json({ msg: 'Cart deleted' });
		}
	});
};
