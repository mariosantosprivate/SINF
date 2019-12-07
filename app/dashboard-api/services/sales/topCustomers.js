const Invoice = require('../../../common/models/invoice');
const formatTop5 = require('../../utils/formatTop5');

async function calculate(fiscalYear) {
  const valuePerCustomer = {};

  const invoices = await Invoice.findAll({
    raw: true,
    where: {
      fiscal_year: fiscalYear,
    },
  });

  for (const invoice of invoices) {
    if (!valuePerCustomer[invoice.customer_id]) {
      valuePerCustomer[invoice.customer_id] = 0;
    }

    valuePerCustomer[invoice.customer_id] += parseFloat(invoice.netTotal);
  }

  return formatTop5(valuePerCustomer);
}

module.exports = calculate;
