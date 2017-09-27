const { find, push, remove } = require('./database-init');
require('./database-connection');
module.exports = {
  find,
  push,
  remove
};
