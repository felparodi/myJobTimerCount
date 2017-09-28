const _ = require("lodash");
const path = require("path");
let database = {};
const fs = require('fs-extra');
//Max Database 5MB
const buf = new Buffer(1024*1024*5);
const databaeFolder = path.join(__dirname,'../../..','database');
const databaePath = path.join(databaeFolder, 'database.json');

const createDatabase = () => {
  fs.ensureDirSync(databaeFolder);
  saveDatabase();
}

const saveDatabase =  () => {
  fs.writeFile(databaePath, JSON.stringify(database), 
      (err) => { 
        if(err) return console.error(err);
        console.log('Update Database');
      });
}

fs.open(databaePath, 'r+',(err, fd) => {
   if (err) {
      if(err.errno === -2) createDatabase();
      return console.error(err);

   }
   fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
      if (err){
         console.error(err);
      }
      // Print only read bytes to avoid junk.
      if(bytes > 0){
        let data = buf.slice(0, bytes).toString();
        data = JSON.parse(data);
        database = data;
      }
   });
});

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
  saveDatabase();
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
  saveDatabase();
  return removed;
}

module.exports = {
  find,
  push,
  remove
};
