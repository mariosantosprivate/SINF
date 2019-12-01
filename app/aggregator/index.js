require('dotenv').config()
const bootstrapDb = require('./bootstrapDb');
const saft = require('./saft');

const fileNames = process.argv.slice(2);

saft.parseFiles(fileNames);
bootstrapDb(fileNames);
