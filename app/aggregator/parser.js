const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
const camelCase = require('camelcase');

const SAFT_FOLDER = 'saf-t';

function parseSAFT(fileName) {
  const data = fs.readFileSync(`${__dirname}/${SAFT_FOLDER}/${fileName}`);
  let parsedData;

  // this shouldn't always work but it does for some reason
  xml2js.parseString(data, {
    explicitArray: false,
    tagNameProcessors: [camelCase],
  }, (err, result) => {
    parsedData = result;
  });

  return parsedData;
}

function findFiles() {
  const files = fs.readdirSync(`${__dirname}/${SAFT_FOLDER}`).filter((file) => path.extname(file).toLowerCase() === '.xml');

  return files.map((fileName) => ({ name: fileName, data: null }));
}

module.exports = {
  parseSAFT,
  findFiles,
};
