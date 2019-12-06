const SalesInvoice = require('../../../common/models/salesInvoice');
const NotFoundError = require('../../errors/NotFoundError');

async function calculate(fiscalYear) {
  const salesInvoice = await SalesInvoice.findOne({
    raw: true,
    where: {
      fiscalYear,
    },
  });

  if (!salesInvoice) throw new NotFoundError(`There is no sales information for the fiscal year ${fiscalYear}`);

  return parseFloat(salesInvoice.totalCredit);
}

module.exports = calculate;
