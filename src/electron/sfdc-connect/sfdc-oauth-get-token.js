const http = require("http");
const sfdcOauthInfo = require('./sfdc-oauth-info');
const database = require('../database');

const registerClient = (code) => {
	const config = {
		host: sfdcOauthInfo.domain,
		path: sfdcOauthInfo.getTokenUrl(code)
	}
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
	http.get(config, callback);
}

module.exports = {
	registerClient
}