const _ = require("lodash");
const database = {};

const makeid = (size = 25) => {
  let id = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < size; i++)
    id += possible.charAt(Math.floor(Math.random() * possible.length));

  return id;
};

const push = (name, record) => {
	record._id = makeid();
	if (!database[name])database[name] = [];
	database[name].push(record);
}

const find = (name, filter) => {
  return _.find(database[name], filter);
}

const remove = (name, filter) => {
  database[name] = _.reject(database[name], filter);
}

module.exports = {
  find,
  push,
  remove
};
