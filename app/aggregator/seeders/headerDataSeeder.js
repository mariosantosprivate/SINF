const HeaderData = require('../../common/models/headerData');

async function seed(data) {
  const headerData = data.auditFile.header;

  await HeaderData.create({
    fiscalYear: headerData.fiscalYear,
    companyName: headerData.companyName,
    startDate: headerData.startDate,
    endDate: headerData.endDate,
    currencyCode: headerData.currencyCode,
  });
}

module.exports = {
  seed,
};
