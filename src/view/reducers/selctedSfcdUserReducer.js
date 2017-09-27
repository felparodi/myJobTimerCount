import * as types from '../actions/actionTypes';
import initialState from './initialState';

const selctedSfcdUserReducer = (state = initialState.selctedSfcdUser, action) => {
  switch (action.type) {
  	case types.SELECT_USER: return action.user;
    default: return state;
  }
};

export default selctedSfcdUserReducer;