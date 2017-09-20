import * as types from './actionTypes';

export const tickAction = () => {
  return {
    type: types.TIME_OUT_TRAKS
  };
};

export const addTrakAction = () => {
  return {
    type: types.ADD_TRAK
  };
};

export const stopTrakAction = (pos) => {
  return {
    type: types.STOP_TRAK,
    pos
  };
};

export const updateTrakAction = (pos, e) => {
  return {
    type: types.UPDATE_TRAK,
    pos,
    e
  };
};

export const addTrak = () => {
  return (dispatch) => {
     dispatch(addTrakAction());
  };
};

/**
export const cleanAdopters = () => {
  return (dispatch) => {
    dispatch(cleanAdoptersSuccess());
  };
};
*/