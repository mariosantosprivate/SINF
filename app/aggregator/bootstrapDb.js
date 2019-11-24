const db = require('./db');
require('./models');
const seeders = require('./seeders');

function run(fileNames) {
  db.sync({force: true}).then(() => {
    seeders.runAll(fileNames).then(() => {
      db.close();
    })
  });
}

module.exports = run;
