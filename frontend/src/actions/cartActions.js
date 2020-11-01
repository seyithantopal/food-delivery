import axios from 'axios';
import * as types from './actionTypes';
import * as apiStatus from './apiStatusActions';

export const loadCartById = (userId) => {
	return (dispatch) => {
		dispatch(apiStatus.beginApiCall());
		axios
			.get('http://localhost:5000/api/v1/cart/:userId', {
				params: { userId },
			})
			.then((res) => {
				dispatch({
					type: types.LOAD_CART_BY_ID,
					payload: res.data.results,
				});
			})
			.catch((error) => {
				dispatch(apiStatus.apiCallError(error));
				throw error;
			});
	};
};

/* eslint-disable */
export const createCart = ({ userId, foodId, quantity, price }) => {
	return (dispatch) => {
		dispatch(apiStatus.beginApiCall());
		axios
			.post(
				'http://localhost:5000/api/v1/cart/create',
				{
					userId,
					foodId,
					quantity,
					price,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)
			.then((res) => {
				dispatch({
					type: types.CREATE_CART,
					payload: res.data.result,
				});
			})
			.catch((error) => {
				dispatch(apiStatus.apiCallError(error));
				throw error;
			});
	};
};

export const deleteCart = (id) => {
	return (dispatch) => {
		dispatch(apiStatus.beginApiCall());
		axios
			.delete(
				'http://localhost:5000/api/v1/cart/delete',
				{
					params: { id },
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)
			.then((res) => {
				dispatch({
					type: types.DELETE_CART,
					payload: id,
				});
			})
			.catch((error) => {
				dispatch(apiStatus.apiCallError(error));
				throw error;
			});
	};
};
