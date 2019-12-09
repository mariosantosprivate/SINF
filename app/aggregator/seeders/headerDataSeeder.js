const HeaderData = require('../../common/models/headerData');

async function seed(data) {
  const headerData = data.auditFile.header;
  let currencyCode;

  if (typeof headerData.currencyCode === 'object') {
    currencyCode = headerData.currencyCode._;
  } else { currencyCode = headerData.currencyCode; }

  await HeaderData.create({
    fiscalYear: headerData.fiscalYear,
    companyName: headerData.companyName,
    startDate: headerData.startDate,
    endDate: headerData.endDate,
    currencyCode,
  });
}

module.exports = {
  seed,
};
