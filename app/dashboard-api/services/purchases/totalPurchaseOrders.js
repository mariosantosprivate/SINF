const PurchaseInvoice = require('../../../common/models/purchaseInvoice');

async function calculate(fiscalYear) {
  const totalInvoices = await PurchaseInvoice.count({
    where: { fiscal_year: fiscalYear },
  });

  return totalInvoices;
}

module.exports = calculate;
