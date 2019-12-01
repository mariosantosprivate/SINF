const db = require('../common/db');
require('../common/models');
const seeders = require('./seeders');

async function run(fileNames) {
  await db.sync({force: true});
  await seeders.runAllSaft(fileNames);
  await db.close();
}

module.exports = run;
