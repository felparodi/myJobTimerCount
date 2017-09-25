import * as types from '../actions/actionTypes';
import initialState from './initialState';

const appReducer = (state = initialState.app, action) => {
  switch (action.type) {
    case types.TRAKER_APP_OPEN: return 'TRAKER';
    case types.SALESFORCE_USERS_APP_OPEN: return 'SFDC-CONNECT';
    default: return state;
  }
};

export default appReducer;