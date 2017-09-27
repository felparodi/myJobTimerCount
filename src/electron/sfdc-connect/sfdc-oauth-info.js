const domain = 'https://login.salesforce.com';
const conection  = require('../connection');

const authorize = '/services/oauth2/authorize?response_type=code';
const token = '/services/oauth2/token?grant_type=authorization_code'
const consumerKey = '3MVG9g9rbsTkKnAXZhoZl0X94zw4LamYVowluBzxqgeaqBqgFBCjUx.gguCrM5z5qWpzjnJ1wqCw8KJPNZDx4';
const callback = 'http://localhost:37259/aouth/sforce';
const callbackEncode = encodeURIComponent(callback);
const scecretCode = '4625115979329128737';
const authorizeLink = `${domain}${authorize}&client_id=${consumerKey}&redirect_uri=${callbackEncode}`;
const getTokenUrl = (code) =>{
	return `${domain}${token}&client_id=${consumerKey}&redirect_uri=${callbackEncode}&code=${code}&client_secret=${scecretCode}`;
} 


conection.subcribe('get-oauth-connect-info', (e) => {
	e.success({ link: authorizeLink });
});

module.exports = {
  domain,
  consumerKey,
  callback,
  callbackEncode,
  authorizeLink,
  getTokenUrl
}