import * as types from '../actions/actionTypes';
import initialState from './initialState';

const commentsReducer = (state = initialState.comments, action) => {
	switch (action.type) {
		case types.BEGIN_API_CALL:
			return {
				...state,
				loading: true,
			};
		case types.LOAD_COMMENTS_BY_ID:
			// return { ...state, comments: [...action.payload] };
			return { ...state, comments: action.payload, loading: false };
		case types.CREATE_COMMENT:
			/* return {
				...state,
				comments: {
					...state.comments,
					comments: [...state.comments, action.payload],
				},
			}; */
			return {
				...state,
				loading: false,
				comments: [...state.comments, action.payload],
			};
		default:
			return state;
	}
};
export default commentsReducer;
