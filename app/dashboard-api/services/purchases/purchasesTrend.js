const getMonth = require('date-fns/getMonth');
const PurchaseInvoice = require('../../../common/models/purchaseInvoice');

async function calculate(fiscalYear) {
  let purchasesPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const invoices = await PurchaseInvoice.findAll({
    raw: true,
    where: {
      fiscal_year: fiscalYear,
    },
  });

  for (const invoice of invoices) {
    const month = getMonth(new Date(invoice.documentDate));

    purchasesPerMonth[month] += parseFloat(invoice.payableAmount);
  }

  purchasesPerMonth = purchasesPerMonth.map((value) => Number(value.toFixed(2)));

  return purchasesPerMonth;
}

module.exports = calculate;
