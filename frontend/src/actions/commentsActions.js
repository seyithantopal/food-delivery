import axios from 'axios';
import * as types from './actionTypes';
import * as apiStatus from './apiStatusActions';

export const loadCommentsById = (foodId) => {
	return (dispatch) => {
		dispatch(apiStatus.beginApiCall());
		axios
			.get('http://localhost:5000/api/v1/comment/:foodId', {
				params: { foodId },
			})
			.then((res) => {
				dispatch({
					type: types.LOAD_COMMENTS_BY_ID,
					payload: res.data.results,
				});
			});
	};
	/* return {
		type: types.LOAD_COMMENTS_BY_ID,
		payload: id,
	}; */
};

export const createComment = ({ userId, foodId, comment }) => {
	return (dispatch) => {
		dispatch(apiStatus.beginApiCall());
		axios
			.post(
				'http://localhost:5000/api/v1/comment/create',
				{
					userId,
					foodId,
					comment,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)
			.then((res) => {
				dispatch({
					type: types.CREATE_COMMENT,
					payload: res.data.result,
				});
			})
			.catch((error) => {
				dispatch(apiStatus.apiCallError(error));
				throw error;
			});
	};
};
