import * as types from './actionTypes';

export const sfdcInfoConnectionAction = (info) => {
  return {
    type: types.GET_SFDC_INFO,
    info
  };
};

export const addSfdcUser = () => {
  return () => {
  	window.connectionService.service('sfdc-add-new-user')
  };
};

