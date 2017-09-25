const express = require('express');
const database = require('../database');
const path = require("path");

let app = express();

const serverInfo = {};

app.listen(37259,  function () {
  serverInfo.prot = 37259;
  console.log('Example app listening on port 37259!');
});

module.exports = {
	app,
	serverInfo
}