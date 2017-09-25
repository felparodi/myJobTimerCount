import { combineReducers } from 'redux';
import traks from './traksReducer';
import app from './appReducer';
import sfdcInfo from './sfdcInfoReducer'

const rootReducer = combineReducers({
	traks,
	app,
	sfdcInfo
});

export default rootReducer;
