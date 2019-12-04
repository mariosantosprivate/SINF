require('dotenv').config();
const bootstrapDb = require('./bootstrapDb');
const saft = require('./saft');
const getToken = require('./requests/getToken');
const axios = require('./requests/axios');

const fileNames = process.argv.slice(2);

async function start() {
  saft.parseFiles(fileNames);

  console.log('Fetching Jasmin API token...');
  const token = await getToken();
  console.log('Obtained Jasmin API token.\n');

  axios.createInstance(token);

  await bootstrapDb(fileNames);
}

start();
