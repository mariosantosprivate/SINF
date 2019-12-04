const jp = require('jsonpath');
const Product = require('../../common/models/product');

async function seed(data) {
  const products = jp.query(data, '$.auditFile.masterFiles.product')[0];

  for (const key in products) {
    if (Object.prototype.hasOwnProperty.call(products, key)) {
      const product = products[key];

      await Product.create({
        code: product.productCode,
        description: product.porductDescription,
        group: product.productGroup,
        numberCode: product.productNumberCode,
        type: product.ProductType,
      });
    }
  }
}

module.exports = {
  seed,
};
