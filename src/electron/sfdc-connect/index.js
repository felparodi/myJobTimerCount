const sfdcOauthInfo = require('./sfdc-oauth-info');
const sfdcOauthGetToken = require('./sfdc-oauth-get-token');
const sfdcAddUser = require('./sfdc-add-new-user');
require('./sfdc-get-users');
const conection  = require('../connection');
const server = require('../server');
const path = require("path");


conection.subcribe('get-oauth-connect-info', (e) => {
	e.success({ link: sfdcOauthInfo.authorizeLink });
});

conection.subcribe('sfdc-add-new-user', (e) => {
	e.success(null);
	sfdcAddUser.openLoginPage();
});

server.app.get('/aouth/sforce', (req, res) => {
  console.log(req.query);
  res.sendFile(path.join(__dirname+'/sfdc-callback.html'));
  sfdcOauthGetToken.registerClient(req.query.code);
});

module.exports = {
	sfdcOauthInfo
}