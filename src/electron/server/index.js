const express = require('express');
const database = require('../database');

let app = express();

const serverInfo = {};

app.listen(37259,  function () {
  serverInfo.prot = 37259;
});

module.exports = {
	app,
	serverInfo
}