const _ = require("lodash");
const database = {};
const fs = require('fs');

const makeid = (size = 25) => {
  let id = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < size; i++) {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return id;
};

const push = (name, record) => {
	record._id = makeid();
	if (!database[name])database[name] = [];
	database[name].push(record);
  return record;
}

const find = (name, filter) => {
  if(!database[name]) return [];
  if(!filter || filter === {}) return database[name];
  let ret = _.find(database[name], filter)
  if (_.isUndefined(ret)) return [];
  if (_.isArray(ret)) return ret;
  return [ret];
}

const remove = (name, filter) => {
  const removed = find(name, filter);
  database[name] = _.reject(database[name], filter);
  return removed;
}

module.exports = {
  find,
  push,
  remove
};
