import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as foodActions from '../../actions/foodActions';

import foodImg from '../../assets/images/popular/food-1.png';
import allImg from '../../assets/images/categories/all.png';
import mealImg from '../../assets/images/categories/meal.png';
import dessertImg from '../../assets/images/categories/dessert.png';
import drinkImg from '../../assets/images/categories/drink.png';

const Home = (props) => {
	const { food, filteredFood } = props;
	useEffect(() => {
		props.actions.loadFood();
	}, []);

	const handleLikeAndSave = (event, item) => {
		if (event.target.classList.contains('far')) {
			event.target.classList.remove('far');
			event.target.classList.add('fas', 'checked');
		} else if (event.target.classList.contains('fas')) {
			event.target.classList.remove('fas', 'checked');
			event.target.classList.add('far');
		}
		props.actions.likeFood(item['_id']);
	};

	return (
		<>
			<section className="section hero">
				<p>
					Food
					<br />
					<strong>Delivery</strong>
				</p>

				<div className="searchbox">
					<input
						onChange={(e) => props.actions.searchFood(e.target.value)}
						type="text"
						placeholder="Search..."
						className="search"
					/>
					<i className="fas fa-search" />
				</div>
			</section>

			<section className="section category">
				<div className="category-title">Categories</div>
				<div className="category-list">
					<div
						onClick={(e) => {
							props.actions.filterFood('all');
						}}
					>
						<div className="item">
							<img src={allImg} alt="meal" />
							<span>All</span>
						</div>
					</div>

					<div
						onClick={(e) => {
							props.actions.filterFood('meal');
						}}
					>
						<div className="item">
							<img src={mealImg} alt="meal" />
							<span>Meal</span>
						</div>
					</div>

					<div
						onClick={(e) => {
							props.actions.filterFood('dessert');
						}}
					>
						<div className="item">
							<img src={dessertImg} alt="dessert" />
							<span>Dessert</span>
						</div>
					</div>

					<div
						onClick={(e) => {
							props.actions.filterFood('drink');
						}}
					>
						<div className="item">
							<img src={drinkImg} alt="drink" />
							<span>Drink</span>
						</div>
					</div>
				</div>
			</section>

			<section className="section popular">
				<div className="popular-title">Popular</div>
				<div className="popular-list">
					{filteredFood.length === 0 ? (
						<h1>There is no record</h1>
					) : (
						filteredFood.map((el) => (
							<div className="item" key={el['_id']}>
								<img src={foodImg} alt="food" />
								<div className="info">
									<div className="left">
										<Link to={`/food/${el['_id']}`}>
											<div className="popular-name">{el.name}</div>
										</Link>
										<div className="popular-popularity">
											<i className="fas fa-star" />
											{el.rank}
										</div>
										<div className="popular-cost">
											$<span>{el.price}</span>
										</div>
									</div>
									<div className="right">
										<i
											onClick={(e) => {
												handleLikeAndSave(e, el);
											}}
											className={
												el.likes.filter(
													(item) => item.userId === '5f91c46570cf285ac4e0519b',
												).length > 0
													? 'fas fa-heart checked'
													: 'far fa-heart'
											}
										/>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</section>
		</>
	);
};

Home.propTypes = {
	actions: PropTypes.oneOfType([PropTypes.object]).isRequired,
	food: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

function mapStateToProps(state) {
	return {
		food: state.food.food,
		filteredFood: state.food.filteredFood,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(foodActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
