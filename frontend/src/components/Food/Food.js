import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Alert from '../common/Alert';
import * as foodActions from '../../actions/foodActions';
import * as commentsActions from '../../actions/commentsActions';
import * as userActions from '../../actions/userActions';
import * as cartActions from '../../actions/cartActions';

import Spinner from '../common/Spinner';

import popularFoodImg from '../../assets/images/popular/food-1.png';
import userImg from '../../assets/images/users/images.jpg';

const Food = (props) => {
	// Alert
	const [alert, setAlert] = useState({
		isOpen: false,
		message: '',
		type: '',
	});
	const changeStatus = () => {
		if (alert.isOpen) setAlert({ ...alert, isOpen: false });
		else setAlert({ ...alert, isOpen: true });
	};

	const { selectedFood, comments, match } = props;
	const { id } = match.params;

	const [comment, setComment] = useState('');
	const [quantity, setQuantity] = useState(1);

	const handleComment = (e) => {
		e.preventDefault();
		props.actions.commentsActions.createComment({
			foodId: id,
			userId: '5f91c46570cf285ac4e0519b',
			comment,
		});
		setComment('');
	};

	const handleCart = () => {
		props.actions.cartActions.createCart({
			foodId: id,
			userId: '5f91c46570cf285ac4e0519b',
			quantity,
		});
		setAlert({
			...alert,
			isOpen: true,
			message: 'Cart Added',
			type: 'success',
		});
	};

	useEffect(() => {
		props.actions.foodActions.loadFoodById(id);
		props.actions.commentsActions.loadCommentsById(id);
		props.actions.userActions.loadUsers();
	}, []);
	const { users } = props;
	const loading = users;

	return loading === true ? (
		<Spinner />
	) : (
		<>
			<section className="food-image">
				<img src={popularFoodImg} alt="food" />
			</section>

			<section className="food-rank">
				<div className="food-star">
					<i className="fas fa-star" />
					{selectedFood.rank}
				</div>
				<div className="food-heart">
					<i
						className={!selectedFood.liked ? 'far fa-heart' : 'fas fa-heart'}
					/>
				</div>
			</section>

			<section className="section price">
				<div className="price-price">
					<span className="dollar-sign">$</span>
					{selectedFood.price * quantity}
				</div>
				<div className="price-quantity">
					<span
						onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}
					>
						-
					</span>
					<span>{quantity}</span>
					<span onClick={() => setQuantity(quantity + 1)}>+</span>
				</div>
			</section>

			<section className="section about">
				<div className="about-title">About</div>
				<div className="about-description">{selectedFood.about}</div>
			</section>
			<section className="section comments">
				<div className="comments-title">Comments ({comments.length})</div>
				<div className="comments-comments">
					{comments.map((el) => (
						<div className="comment" key={el['_id']}>
							<div className="comment-photo">
								<img src={userImg} alt="food" />
							</div>
							<div className="comment-info">
								<div className="username">{el.userName}</div>
								<div className="date">June 1, 2020 9:00 AM</div>
								<div className="message">{el.comment}</div>
							</div>
						</div>
					))}
				</div>

				<form onSubmit={handleComment}>
					<div className="comments-send">
						<input
							type="text"
							placeholder="Write your comment here..."
							className="comment-box"
							onChange={(e) => setComment(e.target.value)}
							value={comment}
						/>
						<i className="fas fa-paper-plane" />
					</div>
				</form>
			</section>
			<section className="section cart">
				<div className="cart-button">
					<button onClick={handleCart} type="button" className="btn-secondary">
						Add to Cart
					</button>
				</div>
			</section>
			{alert.isOpen ? (
				<Alert
					type={alert.type}
					changeStatus={changeStatus}
					isOpen={alert.isOpen}
					message={alert.message}
				/>
			) : (
				''
			)}
		</>
	);
};

/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
Food.propTypes = {
	actions: PropTypes.oneOfType([PropTypes.object]).isRequired,
	selectedFood: PropTypes.oneOfType([PropTypes.object]).isRequired,
	comments: PropTypes.oneOfType([PropTypes.array]).isRequired,
	users: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

function mapStateToProps(state, ownProps) {
	// const { id } = ownProps.match.params;
	/* eslint-disable indent */
	/* eslint-disable no-mixed-spaces-and-tabs */
	const comments = !state.users.users
		? []
		: state.comments.comments.map((comment) => {
				return {
					...comment,
					userName: state.users.users.find((a) => a['_id'] === comment.userId)
						.name,
				};
		  });
	// console.log('OK!');
	return {
		selectedFood: state.food.selectedFood,
		// comments: state.comments,
		comments,
		users: state.users,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			foodActions: bindActionCreators(foodActions, dispatch),
			commentsActions: bindActionCreators(commentsActions, dispatch),
			userActions: bindActionCreators(userActions, dispatch),
			cartActions: bindActionCreators(cartActions, dispatch),
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Food);
