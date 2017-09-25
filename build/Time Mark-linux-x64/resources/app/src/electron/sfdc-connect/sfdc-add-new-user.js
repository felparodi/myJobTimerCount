const { BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const sfdcInfo = require('./sfdc-oauth-info');

const openLoginPage = () => {
	var win = new BrowserWindow({ width: 800, height: 600 });
	win.loadURL(sfdcInfo.authorizeLink);
}

module.exports = {
	openLoginPage
}