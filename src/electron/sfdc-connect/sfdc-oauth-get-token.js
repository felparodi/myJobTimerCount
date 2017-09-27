const service = require('../service-connections');
const server = require('../server');
const sfdcOauthInfo = require('./sfdc-oauth-info');
const database = require('../database');
const conection  = require('../connection');
const path = require('path');

const registerClient = (code) => {
	
	const callback = (response) => {
	    response = database.push('sfdc-client-token', response);
	    addUser(response.id, response.access_token, response.instance_url,response._id)
	}

	service.get(sfdcOauthInfo.getTokenUrl(code)).then(callback);
}

const addUser = (idUser, authToken, domain, tokenId) => {
	const callback = (response) => {
		response = database.push('sfdc-users', { user:response, idUserLink:idUser, domain, tokenId, authToken });
		conection.send('new-user', true);
	}
	header = { 'Authorization':`Bearer ${authToken}` }
	service.get(idUser, header).then(callback).catch(console.log);
}


server.app.get('/aouth/sforce', (req, res) => {
  console.log(req.query);
  res.sendFile(path.join(__dirname+'/sfdc-callback.html'));
  registerClient(req.query.code);
});

module.exports = {
	registerClient
}