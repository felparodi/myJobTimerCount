const sfdcOauthInfo = require('./sfdc-oauth-info');
const sfdcOauthGetToken = require('./sfdc-oauth-get-token');
const sfdcAddUser = require('./sfdc-add-new-user');
const sfdcGetUser = require('./sfdc-get-users');
const sfdcSendReport = require('./sfdc-send-report');


module.exports = {
	sfdcOauthInfo,
	sfdcOauthGetToken,
	sfdcAddUser,
	sfdcGetUser,
	sfdcSendReport
}