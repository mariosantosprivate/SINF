const jp = require('jsonpath');
const Tax = require('../models/tax');

async function seed(data) {
  const taxTable = jp.query(data, '$.auditFile.masterFiles.taxTable')[0];

  for (i in taxTable) {
    const entry = taxTable[i].taxTableEntry;
    
    await Tax.create({
      type: entry.taxType,
      countryRegion: entry.taxCountryRegion,
      code: entry.taxCode,
      percentage: entry.taxPercentage
    });
  }
}

module.exports = {
  seed
}