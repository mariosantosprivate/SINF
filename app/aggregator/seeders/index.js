const jp = require('jsonpath')
const saft = require('../saft');

const seeders = {
  customerSeeder: require('./customerSeeder')
}

async function runAll(fileNames) {
  // if a fileName isn't specified, then the seeders will
  // take data from all SAF-T files
  if (!fileNames || fileNames.length === 0) {
    for (file of saft.FILES) {
      for(seeder in seeders) {
        await seeders[seeder].seed(file.data);
      }
    }
  // if at least one fileName is specified, the seeders will only
  // take data from the files that matche each fileName in fileNames
  } else {
    for (fileName of fileNames) {
      const file = jp.query(saft.FILES, `$[?(@.name=="${fileName}")]`)[0];
      if (!file) {
        console.error('File ' + fileName + ' not found. Aborted seeding.');
        return;
      }
      for(seeder in seeders) {
        await seeders[seeder].seed(file.data);
      }
    }
  }
}

module.exports = {
  runAll
}
