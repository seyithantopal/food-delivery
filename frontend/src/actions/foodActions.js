import axios from 'axios';
import * as types from './actionTypes';
import * as apiStatus from './apiStatusActions';

export const loadFood = () => {
	return async (dispatch) => {
		dispatch(apiStatus.beginApiCall());
		await axios
			.get('http://localhost:5000/api/v1/food/all')
			.then((res) => {
				dispatch({ type: types.LOAD_FOOD, payload: res.data.results });
			})
			.catch((error) => {
				dispatch(apiStatus.apiCallError(error));
				throw error;
			});
	};
};

export const loadFoodById = (id) => {
	return (dispatch) => {
		axios
			.get('http://localhost:5000/api/v1/food/:id', {
				params: { id },
			})
			.then((res) => {
				dispatch({ type: types.LOAD_FOOD_BY_ID, payload: res.data.results });
			});
	};
};

export const searchFood = (input) => {
	return {
		type: types.SEARCH_FOOD,
		payload: input,
	};
};

export const filterFood = (category) => {
	return {
		type: types.FILTER_FOOD,
		payload: category,
	};
};

export const likeFood = (id) => {
	return (dispatch) => {
		axios.post(`http://localhost:5000/api/v1/food/like/${id}`).then((res) => {
			dispatch({ type: types.LIKE_FOOD, payload: res.data.results });
		});
	};
};
