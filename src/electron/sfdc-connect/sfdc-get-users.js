const conection  = require('../connection');
const database = require('../database');

const maskUser = (dbuser) => {
	return {
		id: dbuser._id,
		name: dbuser.user.display_name,
		username: dbuser.user.username
	}
}

conection.subcribe('get-users', (e) => {
	let users = database.find('sfdc-users');
	let ret = users.map(maskUser);
	e.success(ret);
});

module.exports = {

}