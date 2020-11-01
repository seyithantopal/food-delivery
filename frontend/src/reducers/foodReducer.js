import * as types from '../actions/actionTypes';

const initialState = {
	food: [],
	selectedFood: {},
	loading: false,
	filteredFood: [],
};

const foodReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.BEGIN_API_CALL:
			return {
				...state,
				// loading: true,
			};
		case types.LOAD_FOOD:
			return {
				...state,
				food: [...action.payload],
				filteredFood: [...action.payload],
				loading: false,
			};
		case types.LOAD_FOOD_BY_ID:
			// return state.filter((food) => food.id === parseInt(action.payload, 10));
			// return state.map((item) => (item.id === action.payload ? action.payload : item));
			// return [...state, ...action.payload];
			// return { ...state, selectedFood: { ...action.payload } };
			return { ...state, selectedFood: { ...action.payload }, loading: false };
		case types.CREATE_FOOD:
			return [...state, { ...action.payload }];
		case types.SEARCH_FOOD: {
			const filteredValues = state.food.filter((food) => {
				return food.name.toLowerCase().includes(action.payload);
			});
			return {
				...state,
				filteredFood: filteredValues,
			};
		}
		case types.FILTER_FOOD: {
			const filteredValues = state.food.filter((food) => {
				return food.category.toLowerCase().includes(action.payload);
			});
			return {
				...state,
				filteredFood: action.payload !== 'all' ? filteredValues : state.food,
			};
		}
		case types.LIKE_FOOD:
			return state;
		default:
			return state;
	}
};
export default foodReducer;
