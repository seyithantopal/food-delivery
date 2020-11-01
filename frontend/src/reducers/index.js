import { combineReducers } from 'redux';
import foodReducer from './foodReducer';
import commentsReducer from './commentsReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
	food: foodReducer,
	comments: commentsReducer,
	users: userReducer,
	carts: cartReducer,
});

export default rootReducer;
