const { BrowserWindow } = require('electron');
const sfdcInfo = require('./sfdc-oauth-info');
const conection  = require('../connection');

const openLoginPage = () => {
	var win = new BrowserWindow({ width: 800, height: 600, title:'Authorize'});
	win.loadURL(sfdcInfo.authorizeLink);
}

conection.subcribe('sfdc-add-new-user', (e) => {
	e.success(null);
	openLoginPage();
});

module.exports = {
	openLoginPage
}