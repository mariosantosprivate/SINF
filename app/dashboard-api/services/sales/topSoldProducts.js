const Invoice = require('../../../common/models/invoice');
const InvoiceLine = require('../../../common/models/invoiceLine');

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

  let top5Products = [];

  for (const key in valuePerProduct) {
    if (Object.prototype.hasOwnProperty.call(valuePerProduct, key)) {
      const product = {};
      product[key] = valuePerProduct[key];

      top5Products.push(product);
    }
  }

  top5Products.sort((a, b) => {
    const aValue = a[Object.keys(a)[0]];
    const bValue = b[Object.keys(b)[0]];

    return bValue - aValue;
  });

  top5Products = top5Products.slice(0, 5);

  return formatProducts(top5Products);
}

module.exports = calculate;
