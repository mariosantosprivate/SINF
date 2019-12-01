const db = require('../common/db');
require('../common/models');
const seeders = require('./seeders');

function run(fileNames) {
  db.sync({force: true}).then(() => {
    seeders.runAll(fileNames).then(() => {
      db.close();
    })
  });
}

module.exports = run;
