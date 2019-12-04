const SalesInvoice = require('../../../common/models/salesInvoice');

async function calculate(fiscalYear) {
  const salesInvoice = await SalesInvoice.findOne({
    raw: true,
    where: {
      fiscalYear,
    },
  });

  if (!salesInvoice) throw new Error(`There is no sales information for the fiscal year ${fiscalYear}`);

  return parseFloat(salesInvoice.totalCredit);
}

module.exports = calculate;
