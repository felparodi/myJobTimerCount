const service = require('../service-connections');
const database = require('../database');
const conection  = require('../connection');
const POST_URL = '/services/data/v40.0/chatter/feed-elements'

const textReport = (report) => {
	return JSON.stringify(report);
}

const createChaterPost = (userId, report) => {
	const text = textReport(report)
	return {
   		body : {
			messageSegments : [
			{
			type : 'Text',
			text : text 
			}]
       	},
   		feedElementType : 'FeedItem',
   		subjectId: userId
	}
}


conection.subcribe('post-user-report', (e, param) => {
	let users = database.find('sfdc-users', { _id: param.id });
	if (!users.length) {
		e.error('Not Exist User')
		return;
	};
	const post = createChaterPost(users[0].user.user_id, param.report);
	const header = { 'Authorization':`Bearer ${users[0].authToken}` }
	console.log(post);
	service.post(`${users[0].domain}${POST_URL}`, post, header).then(
		(resp) => e.success(resp)
	).catch(e.error)
});

module.exports = {

}