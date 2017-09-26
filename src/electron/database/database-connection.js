const { find, push, remove} = require("database-init");
const conection  = require('../connection');


conection.subcribe('find-database', (e, param) => {
	e.succes(find(param.dbname, param.filter));
});

module.exports = {
}