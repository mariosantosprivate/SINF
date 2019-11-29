const jp = require('jsonpath')
const saft = require('../saft');

const seeders = {
  customerSeeder: require('./customerSeeder'),
  productSeeder: require('./productSeeder'),
  taxSeeder: require('./taxSeeder'),
  salesInvoiceSeeder: require('./salesInvoiceSeeder'),
  invoiceSeeder: require('./invoiceSeeder'),
  movementOfGoodsSeeder: require('./movementOfGoodsSeeder'),
  paymentsInfoSeeder: require('./paymentsInfoSeeder'),
}

async function runAll(fileNames) {
  // if a fileName isn't specified, then the seeders will
  // take data from all SAF-T files
  if (!fileNames || fileNames.length === 0) {
    for (file of saft.FILES) {
      console.log('Seeding with data from file ' + file.name)
      console.log('==============================================================================')

      for(seeder in seeders) {
        await seeders[seeder].seed(file.data);
        console.log('* Finished ' + seeder);
      }

      console.log('==============================================================================')
      console.log('Finished seeding with data from file ' + file.name)
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

      console.log('Seeding with data from file ' + fileName)
      console.log('==============================================================================')

      for(seeder in seeders) {
        await seeders[seeder].seed(file.data);
        console.log('* Finished ' + seeder);
      }
      
      console.log('==============================================================================')
      console.log('Finished seeding with data from file ' + fileName)
    }
  }
}

module.exports = {
  runAll
}
