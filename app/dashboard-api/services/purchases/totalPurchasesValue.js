const PurchaseInvoice = require('../../../common/models/purchaseInvoice');

async function calculate(fiscalYear) {
  const totalValue = await PurchaseInvoice.sum('payable_amount', {
    where: { fiscal_year: fiscalYear },
  });

  return totalValue;
}

module.exports = calculate;
