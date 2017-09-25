const sfdcOauthInfo = require('./sfdc-oauth-info');
const sfdcOauthGetToken = require('./sfdc-oauth-get-token');
const conection  = require('../connection');
const server = require('../server');
const path = require("path");


conection.subcribe('get-oauth-connect-info', (e) => {
	e.success({ link: sfdcOauthInfo.authorizeLink });
});

server.app.get('/aouth/sforce', (req, res) => {
  console.log(req.query);
  res.sendFile(path.join(__dirname+'/sfdc-callback.html'));
  sfdcOauthGetToken.registerClient(req.query.code);
});

module.exports = {
	sfdcOauthInfo
}