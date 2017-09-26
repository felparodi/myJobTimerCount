import { combineReducers } from 'redux';
import traks from './traksReducer';
import app from './appReducer';
import sfdcInfo from './sfdcInfoReducer'
import selctedSfcdUser from './selctedSfcdUserReducer'
import sfdcUsers from './sfdcUsersReducer'

const rootReducer = combineReducers({
	traks,
	app,
	sfdcInfo,
	sfdcUsers,
	selctedSfcdUser
});

export default rootReducer;
