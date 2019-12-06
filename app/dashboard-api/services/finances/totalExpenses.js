const PaymentsInfo = require('../../../common/models/paymentsInfo');

async function calculate(fiscalYear) {
  const paymentsInfo = await PaymentsInfo.findOne({
    raw: true,
    where: {
      fiscalYear,
    },
  });

  if (!paymentsInfo) throw new Error(`There is no payment information for the fiscal year ${fiscalYear}`);

  return parseFloat(paymentsInfo.totalCredit);
}

module.exports = calculate;
