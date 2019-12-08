const HeaderData = require('../../common/models/headerData');

async function getFiscalYears() {
  const fiscalYears = [];

  const headerDatas = await HeaderData.findAll({
    raw: true,
  });

  for (const headerData of headerDatas) {
    fiscalYears.push(headerData.fiscalYear);
  }

  return fiscalYears;
}

module.exports = {
  getFiscalYears,
};
