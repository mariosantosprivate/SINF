const db = require('./db');
require('./models');
const seeders = require('./seeders');

function run() {
  db.sync({force: true}).then(() => {
    seeders.runAll();
    db.close();
  });
}

module.exports = run;
