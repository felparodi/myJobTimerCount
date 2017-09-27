import * as types from '../actions/actionTypes';
import initialState from './initialState';

const sfdcUsersReducer = (state = initialState.sfdcUsers, action) => {
  switch (action.type) {
  	case types.GET_USERS: return action.users;
    default: return state;
  }
};

export default sfdcUsersReducer;