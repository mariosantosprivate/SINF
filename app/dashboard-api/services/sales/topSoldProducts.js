const Invoice = require('../../../common/models/invoice');
const InvoiceLine = require('../../../common/models/invoiceLine');
const formatTop5 = require('../../utils/formatTop5');

function formatProducts(products) {
  return products.map((product) => {
    const name = Object.keys(product)[0];
    const totalSoldValue = Number(product[Object.keys(product)[0]].toFixed(2));

    return { name, totalSoldValue };
  });
}

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
