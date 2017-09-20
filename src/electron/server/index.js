let express = require('express');
const action = require('../actions');

let app = express();

const serverInfo = {};

app.get('/aouth/sforce', (req, res) => {
  console.log(req);
  serverInfo.req = req;
  action.send('a','Conect');
  res.send('Hello World!');
});

app.listen(37259,  function () {
  serverInfo.prot = 37259;
  console.log('Example app listening on port 37259!');
});
