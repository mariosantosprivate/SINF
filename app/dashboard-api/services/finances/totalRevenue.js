const General = require('../../../common/models/generalLedgerEntries');

async function calculate(fiscalYear) {
  const general = await General.findOne({
    raw: true,
    where: {
      fiscalYear
    }
  });

  if (!general)
    throw new Error(
      `There is no general ledger information for the fiscal year ${fiscalYear}`
    );

  return parseFloat(general.totalCredit);
}

module.exports = calculate;
