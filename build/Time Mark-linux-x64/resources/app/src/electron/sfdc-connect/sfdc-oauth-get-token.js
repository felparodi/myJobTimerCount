const https = require("https");
const sfdcOauthInfo = require('./sfdc-oauth-info');
const database = require('../database');

const registerClient = (code) => {
	const callback = (response) => {
	  let str = ''
	  response.on('data', (chunk) => {
	    str += chunk;
	  });
	  response.on('end', () => {
	    console.log(str);
	    database.push('sfdc-client', str);
	  });
	}
	https.get( sfdcOauthInfo.getTokenUrl(code), callback);
}

module.exports = {
	registerClient
}