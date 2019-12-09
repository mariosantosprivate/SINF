const PurchaseInvoice = require('../../../common/models/purchaseInvoice');
const formatTop5 = require('../../utils/formatTop5');

async function calculate(fiscalYear) {
  const valuePerSupplier = {};

  const invoices = await PurchaseInvoice.findAll({
    raw: true,
    where: {
      fiscal_year: fiscalYear,
    },
  });

  for (const invoice of invoices) {
    if (!valuePerSupplier[invoice.supplier_id]) {
      valuePerSupplier[invoice.supplier_id] = 0;
    }

    valuePerSupplier[invoice.supplier_id] += parseFloat(invoice.payableAmount);
  }

  return formatTop5(valuePerSupplier);
}

module.exports = calculate;
