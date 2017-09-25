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

export const removeTrakAction = (pos) => {
  return {
    type: types.REMOVE_TRAK,
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


export const  addSubTrakAction = (pos) => {
  return {
    type: types.ADD_SUB_TRAK,
    pos
  };
};

export const addTrak = () => {
  return (dispatch) => {
     dispatch(addTrakAction());
  };
};


export const stopTrak = (pos) => {
  return (dispatch) => {
     dispatch(stopTrakAction(pos));
  };
};


export const updateTrak = (pos, e) => {
  return (dispatch) => {
     dispatch(updateTrakAction(pos, e));
  };
};


export const removeTrak = (pos) => {
  return (dispatch) => {
     dispatch(removeTrakAction(pos));
  };
};

export const addSubTrak = (pos) => {
  return (dispatch) => {
     dispatch(addSubTrakAction(pos));
  };
};

export const tick = () => {
  return (dispatch) => {
     dispatch(tickAction());
  };
};
