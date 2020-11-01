import axios from 'axios';
import * as types from './actionTypes';
import * as apiStatus from './apiStatusActions';

export const loadUsers = () => {
	return (dispatch) => {
		dispatch(apiStatus.beginApiCall());
		axios
			.get('http://localhost:5000/api/v1/user/all')
			.then((res) => {
				dispatch({ type: types.LOAD_USERS, payload: res.data.results });
			})
			.catch((error) => {
				dispatch(apiStatus.apiCallError(error));
				throw error;
			});
	};
};
