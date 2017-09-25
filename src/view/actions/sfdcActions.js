import * as types from './actionTypes';

export const sfdcInfoConnectionAction = (info) => {
  return {
    type: types.GET_SFDC_INFO,
    info
  };
};

export const sfdcGetInfoConnect = () => {
  return (dispatch) => {
  	window.connectionService.service('get-oauth-connect-info').then(
      (req) => {
        dispatch(sfdcInfoConnectionAction(req));
      }
    );
  };
};
