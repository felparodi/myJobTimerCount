const { find, push, remove} = require("./database-init");
const conection  = require('../connection');

conection.subcribe('find-database', (e, param) => {
	e.success(find(param.dbname, param.filter));
});

module.exports = {
}