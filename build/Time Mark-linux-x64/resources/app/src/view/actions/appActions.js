import * as types from './actionTypes';

export const trakerAppEvent = () => {
  return {
    type: types.TRAKER_APP_OPEN
  };
};

export const salesforceAppEvent = () => {
  return {
    type: types.SALESFORCE_USERS_APP_OPEN
  };
};


export const trakerApp = () => {
  return (dispatch) => {
    dispatch(trakerAppEvent());
  };
};

export const salesforceApp = () => {
	return (dispatch) => {
		dispatch(salesforceAppEvent());
	}
}