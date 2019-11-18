const db = require('./db');
require('./models')

function run() {
  db.sync({force: true});
}

module.exports = run;
