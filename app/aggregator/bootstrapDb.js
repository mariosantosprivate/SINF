const db = require('../common/db');
require('../common/models');
const seeders = require('./seeders');

async function run(fileNames) {
  await db.sync({ force: true });
  await seeders.runAll(fileNames);
  await db.close();
}

module.exports = run;
