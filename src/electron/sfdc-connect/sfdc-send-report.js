const service = require('../service-connections');
const database = require('../database');
const conection  = require('../connection');
const POST_URL = '/services/data/v40.0/chatter/feed-elements'

const hourMinute = (timestap) => {
  const elapsed = Math.round(timestap / 1000);
  // This will give a number with one digit after the decimal dot (xx.x):
  let minute = Math.round(elapsed/60) % 60
  minute = minute < 10 ? '0'+minute : minute;
  const hour = Math.round(elapsed/3600)
  return `${hour}:${minute}`
}

const textReport = (report) => {
	let text = 'Report:\r\n';
	report.map((trak)=>{
		text += `Worked ${hourMinute(trak.elapsed)} on ${trak.value.category}\r\n`;
		if (trak.sub.length > 0) {
			text += 'Distributed\r\n';
			trak.sub.map((sub) =>{
				text += `${hourMinute(sub.elapsed)} on ${sub.value.category}\r\n`;
			})
		} 
		text += '\r\n';
	});
	return text;
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
	service.post(`${users[0].domain}${POST_URL}`, post, header).then(
		(resp) => e.success(resp)
	).catch(e.error)
});

module.exports = {

}