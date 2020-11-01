import * as types from '../actions/actionTypes';
import initialState from './initialState';

const userReducer = (state = initialState.users, action) => {
	switch (action.type) {
		case types.BEGIN_API_CALL:
			return {
				...state,
				// loading: true,
			};
		case types.LOAD_USERS:
			return { ...state, users: action.payload, loading: false };
		default:
			return state;
	}
};
export default userReducer;
