const Invoice = require('../../../common/models/invoice');
const InvoiceLine = require('../../../common/models/invoiceLine');
const formatTop5 = require('../../utils/formatTop5');

async function calculate(fiscalYear) {
  const valuePerProduct = {};

  const invoiceLines = await InvoiceLine.findAll({
    raw: true,
    include: [{
      model: Invoice,
      where: { fiscal_year: fiscalYear },
    }],
  });

  for (const invoiceLine of invoiceLines) {
    if (!valuePerProduct[invoiceLine.product_code]) {
      valuePerProduct[invoiceLine.product_code] = 0;
    }

    valuePerProduct[invoiceLine.product_code] += parseFloat(invoiceLine.creditAmount);
  }

  return formatTop5(valuePerProduct);
}

module.exports = calculate;
