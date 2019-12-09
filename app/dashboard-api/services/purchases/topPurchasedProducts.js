const PurchaseInvoice = require('../../../common/models/purchaseInvoice');
const PurchaseInvoiceLine = require('../../../common/models/purchaseInvoiceLine');
const formatTop5 = require('../../utils/formatTop5');

async function calculate(fiscalYear) {
  const valuePerProduct = {};

  const invoiceLines = await PurchaseInvoiceLine.findAll({
    raw: true,
    include: [{
      model: PurchaseInvoice,
      where: { fiscal_year: fiscalYear },
    }],
  });

  for (const invoiceLine of invoiceLines) {
    if (!valuePerProduct[invoiceLine.product_code]) {
      valuePerProduct[invoiceLine.product_code] = 0;
    }

    valuePerProduct[invoiceLine.product_code] += parseFloat(invoiceLine.grossValueAmount);
  }

  return formatTop5(valuePerProduct);
}

module.exports = calculate;
