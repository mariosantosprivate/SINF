const General = require('../../../common/models/generalLedgerEntries');

async function calculate(fiscalYear) {
  const General = await General.findOne({
    raw: true,
    where: {
      fiscalYear
    }
  });

  if (!General)
    throw new Error(
      `There is no general ledger information for the fiscal year ${fiscalYear}`
    );

  return parseFloat(General.totalDebit);
}

module.exports = calculate;
