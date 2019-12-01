require('dotenv').config()
const bootstrapDb = require('./bootstrapDb');
const saft = require('./saft');
const getToken = require('./requests/getToken');

const fileNames = process.argv.slice(2);

async function start() {
  saft.parseFiles(fileNames);

  console.log('Fetching Jasmin API token...');
  await getToken();
  console.log('==============================================================================')
  console.log('* Obtained Jasmin API token.');
  console.log('==============================================================================')
  console.log('Jasmin API token has been saved in tokenStorage module\n');

  await bootstrapDb(fileNames);
}

start();
