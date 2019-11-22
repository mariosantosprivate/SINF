const xml2js = require('xml2js');
const fs = require('fs');

const SAFT_FOLDER = 'saf-t';

function parseSAFT(fileName) {
  const data = fs.readFileSync(`${__dirname}/${SAFT_FOLDER}/${fileName}`);
  let parsedData;

  // this shouldn't always work but it does for some reason
  xml2js.parseString(data, (err, result) => {
    parsedData = result;
  });

  return parsedData;
}

module.exports = {
  parseSAFT
}
