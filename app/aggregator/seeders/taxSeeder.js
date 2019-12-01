const jp = require('jsonpath');
const Tax = require('../../common/models/tax');

async function seed(data) {
  const taxTableEntries = jp.query(data, '$.auditFile.masterFiles.taxTable.taxTableEntry')[0];

  for (i in taxTableEntries) {
    const entry = taxTableEntries[i];
    
    await Tax.create({
      type: entry.taxType,
      countryRegion: entry.taxCountryRegion,
      code: entry.taxCode,
      description: entry.description,
      percentage: entry.taxPercentage
    });
  }
}

module.exports = {
  seed
}