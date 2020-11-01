import * as types from '../actions/actionTypes';
// import initialState from './initialState';

const initialState = {
	carts: [],
	loading: false,
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		/* case types.BEGIN_API_CALL:
			return {
				...state,
				loading: true,
			}; */
		case types.LOAD_CART_BY_ID:
			return { ...state, carts: [...action.payload], loading: false };

		case types.CREATE_CART:
			return {
				...state,
				loading: false,
				carts: [...state.carts, action.payload],
			};
		case types.DELETE_CART:
			return {
				...state,
				carts: state.carts.filter((cart) => cart['_id'] !== action.payload),
			};
		default:
			return state;
	}
};
export default cartReducer;
