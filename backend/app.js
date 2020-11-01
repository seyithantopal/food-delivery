const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
});

// Routers
const foodRouter = require('./routes/api/v1/food');
const commentRouter = require('./routes/api/v1/comment');
const userRouter = require('./routes/api/v1/user');
const cartRouter = require('./routes/api/v1/cart');

// Routes
app.use('/api/v1/food', foodRouter);
app.use('/api/v1/comment', commentRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/cart', cartRouter);

app.get('/hello', (req, res) => {
	res.send('hello');
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../frontend/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
	});
}

app.listen(port, () => console.log(`Server is running on ${port}`));
