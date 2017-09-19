import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

console.log(routerReducer)
const rootReducer = combineReducers({
	routing: routerReducer
});

export default rootReducer;
