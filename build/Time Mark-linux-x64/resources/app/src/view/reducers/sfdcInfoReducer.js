import * as types from '../actions/actionTypes';
import initialState from './initialState';

const sfdcInfoReducer = (state = initialState.sfdcInfo, action) => {
  switch (action.type) {
    case types.GET_SFDC_INFO: return action.info;
    default: return state;
  }
};

export default sfdcInfoReducer;