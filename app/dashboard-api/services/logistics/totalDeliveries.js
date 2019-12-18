const Invoice = require('../../../common/models/invoice');

async function calculate(fiscalYear) {
  const totalInvoices = await Invoice.count({
    where: {
      fiscal_year: fiscalYear,
    },
  });

  return totalInvoices;
}

module.exports = calculate;
