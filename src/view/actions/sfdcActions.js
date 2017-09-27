import * as types from './actionTypes';

export const sfdcInfoConnectionAction = (info) => {
  return {
    type: types.GET_SFDC_INFO,
    info
  };
};

export const sfdcGetUsersAction = (users) => {
  return {
    type: types.GET_USERS,
    users
  };
};

export const sfdcSelectUserAction = (user) => {
  return {
    type: types.SELECT_USER,
    user
  };
};

export const addSfdcUser = () => {
  return () => {
  	window.connectionService.service('sfdc-add-new-user')
  };
};

export const getUsers = () => {
	return (dispatch) => {
		window.connectionService.service('get-users').then(
			(users) => {
				dispatch(sfdcGetUsersAction(users));
			})
	};
};

export const selectUser = (user) => {
	return (dispatch) => {
		dispatch(sfdcSelectUserAction(user));
	};
};


export const sendReport = (userId, report) => {
  return () => {
  	window.connectionService.service('post-user-report', { id:userId, report });
  };
};

