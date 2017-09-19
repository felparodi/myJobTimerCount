let express = require('express');
let app = express();
const serverInfo = {};

app.get('/aouth/sforce', (req, res) => {
  console.log(req);
  serverInfo.req = req;
  res.send('Hello World!');
});

app.listen(37259,  function () {
  serverInfo.prot = 37259;
  console.log('Example app listening on port 37259!');
});
