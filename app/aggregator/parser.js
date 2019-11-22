const xml2js = require('xml2js');
const fs = require('fs').promises;

const SAFT_FOLDER = 'saf-t';

async function parseSAFT(fileName) {
  const data = await fs.readFile(`${__dirname}/${SAFT_FOLDER}/${fileName}`);
  const parsedData = await xml2js.parseStringPromise(data, { explicitArray : false });

  return parsedData;
}

module.exports = {
  parseSAFT
}
