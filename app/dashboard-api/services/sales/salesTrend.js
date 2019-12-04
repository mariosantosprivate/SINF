const getMonth = require('date-fns/getMonth');
const Invoice = require('../../../common/models/invoice');

async function calculate(fiscalYear) {
  let salesPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const invoices = await Invoice.findAll({
    raw: true,
    where: {
      fiscal_year: fiscalYear,
    },
  });

  for (const invoice of invoices) {
    const month = getMonth(new Date(invoice.invoiceDate));

    salesPerMonth[month] += parseFloat(invoice.netTotal);
  }

  salesPerMonth = salesPerMonth.map((value) => Number(value.toFixed(2)));

  return salesPerMonth;
}

module.exports = calculate;
