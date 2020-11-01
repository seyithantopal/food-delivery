import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Alert from '../common/Alert';
import * as cartActions from '../../actions/cartActions';
import * as foodActions from '../../actions/foodActions';

import foodImg from '../../assets/images/popular/food-1.png';

const Cart = (props) => {
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

	const { carts, selectedFood, food } = props;

	useEffect(() => {
		props.actions.cartActions.loadCartById('5f91c46570cf285ac4e0519b');
		props.actions.foodActions.loadFood();
	}, []);

	const totalPrice = carts.reduce((prev, cur) => {
		return cur.food !== undefined ? prev + cur.food.price * cur.quantity : '';
	}, 0);

	const handleDeleteFood = (e) => {
		const { id } = e.target.dataset;
		props.actions.cartActions.deleteCart(id);
		setAlert({
			...alert,
			isOpen: true,
			message: 'Cart Deleted',
			type: 'success',
		});
	};

	return (
		<>
			<section className="section cart">
				<div className="cart-title">My Cart</div>
				<div className="cart-list">
					{carts.map((el) => (
						<div className="cart-item" key={el['_id']}>
							<div className="cart-item-image">
								<img src={foodImg} alt="food" />
							</div>
							<div className="cart-item-name">
								{el.food !== undefined ? el.food.name : ''}
							</div>
							<div className="cart-item-price">
								<span className="dollar-sign">$</span>
								{el.food !== undefined ? el.food.price * el.quantity : ''}
							</div>
							<div className="cart-item-delete-icon">
								<i
									onClick={(e) => {
										handleDeleteFood(e);
									}}
									className="far fa-trash-alt"
									data-id={el['_id']}
								/>
							</div>
						</div>
					))}
				</div>

				<div className="cart-order">
					<hr />
					<div className="order-list">
						<div>Discount</div>
						<div>
							<span className="dollar-sign">$</span>0.00
						</div>
					</div>
					<div className="order-list">
						<div>Total</div>
						<div>
							<span className="dollar-sign">$</span>
							{parseFloat(totalPrice).toFixed(2)}
						</div>
					</div>
					<button type="button" className="btn-secondary">
						Confirm Order
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

Cart.propTypes = {
	actions: PropTypes.oneOfType([PropTypes.object]).isRequired,
	carts: PropTypes.oneOfType([PropTypes.array]).isRequired,
	food: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

function mapStateToProps(state) {
	/* eslint-disable */
	const carts = !state.food.food
		? {}
		: state.carts.carts.map((cart) => {
				return {
					...cart,
					food: state.food.food.find((food) => food['_id'] === cart.foodId),
				};
		  });
	return {
		carts,
		food: state.food.food,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			foodActions: bindActionCreators(foodActions, dispatch),
			cartActions: bindActionCreators(cartActions, dispatch),
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
