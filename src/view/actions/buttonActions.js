import * as types from './actionTypes';

export const homeAppEvent = () => {
  return {
    type: types.HOME_APP_OPEN
  };
};

export const homeApp = () => {
  return (dispatch) => {
    dispatch(homeAppEvent());
  };
};
